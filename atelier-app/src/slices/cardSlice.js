import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
  name: 'card',
  initialState: {
    selectedCards: [], // Utiliser un tableau pour stocker les cartes sélectionnées
  },
  reducers: {
    addSelectedCard: (state, action) => {
      state.selectedCards = [...state.selectedCards, action.payload];
    },
    removeSelectedCard: (state, action) => {
      const cardIdToRemove = action.payload;
      state.selectedCards = state.selectedCards.filter((card) => card.id !== cardIdToRemove);
    },
    clearSelectedCards: (state) => {
      state.selectedCards = [];
    },
  },
});

export const { addSelectedCard, removeSelectedCard, clearSelectedCards } = cardSlice.actions;

export default cardSlice.reducer;
