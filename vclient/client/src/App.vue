<template>
  <div id="app">
    <Rankit/>
  </div>
</template>

<script>
import Rankit from './components/RankIt.vue'

export default {
  name: 'App',
  components: {
    Rankit
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  background: #bed3da;
  height: 184px;
}
</style>
