import React, { useState, useEffect } from 'react';
import CardItem from '../components/Card/containers/CardItem';
import { Header } from '../components/Header/Header.jsx';
import { useSelector } from 'react-redux';

const BuyPage = () => {
  const [cards, setCards] = useState([]);
  const user = useSelector(state => state.userReducer.user);

  const fetchCards = async () => {
    try {
      const response = await fetch('/cards_to_sell');
      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }
      const cardsData = await response.json();
      setCards(Object.values(cardsData));
    } catch (error) {
      console.error('Error fetching cards:', error.message);
    }
  };

  const handleBuy = async (cardId) => {
    const url = '/buy';
    const data = {
      "user_id": user.id + 1,
      "card_id": cardId
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
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Server Response:', result);
    } catch (error) {
      console.error('Error during buy request:', error.message);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []); // Empty dependency array ensures that the effect runs once after the initial render

  return (
    <div className="buy-page">
      <Header />
      <h1>Market</h1>
      <div className="card-list">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
};

export default BuyPage;
