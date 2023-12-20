import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cardReducer from './slices/cardSlice'; // Importez le reducer des cartes

export default configureStore({
  reducer: {
    userReducer: userReducer,
    cardReducer: cardReducer, // Ajoutez le reducer des cartes
  },
});
