import { computed, ref } from "vue";
import { defineStore } from "pinia";

const suits = ["Clubs", "Spades", "Diamonds", "Hearts"];
const ranks = [
  { name: "A", value: 0 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "J", value: 0 },
  { name: "Q", value: 0 },
  { name: "K", value: 0 },
];
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
const deck = suits.reduce((acc, suit) => {
  ranks.forEach((rank) => {
    acc.push({
      suit: suit,
      rank: rank.name,
      value: rank.value,
    });
  });

  return acc;
}, []);

function createDeck(fromDeck, times = 1, shuffleDeck = true) {
  let finalDeck = [];
  for (let index = 0; index < times; index++) {
    finalDeck.push(...fromDeck);
  }
  return shuffleDeck ? shuffle(finalDeck) : finalDeck;
}

const initialState = () => ({
  history: [],
  deck: createDeck(deck, 8),
  playerCards: [],
  dealerCards: [],
});

export const useGameStore = defineStore("game", () => {
  const init = initialState();
  const state = {
    history: ref(init.history),
    deck: ref(init.deck),
    playerCards: ref(init.playerCards),
    dealerCards: ref(init.dealerCards),
  };

  const pandas = computed(() => {
    return true;
  });

  const dragons = computed(() => {
    return true;
  });

  const dealPlayer = () => {};

  const dealDealer = () => {};

  const setupNextRound = () => {
    state.playerCards.value = [];
    state.dealerCards.value = [];
  };

  const winner = computed(() => {
    
  })

  const drawCard = (cards) => {
    cards.value = [...cards.value, state.deck.value.shift()];
  };

  const playerTotal = computed(() => {
    return state.playerCards.value.reduce((acc, card) => {
      acc += card.value;
      if (acc >= 10) {
        acc = parseInt(String(12)[1]);
      }
      return acc;
    }, 0);
  })
  const dealerTotal = computed(() => {
    return state.dealerCards.value.reduce((acc, card) => {
      acc += card.value;
      if (acc >= 10) {
        acc = parseInt(String(12)[1]);
      }
      return acc;
    }, 0);
  })

  const playInitial = () => {
    drawCard(state.playerCards);
    drawCard(state.dealerCards);
    drawCard(state.playerCards);
    drawCard(state.dealerCards);
  }

  const playLogic = () => {
    if (
      (playerTotal.value >= 8 && playerTotal.value <= 9) || 
      (dealerTotal.value >= 8 || dealerTotal <= 9)
    ) {
      return;
    }
    if (playerTotal.value <= 5) {
      drawCard(state.playerCards);
    }
    if (dealerTotal.value == 3 && (playerTotal.value[2] === undefined ||  playerTotal.value[2] !== 8) {

    }
  }

  const recordPlay = () => {
    const winner = state.history.value = [
      ...state.history.value,
      {
        playerCards: state.playerCards.value,
        dealerCards: state.dealerCards.value,
      },
    ];
  }


  const actions = {
    resetShoe() {
      const newState = initialState();
      state.deck.value = newState.deck;
      state.history.value = newState.history;
      state.playerCards.value = newState.playerCards;
      state.dealerCards.value = newState.dealerCards;
      
    },
    playRound() {
      playInitial();
      playLogic();
      recordPlay();
      setupNextRound();
    },
  };

  return { state, actions, pandas, dragons };
});
