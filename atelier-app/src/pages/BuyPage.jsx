import React, { useState, useEffect } from 'react';
import CardItem from '../components/Card/containers/CardItem';
import { Header } from '../components/Header/Header.jsx';
import { useSelector } from 'react-redux';

const BuyPage = () => {
  const [cardsWithUserId14, setCardsWithUserId14] = useState([]);
  const user = useSelector(state => state.userReducer.user);

  const fetchCards = async () => {
    try {
      const response = await fetch('/cards_to_sell');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const cardsData = await response.json();
      const cardsFiltered = Object.values(cardsData);
      setCardsWithUserId14(cardsFiltered);
    } catch (error) {
      console.error('Error fetching cards', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []); // Empty dependency array ensures that the effect runs once after the initial render

  const postData = async (cardId) => {
    const url = '/buy';
    const data = {
      userId: user.id + 1,
      id: cardId,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
      }

      const result = await response.json();
      console.log('Réponse du serveur :', result);
    } catch (error) {
      console.error('Erreur lors de la requête :', error.message);
    }
  };

  const handleBuy = (cardId) => {
    postData(cardId);
  };

  return (
    <div className="buy-page">
      <Header page={"Buy"}/>
      <h1>Market</h1>
      <div className="card-list">
        {cardsWithUserId14.map((card) => (
          <CardItem key={card.id} card={card} onClick={() => handleBuy(card.id)} />
        ))}
      </div>
    </div>
  );
};

export default BuyPage;
