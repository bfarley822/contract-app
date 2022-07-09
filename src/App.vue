<template>
  <div id="app">
    <NavBar/>
    <div class="p-4">
      <router-view />
    </div>
  </div>
</template>

<script type="text/javascript">
  import NavBar from "@/components/NavBar.vue";
  export default {
    components: {
      NavBar, // register component
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&family=Montserrat&family=Open+Sans&display=swap');
  #app {
    font-family: 'Open Sans', 'Helvetica', 'Arial', 'sans-serif';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center;
    color: #2c3e50; */
  }
</style>
