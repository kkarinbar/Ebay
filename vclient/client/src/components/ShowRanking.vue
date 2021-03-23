<template>
    <div>
        <div class="dataTitle">Ranking</div>
        <div v-for="(rank, index) in ranking" :key="`${rank[0]}${index}`">{{ rank['name'] }} (<show-stars :word="rank.name" :number="rank.rate" />)</div>
    </div>
</template>

<script>
  import ShowStars  from './ShowStars.vue'

  export default {
    name: 'ShowRanking',
    components: { ShowStars },
    data() {
      return {
        sortedArr: null,
      };
    },
    watch: {
      ranking: {
        handler() {
          this.sortedArr = this.ranking;
        },
      },
    },
    props: {
      ranking: {
        type: Array,
        required: true,
      },

    },
  }

</script>

<style>
    .dataTitle{
        margin-top: 20px;
        margin-bottom: 20px;
        font-weight: bold;
        font-size: 20px;
    }
</style>