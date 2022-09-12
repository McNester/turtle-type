<template>

  <div class="w-screen h-screen bg-back bg-cover bg-center overflow-hidden">
    <h1 class="text-white text-5xl pl-10 pt-10">TURTLE TYPE</h1>
    <router-view :texts="texts"></router-view>
  </div>

</template>

<script>



export default{
  data() {
    return {
      texts:this.$store.getters.getShuffledTexts,
    }
  },
  mounted() {
    /*
      const data = JSON.stringify({
        "pageSize": 2,
        "page": 0
      });

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          var as = JSON.parse(this.responseText);
          console.log(as);
        }
      });

      xhr.open("POST", "https://quotel-quotes.p.rapidapi.com/quotes/list");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("X-RapidAPI-Key", "99754c9422mshf63cd6afa844028p1cfe51jsn42bd68e9c9c7");
      xhr.setRequestHeader("X-RapidAPI-Host", "quotel-quotes.p.rapidapi.com");

      xhr.send(data);*/
    },

 
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Megrim&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');

h1{
    font-family: 'Megrim', cursive;
  }
h2{
    font-family: 'Raleway', sans-serif;
}


</style>
