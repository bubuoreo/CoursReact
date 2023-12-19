import React from 'react';

const UserCardItem = ({ card, onSell }) => (
  <div className="card-item">
    <h3>{card.name}</h3>
    <p>{card.description}</p>
    <p>{card.price}</p>
    <img src={card.imgUrl} alt={card.name} />
    <button onClick={() => onSell(card.id)}>Sell</button>
  </div>
);

export default UserCardItem;