<script setup>
import { useGameStore } from '../stores/game'

const game = useGameStore()

game.resetGame()

</script>

<template>
    <div></div>
</template>
