<template>
  <div class="wrapper">
      <div class="title">Word Rank At Wiki</div>
      <input type="text" v-model="searchUrl" id="searchedData" name="searchedData" />
      <button @click="makeHttpRequest" >Submit</button>
      <ViewOutput v-if="!hasError && parsedData && parsedData !== '' " :text="parsedData"/>
      <div class="error" v-if="hasError">{{ parsedData }}</div>
  </div>
</template>

<script>
  import axios from 'axios';
  import ViewOutput from './ViewOutput.vue'
  import { WIKI_URL, ERROR_MESSAGES } from '../assets/consts';

export default {
  name: 'RankIt',
  components: { ViewOutput },
  data() {
    return {
      searchUrl : '',
      parsedData: '',
      hasError: false,
    };
  },
  methods: {
    makeHttpRequest(){
      this.hasError = false;
      if (!this.searchUrl|| !this.searchUrl.trim()) {
        return;
      }
      const that = this;
      axios(`${WIKI_URL}=${this.searchUrl}`)
           .then(res => {
             that.parsedData = res.data;
           })
           .catch(err => {
             that.parsedData = `${ERROR_MESSAGES.ERROR_OCCURRED}. details: ${err.message}`;
             this.hasError = true;
           })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper input{
  width:521px;
  margin-top: 139px;
}
.wrapper button {
    margin-left: 8px;
}
.title{
    margin: auto;
    width: 50%;
    padding: 10px;
    font-size: 39px;
 }
 .error{
      color :red;
  }
</style>
