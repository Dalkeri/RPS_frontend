<script setup>
import Game from './components/Game.vue'
import Leaderboard from './components/Leaderboard.vue'
import axios from 'axios'
import { ref } from 'vue'

let scores = ref([])

function getLeaderboard(){
  axios.get("http://localhost:3000/api/getHighscores")
         .then(res =>{
            scores.value = res.data.leaderboard
         })
         .catch(error => {
            console.log(error)
         })
}

getLeaderboard();

</script>

<template>
  <div class="wrapper">
    <Game  @reload-leaderboard="getLeaderboard" />
    <Leaderboard :scores=scores />
  </div>


</template>

<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  height: 100vh;

}

</style>

