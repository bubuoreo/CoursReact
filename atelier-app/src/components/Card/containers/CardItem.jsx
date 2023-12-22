import React from 'react';

const CardItem = ({ card, onBuy }) => (

  <tr>
    <td>
      <img  className="ui avatar image" src={card.smallImgUrl}/> <span>{card.name}</span>
    </td>
    <td>{card.description}</td>
    <td>{card.family}</td>
    <td>{card.hp}</td>
    <td>{card.energy}</td>
    <td>{card.defence}</td>
    <td>{card.attack}</td>
    <td>{card.price}$</td>
    <td>
        <div className="ui vertical animated button" tabindex="0">
            <div className="hidden content" onClick={() => onBuy(card.id)}>Buy</div>
            <div className="visible content">
                <i className="shop icon"></i>
            </div>
        </div>
    </td>
  </tr>
);

export default CardItem;