import React from 'react';

const CardItem = ({ card, onBuy }) => (
  <div className="card">
    <h3>{card.name}</h3>
    <p>{card.description}</p>
    <p>{card.price}</p>
    <button onClick={() => onBuy(card.id)}>Buy</button>
  </div>
);

export default CardItem;