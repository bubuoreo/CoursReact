import React from 'react';
import CardFull from '../components/Card/containers/CardFull'; 
import CardShort from '../components/Card/containers/CardShort'; 
import Chat from '../components/Chat/Chat'; 
import { useSelector } from 'react-redux';
import { cardSlice } from '../slices/cardSlice';

const PlayPage = () => {
  const cartesSelectionnees = useSelector((state) => state.cardReducer.selectedCards);
  console.log('Cartes sélectionnées:',cartesSelectionnees);
  const cartesSelectionnees1 = cartesSelectionnees[0];

  

  return (
  <div className="ui segment">
    <div className="ui grid">
      <div className="four wide column">
        <Chat />
      </div>
      <div className="twelve wide column">
        <div className="row">
          <div className="ui grid">
            <div className="two wide column">
            </div>
            <div className="ten wide column">
              <div className="ui four column grid">
                <div className="column">
                {cartesSelectionnees1.map((card) => (
                      <CardShort card={card} />
                    ))}
              </div>
            </div>
            <div className="four wide column">
              {/* Utilisez le composant CardFull à la place du div si nécessaire */}
              {/* <CardFull /> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="ui grid ">
            <div className="twelve wide column">
              <h4 className="ui horizontal divider header">VS</h4>
            </div>
            <div className="four wide column">
              <button className="huge ui primary button">Attack</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="ui grid">
            <div className="two wide column">
              {/* Utilisez le composant CardShort à la place du div si nécessaire */}
              {/* <CardShort /> */}
            </div>
            <div className="ten wide column">
              <div className="ui four column grid">
                <div className="column">
                  {/* Utilisez le composant CardShort à la place du div si nécessaire */}
                  {/* <CardShort /> */}
                </div>
                <div className="column">
                  {/* Utilisez le composant CardShort à la place du div si nécessaire */}
                  {/* <CardShort /> */}
                </div>
                <div className="column">
                  {/* Utilisez le composant CardShort à la place du div si nécessaire */}
                  {/* <CardShort /> */}
                </div>
                <div className="column">
                  {/* Utilisez le composant CardShort à la place du div si nécessaire */}
                  {/* <CardShort /> */}
                </div>
              </div>
            </div>
            <div className="four wide column">
              {/* Utilisez le composant CardFull à la place du div si nécessaire */}
              {/* <CardFull /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
};

export default PlayPage;
