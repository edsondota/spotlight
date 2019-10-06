<template>
  <div>
    <header>
      <h1>
        Spotlight
        <small>Upcoming Movies list</small>
      </h1>
    </header>
    <section
      class="search-wrapper"
    >
      <div class="search-wrapper__input">
        <input type="text">
      </div>
      <div class="search-wrapper__button">
        <button>Search</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Search',
};
</script>

<style lang="scss" scoped>
  header {
    height: 60px;
    background-color: #E26740;
    color: white;

    h1 {
      padding: 10px;
      small {
        font-size: .8em;
        font-weight: normal;
      }
    }
  }

  .search-wrapper {
    margin: 20px auto;
    width: 80%;
    display: flex;

    &__input {
      flex: 5;
      input {
        width: 100%;
        height: 2em;
        padding-left: 1em;
        border: 1px solid #4DA8A2;
      }
    }

    &__button {
      flex: 1;
      button {
        width: 100%;
        text-align: center;
        height: 2.2em;
        background: #4DA8A2;
        color: white;
        border: 1px solid #4DA8A2;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
