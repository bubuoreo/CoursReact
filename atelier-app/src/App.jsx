import React, { useState } from 'react';

import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cardImage from './assets/card.png';
import LoginPage from './pages/LoginPage.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'
import BuyPage from './pages/BuyPage.jsx'
import SellPage from './pages/SellPage.jsx'
import { Header } from './components/Header/Header.jsx';
import ActionButton from './components/ActionButton/ActionButton.jsx';
import CardVisual from './components/Card/containers/CardVisual.jsx';


export const App = () => {
    return (
      <div className="gradient__bg"> 
      <Header />
      <LoginPage />
      <div className="flex flex-col items-center space-y-4 mt-8">
      <ActionButton action="buy" label="Buy" />
      <ActionButton action="sell" label="Sell" />
      <ActionButton action="play" label="Play" />
    </div>
    <CardVisual
    title="Happy Tree Fami"
    imageUrl={cardImage} // Replace with your actual image path
    description="Super John"
    health={50}
    power={20}
      />

    </div>
  );
};