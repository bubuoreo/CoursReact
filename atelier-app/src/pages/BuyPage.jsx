import React, { useState, useEffect } from 'react';

// Dummy data for the cards
const cardsData = [
  { id: 1, name: 'Card 1', description: 'Description 1', price: '50$' },
  { id: 2, name: 'Card 2', description: 'Description 2', price: '60$' },
  // Add more card objects here
];

const CardItem = ({ card, onBuy }) => (
  <div className="card-item">
    <h3>{card.name}</h3>
    <p>{card.description}</p>
    <p>{card.price}</p>
    <button onClick={() => onBuy(card)}>Buy</button>
  </div>
);

const BuyPage = () => {
  const [cards, setCards] = useState(cardsData);

  useEffect(() => {
    // Here you would fetch the cards from your backend instead of using dummy data
    // fetch('/api/cards')
    //   .then(response => response.json())
    //   .then(data => setCards(data));
  }, []);

  const handleBuy = (card) => {
    // Implement your buy logic here, for example opening a modal or making an API call
    console.log('Buying', card);
  };

  return (
    <div className="buy-page">
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
