import React, { useState } from 'react';

// Dummy data for the user's cards
const userCardsData = [
  { id: 1, name: 'Card A', description: 'Description A', price: '50$' },
  { id: 2, name: 'Card B', description: 'Description B', price: '60$' },
  // ... other cards
];

const UserCardItem = ({ card, onSell }) => (
  <div className="card-item">
    <h3>{card.name}</h3>
    <p>{card.description}</p>
    <p>{card.price}</p>
    <button onClick={() => onSell(card)}>Sell</button>
  </div>
);

const SellPage = () => {
  const [userCards, setUserCards] = useState(userCardsData);

  const handleSell = (card) => {
    // Implement your sell logic here, e.g., show a confirmation dialog, then remove the card from the list or call an API.
    console.log('Selling', card);
    // After selling the card, you might want to update the list:
    setUserCards(userCards.filter((c) => c.id !== card.id));
  };

  return (
    <div className="sell-page">
      <h1>My Cards</h1>
      <div className="card-list">
        {userCards.map((card) => (
          <UserCardItem key={card.id} card={card} onSell={handleSell} />
        ))}
      </div>
    </div>
  );
};

export default SellPage;
