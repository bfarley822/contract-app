<template>
  <div id="app" class="flex flex-col min-h-screen">
    <NavBar/>
    <div class="p-4 bg-gray-50 flex-grow">
      <router-view />
    </div>
    <Footer/>
  </div>
</template>

<script type="text/javascript">
  import NavBar from "@/components/NavBar.vue";
  import Footer from "@/components/Footer.vue";
  export default {
    components: {
      NavBar,
      Footer
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
