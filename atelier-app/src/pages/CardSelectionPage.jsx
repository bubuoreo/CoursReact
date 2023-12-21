// CardSelectionPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CardShort from '../components/Card/containers/CardShort';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSelectedCard, removeSelectedCard, clearSelectedCards } from '../slices/cardSlice';

const CardSelectionPage = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [selectedCards, setSelectedCards] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cardsWithUserId, setCardsWithUserId] = useState([]);

  const fetchCards = async () => {
    try {
      const response = await fetch('/cards');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const cardsData = await response.json();
      const cardsFiltered = Object.values(cardsData).filter((card) => card.userId === user.id);
      setCardsWithUserId(cardsFiltered);
    } catch (error) {
      console.error('Error fetching cards', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCardClick = (cardId) => {
    // Ajouter ou supprimer la carte du tableau selectedCards
    const updatedSelectedCards = selectedCards.includes(cardId)
      ? selectedCards.filter((id) => id !== cardId)
      : [...selectedCards, cardId];
      

    setSelectedCards(updatedSelectedCards);
    console.log('selected');
  };

  const getSelectedCardsInfo = () => {
    const selectedCardsInfo = selectedCards.map((cardId) => {
      const card = cardsWithUserId.find((c) => c.id === cardId);
      console.log(cardsWithUserId)
      return {
        id: cardId,
        name: card?.name,
        imgUrl: card?.imgUrl,
        att: card?.attack,
        def: card?.defence,
        hp: card?.hp,
        energy: card?.energy,
      };
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
                  onClick={() => {
                    if (selectedCards.length !== 4) {
                      console.error('Please select exactly 4 cards.');
                      return;
                    }

                    const selectedCardsInfo = getSelectedCardsInfo();
                    console.log('Selected Cards:', selectedCardsInfo);
                    dispatch(addSelectedCard(selectedCardsInfo));

                    // Envoyer les cartes sélectionnées au reducer
                    // selectedCardsInfo.forEach((cardInfo) => {
                    //   dispatch(addSelectedCard(cardInfo));
                    // });

                    navigate('/play');
                  }}
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
