<script setup>
const props = defineProps(['scores'])
</script>

<template>
    <div id="leaderboard">
        <h2>Leaderboard</h2>
        <div id="scores">
            <li v-for="(score,index) in props.scores" :key="index">
            {{ index +1 }}: {{ score.username }} has a winrate ratio of {{ score.winrate }}% !
            </li>
        </div>
        
    </div>
</template>

<style scoped>
#leaderboard{
    width: 50%;
    height: 250px;
    height: 100vh;
}

h2{
    text-align: center;
}
#scores{
    padding-top: 20px;
    text-align: center;
}

li{
    margin-bottom: 10px;
    list-style-type: none;
}
</style>
