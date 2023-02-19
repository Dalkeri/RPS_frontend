<script setup>
import axios from 'axios'
import { ref } from 'vue'


const emit = defineEmits(['reloadLeaderboard'])
let rounds = ref([]);
let randomId = Math.floor(Math.random()*10000)
let temporaryName = randomId.toString();

let playerUsername= "";

let restartGame= ref(false);

function askChoice(choice){
    console.log("You chose: " + choice );
    let requestBody = {
        "playerChoice": choice,
        "tempName": temporaryName
    }
    axios.post("http://localhost:3000/api/getOneRPS", requestBody)
         .then(res =>{
            rounds.value.push({
                "player": choice,
                "computer": res.data.computerChoice,
                "winner": res.data.winner,
                "totalWins": res.data.totalWins
            })
         })
         .catch(error => {
            console.log(error)
         })
}

function saveUsername(){
    let requestBody = {
        "username": playerUsername,
        "tempName": temporaryName
    }
    axios.put("http://localhost:3000/api/saveUsername", requestBody)
         .then(res =>{
            restartGame.value = true;
            emit('reloadLeaderboard');

         })
         .catch(error => {
            console.log(error)
         })
}

function restart(){
    rounds.value = [];
    randomId = Math.floor(Math.random()*10000)
    temporaryName = randomId.toString();

    playerUsername= "";

    restartGame.value = false;

}
    
</script>

<template>
  <div id="game">
    <div v-if="rounds.length < 10" id="btns">
        <div class="btn btn-rock" @click="askChoice('rock')"><font-awesome-icon icon="fa-solid fa-hand-back-fist" /></div>
        <div class="btn btn-paper" @click="askChoice('paper')"><font-awesome-icon icon="fa-solid fa-hand" /></div>
        <div class="btn btn-scissors" @click="askChoice('scissors')"><font-awesome-icon icon="fa-solid fa-hand-scissors" /></div>
    </div>
    <div v-else-if="!restartGame" id="sendScore">
        <div>You got {{ rounds[rounds.length -1].totalWins }} victories</div>
        <div>Do you want to save your score ? </div>
        <input type="textarea" class="form-control"  v-model="playerUsername" id="playerUsername" name="playerUsername">
        <button type="button" @click="saveUsername" >Send score</button>
    </div>
    <div v-else>
        <div id="restart">
            <button type="button" @click="restart" >Restart game</button>
        </div>
    </div>
    
    <div id="rounds">
        <li v-for="(round,index) in rounds" :key="index">
            Round {{ index +1 }}: You chose {{ round.player }}, computer chose {{ round.computer }}, winner: {{ round.winner }} !
        </li>
    </div>
  </div>
</template>

<style scoped>
#game{
    width:50%;
    height: 250px;
    height: 100vh;
}

#btns{
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
}

#sendScore{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 40%;
    align-items: center;
}

#restart{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 40%;
    align-items: center;
}

.btn{
    font-size: 3rem;
    width: 20%;
    height: 50px;
    text-align: center;
    margin: auto;
    display: flex;
    align-items:center;
    justify-content:center;
}
.btn:hover{
    cursor: pointer;
}
</style>
