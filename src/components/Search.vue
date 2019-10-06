<template>
  <div>
    <header>
      <h1>
        Spotlight
        <small>Upcoming Movies list</small>
      </h1>
    </header>
    <section>
      <input type="text">
      <button>Search</button>
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
    background-color: black;
    color: white;

    h1 {
      padding: 10px;
      small {
        font-size: .8em;
        font-weight: normal;
      }
    }
  }
</style>
