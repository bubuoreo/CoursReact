import React from 'react';

const CardShort = ({ card, onClick, selected }) => (
  <div className={`ui special cards ${selected ? 'selected' : ''}`} onClick={onClick}>
    <div className="card">
      <div className="content">
        <div className="ui grid">
          <div className="three column row">
            <div className="column" style={{ textAlign: 'center' }}>
              <a className="ui red circular label">{card.attack}</a>
            </div>
            <div className="column">
              <h5>{card.name}</h5>
            </div>
            <div className="column" style={{ textAlign: 'center' }}>
              <a className="ui yellow circular label">{card.defense}</a>
            </div>
          </div>
        </div>
      </div>
      <div className="image imageCard">
        <div className="ui fluid image">
          {/* Utilisation des informations de la carte provenant du backend */}
          <img id="cardImgId" className="ui centered image" src={card.imgUrl} alt={card.name} />
        </div>
      </div>
    </div>
  </div>
);

export default CardShort;
