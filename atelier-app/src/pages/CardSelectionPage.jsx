import React, { useState, useEffect } from 'react';
import CardShort from '../components/Card/containers/CardShort';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const CardSelectionPage = () => {
  const user = useSelector(state => state.userReducer.user);
  const [selectedCards, setSelectedCards] = useState([]);
  const navigate = useNavigate();
  const [cardsWithUserId, setCardsWithUserId] = useState([]);

  const fetchCards = async () => {
    try {
      const response = await fetch('/cards');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const cardsData = await response.json();
      const cardsFiltered = Object.values(cardsData).filter((card) => card.userId === user.id + 1);
      setCardsWithUserId(cardsFiltered);
    } catch (error) {
      console.error('Error fetching cards', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCardClick = (cardId) => {
    // Vérifier si la carte est déjà sélectionnée
    if (selectedCards.includes(cardId)) {
      // Si oui, la retirer de la sélection
      setSelectedCards((prevSelected) => prevSelected.filter((id) => id !== cardId));
    } else {
      // Sinon, ajouter la carte à la sélection (max 2 cartes)
      if (selectedCards.length < 4) {
        setSelectedCards((prevSelected) => [...prevSelected, cardId]);
      }
    }
  };

  const getSelectedCardsInfo = () => {
    const selectedCardsInfo = {};
    cardsWithUserId.forEach((card) => {
      if (selectedCards.includes(card.id)) {
        selectedCardsInfo[card.id] = {
          att: card.attack,
          def: card.defence,
          hp: card.hp,
          energy: card.energy,
        };
      }
    });
    return selectedCardsInfo;
  };

  return (
    <div className="ui segment">
      <div className="ui grid">
        <div className="twelve wide column">
          <div className="row">
            <div className="ui grid">
              <div className="two wide column">
                {/* Utilisez le composant CardShort à la place du div si nécessaire */}
                {cardsWithUserId.map((card) => (
                  <CardShort
                    key={card.id}
                    card={card}
                    onClick={() => handleCardClick(card.id)}
                    selected={selectedCards.includes(card.id)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="ui grid ">
              <div className="four wide column">
                <button
                  className="huge ui primary button"
                  onClick={() => console.log('Selected Cards:', getSelectedCardsInfo())}
                >
                  Valid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSelectionPage;
