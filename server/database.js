const moment = require('moment');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./moviesdb.db');

module.exports = {
  init() {
    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS Genre (id INT, name TEXT)');
      db.run(`CREATE TABLE IF NOT EXISTS Upcomingmovie (
          id INT,
          original_title TEXT,
          overview TEXT,
          release_date TEXT,
          poster_path TEXT,
          backdrop_path TEXT)`);
      db.run(`CREATE TABLE IF NOT EXISTS MovieGenre (
          movie_id INT,
          genre_id INT)`);
      db.run('CREATE TABLE IF NOT EXISTS UpdateInfo (last_update TEXT)');
    });
  },

  deleteData() {
    db.run('DELETE FROM Genre');
    db.run('DELETE FROM Upcomingmovie');
    db.run('DELETE FROM MovieGenre');
    db.run('DELETE FROM UpdateInfo');
  },

  updateInfo() {
    const date = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    const stmt = db.prepare('INSERT INTO UpdateInfo VALUES(?)');
    stmt.run(date);
    stmt.finalize();
  },

  getLastUpdate() {
    return new Promise((resolve) => {
      db.get('SELECT * FROM UpdateInfo', [], (_, row) => {
        resolve(row);
      });
    });
  },

  insertGenre({ genre }) {
    const stmt = db.prepare('INSERT INTO Genre VALUES(?, ?)');
    stmt.run(genre.id, genre.name);
    stmt.finalize();
  },

  insertMovie({ movie }) {
    const stmt = db.prepare('INSERT INTO Upcomingmovie VALUES(?, ?, ?, ?, ?, ?)');

    stmt.run(
      movie.id,
      movie.original_title,
      movie.overview,
      movie.release_date,
      movie.poster_path || '',
      movie.backdrop_path || '',
    );
    stmt.finalize();

    movie.genre_ids.forEach((id) => {
      this.insertMovieGenre(movie.id, id);
    });
  },

  insertMovieGenre(movieId, genreId) {
    const stmt = db.prepare('INSERT INTO MovieGenre VALUES(?, ?)');
    stmt.run(movieId, genreId);
    stmt.finalize();
  },

  getGenre(id) {
    return new Promise((resolve) => {
      db.get('SELECT id, name FROM Genre WHERE id = ?', [id], (_, row) => {
        resolve(row);
      });
    });
  },

  getGenres() {
    return new Promise((resolve) => {
      db.all('SELECT * FROM Genre', [], (_, rows) => {
        resolve(rows);
      });
    });
  },

  getMovieByTitle(title) {
    return new Promise(async (resolve) => {
      db.all('SELECT * FROM Upcomingmovie WHERE original_title LIKE ?', [`%${title}%`], async (_, rows) => {
        const results = rows;
        rows.forEach(async (row, index) => {
          this.getGenreByMovieId(row.id).then((genres) => {
            results[index] = { ...row, genres };
          });
        });
        resolve(results);
      });
    });
  },

  getMovie(id) {
    return new Promise((resolve) => {
      db.get('SELECT * FROM Upcomingmovie WHERE id = ?', [id], (_, row) => {
        resolve(row);
      });
    });
  },

  getGenreByMovieId(movieId) {
    return new Promise((resolve) => {
      db.all('SELECT * FROM Genre WHERE id IN (SELECT genre_id id FROM MovieGenre WHERE movie_id = ?)', [movieId], (_, rows) => {
        resolve(rows);
      });
    });
  },
};
