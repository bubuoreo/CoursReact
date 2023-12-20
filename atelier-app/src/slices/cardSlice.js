// cardSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
  name: 'card',
  initialState: {
    selectedCards: {}, // Utiliser un objet pour stocker l'ensemble des cartes sélectionnées
  },
  reducers: {
    addSelectedCard: (state, action) => {
      const { id, att, def, hp, energy } = action.payload;
      // Ajouter la carte au dictionnaire des cartes sélectionnées
      state.selectedCards[id] = { att, def, hp, energy };
    },
    removeSelectedCard: (state, action) => {
      const cardIdToRemove = action.payload;
      // Supprimer la carte du dictionnaire des cartes sélectionnées
      delete state.selectedCards[cardIdToRemove];
    },
    clearSelectedCards: (state) => {
      // Réinitialiser le dictionnaire des cartes sélectionnées
      state.selectedCards = {};
    },
  },
});

export const { addSelectedCard, removeSelectedCard, clearSelectedCards } = cardSlice.actions;

export default cardSlice.reducer;
