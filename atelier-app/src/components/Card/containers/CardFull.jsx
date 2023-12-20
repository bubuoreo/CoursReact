import React from 'react';

const CardFull = () => (
  <div className="ui special cards">
    <div className="card">
      <div className="content">
        <div className="ui grid">
          <div className="three column row">
            <div className="column">
              <i className="heart outline icon"></i><span id="cardHPId">10</span> 
            </div>
            <div className="column">
              <h5>Happy Tree Family</h5>
            </div>
            <div className="column">
              <span id="energyId">10</span> <i className="lightning icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="image imageCard">
        <div className="blurring dimmable image">
          <div className="ui inverted dimmer">
            <div className="content">
              <div className="center">
                <div className="ui primary button">Add Friend</div>
              </div>
            </div>
          </div>
          <div className="ui fluid image">
            <a className="ui left corner label">
              DEADPOOL
            </a>
            <img id="cardImgId" className="ui centered image" src="https://static.hitek.fr/img/actualite/2017/06/27/i_deadpool-2.jpg" alt="Deadpool" />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="ui form tiny">
          <div className="field">
            <label id="cardNameId"></label>
            <textarea id="cardDescriptionId" className="overflowHiden" readOnly rows="2">
              Le convoi d'Ajax est attaqué par Deadpool. Il commence par massacrer les gardes à l'intérieur d'une voiture, avant de s'en prendre au reste du convoi. Après une longue escarmouche, où il est contraint de n'utiliser que les douze balles qu'il lui reste, Deadpool capture Ajax (dont le véritable nom est Francis, ce que Deadpool ne cesse de lui rappeler). Après l'intervention de Colossus et Negasonic venus empêcher Deadpool de causer plus de dégâts et le rallier à la cause des X-Men, Ajax parvient à s'échapper en retirant le sabre de son épaule. Il apprend par la même occasion la véritable identité de Deadpool : Wade Wilson.
            </textarea>
          </div>
        </div>
      </div>
      <div className="content">
        <i className="heart outline icon"></i><span id="cardHPId"> HP 10</span> 
        <div className="right floated">
          <span id="cardEnergyId">Energy 10</span>
          <i className="lightning icon"></i>
        </div>
      </div>
      <div className="content">
        <span className="right floated">
          <span id="cardAttackId"> Attack 20</span> 
          <i className=" wizard icon"></i>
        </span>
        <i className="protect icon"></i>
        <span id="cardDefenceId">Defense 500</span> 
      </div>
      <div className="ui bottom attached button">
        <i className="money icon"></i>
        Actual Value <span id="cardPriceId"> 100$</span>
      </div>
    </div>
  </div>
);

export default CardFull;
