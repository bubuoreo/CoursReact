import React from 'react';
import handleBuy from '../../../pages/BuyPage'
const CardItem = ({ card}) => {
  return (
        <div className="card">
        <h3>{card.name}</h3>
        <p>{card.description}</p>
        <p>{card.price}</p>
        <button onClick={() => handleBuy(card)}>Buy</button>
        </div>
    );
};

export default CardItem;