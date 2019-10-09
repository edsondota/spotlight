describe('E2E tests to spotlight upcoming movies list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080;');
    cy.wait(5);
  })

  it('should show a list of upcoming movies', () => {
    cy.get('.movie-list__item');
  })

  it('should filter movies by title', () => {
    cy.get('input').type('joker');
    cy.get('.movie-list__item:visible')
      .should('have.length', 1);
  });

  it('should view a movie details page', () => {
    cy.get('input').type('joker');
    cy.get('.movie-list__item:visible')
      .should('have.length', 1)
      .click();
    cy.get('.movie-details-wrapper:visible')
      .should('have.length', 1);
  });
});
