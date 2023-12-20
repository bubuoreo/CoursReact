import React from 'react';

const CardItem = ({ card, onBuy }) => (

  <tr>
    <td>
      <img  class="ui avatar image" src={card.smallImgUrl}/> <span>{card.name}</span>
    </td>
    <td>{card.description}</td>
    <td>{card.family}</td>
    <td>{card.hp}</td>
    <td>{card.energy}</td>
    <td>{card.defense}</td>
    <td>{card.attack}</td>
    <td>{card.price}$</td>
    <td>
        <div class="ui vertical animated button" tabindex="0">
            <div class="hidden content" onClick={() => onBuy(card.id)}>Buy</div>
            <div class="visible content">
                <i class="shop icon"></i>
            </div>
        </div>
    </td>
  </tr>
);

export default CardItem;