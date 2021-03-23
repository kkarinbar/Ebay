<template>
  <span>
      <span v-for="(index,num) in number" :key="`${index}${word}${num}`">
        *
      </span>
   </span>
</template>

<script>

  export default {
    name: 'ShowStars',
    props: {
      number: {
        type: Number,
        required: true,
      },
      word: {
        type: String,
        required: true,
      },
    },
  }

</script>

<style scoped>

</style>