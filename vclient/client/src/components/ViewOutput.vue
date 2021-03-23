<template>
    <div class="output">
        <div class="dataTitle">Here is your data </div>
        <div class="text">
           {{ text }}
        </div>
        <show-ranking  :ranking="sortedArr" />
    </div>
</template>

<script>
  import ShowRanking from './ShowRanking.vue'
  import { MAX_RATE, ERROR_MESSAGES } from '../assets/consts';

  export default {
    name: 'ViewOutput',
    components: { ShowRanking },
    data() {
      return {
        rateObj: [],
        sortedArr: [],
        rateObjFinal: [],
      };
    },
    props: {
      text: {
        type: String,
        required: true,
      },
    },
    mounted() {
      this.calculateRate();
    },
    watch: {
      text: {
        handler() {
          this.calculateRate();
        },
      },
    },
    methods: {
      calculateRate() {
        const rateObj = [];
        let maxWordNumber = { count: 0 };
        const data = this.text ? this.removePunctuationMarks(this.text) : null;
        if (data) {
          data.forEach((word) => {
            if (rateObj[word]) {
              rateObj[word].count += 1;
            } else {
              rateObj[word] = {};
              rateObj[word].count = 1;
              rateObj[word].name = word;
            }
            if (rateObj[word].count > maxWordNumber.count){
              maxWordNumber = rateObj[word];
            }
          })
          this.rateObj = rateObj;
          const mappingObj = this.createMappingForRate( maxWordNumber);
          this.insertRateToMapObj(mappingObj);
          this.sortRankings(mappingObj);
        }
      },
      removePunctuationMarks(txt){
        let text = txt.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,' ');
        return text && text.trim() ? text.replace(/\s+/g, ' ').trim().split(' ') : ERROR_MESSAGES.NOT_VALID_CONTENT;
      },
      sortRankings() {
        let tmpArr = [];
        this.sortedArr.length = 0;
        for ( let i = MAX_RATE ; i > 0 ; i--){
          if (this.rateObjFinal[i]) {
            let sortedArray = this.rateObjFinal[i].sort((item1, item2) => {
              return item1.name.localeCompare(item2.name);
            })
            tmpArr = tmpArr.concat(sortedArray);
          }
        }
        this.sortedArr = tmpArr ;
      },
      findWordRate(rateMapping, word){
        for (let i = 1; i <= MAX_RATE; i++) {
          if (word.count >=rateMapping[i].from && word.count <= rateMapping[i].to){
            return i;
          }
        }
        return MAX_RATE;
      },
      createMappingForRate( maxCount) {
       const step = Math.ceil(maxCount.count / (MAX_RATE));
       let bottomLimit = 0;
       const rateMapping = {};
       for ( let i = 1 ; i <= MAX_RATE ; i++, bottomLimit = step + bottomLimit){
         let topLimit = Math.ceil(bottomLimit + step ) > maxCount ? maxCount : Math.ceil(bottomLimit + step );

         rateMapping[i] = { 'from' :Math.ceil(bottomLimit + 1), 'to': topLimit}
       }
       return rateMapping;
      },
      insertRateToMapObj(rateMapping) {
          this.rateObjFinal = {};
          for (let name of Object.keys(this.rateObj)) {
              let rate = this.findWordRate(rateMapping, this.rateObj[name]);
              this.rateObj[name].rate = rate;
              if (!this.rateObjFinal[rate]){
                this.rateObjFinal[rate] = [];
              }
              this.rateObjFinal[rate].push(this.rateObj[name])
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .output {
        text-align: left;
        margin-left: 30px;
        margin-top: 38px;
    }
    .dataTitle{
        margin-top: 20px;
        margin-bottom: 20px;
        font-weight: bold;
        font-size: 20px;
    }
    .text{
        width: 1300px;
    }
</style>
