import React, { useState } from 'react';

import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import cardImage from './assets/card.png';
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'
import BuyPage from './pages/BuyPage.jsx'
import SellPage from './pages/SellPage.jsx'
import CardSelectionPage from './pages/CardSelectionPage.jsx'
import { Header } from './components/Header/Header.jsx';
import ActionButton from './components/ActionButton/ActionButton.jsx';
import CardVisual from './components/Card/containers/CardVisual.jsx';
import CardTable from './components/CardTable/CardTable.jsx';


export const App = () => {

  {/* const cardData = [
    ['Card 1', 'Description 1', 'Family 1', 'Affinity 1', 'Energy 1', 'HP 1', '50$'],
    ['Card 2', 'Description 2', 'Family 2', 'Affinity 2', 'Energy 2', 'HP 2', '60$'],
    // ... more card data
  ];*/}

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/play" element={<CardSelectionPage />} />
      </Routes>
    </Router>
  );
};