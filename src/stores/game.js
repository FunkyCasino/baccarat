import { ref } from "vue";
import { defineStore } from "pinia";

const initialState = {
  count: 0,
};

export const useGameStore = defineStore("game", () => {
  const state = {
    count: ref(0),
  };

  function resetGame() {
    state.count.value = initialState.count;
  }

  return { resetGame };
});
