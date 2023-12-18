import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header/Header.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const UserCardItem = ({ card, onSell }) => (
  <div className="card-item">
    <h3>{card.name}</h3>
    <p>{card.description}</p>
    <p>{card.price}</p>
    <img src={card.imgUrl} alt={card.name} />
    <button onClick={() => onSell(card.id)}>Sell</button>
  </div>
);

const SellPage = () => {
  const navigate = useNavigate();
  let user = useSelector(state => state.userReducer.user);
  
  const [cardsWithUserId14, setCardsWithUserId14] = useState([]);

  const handleSell = (cardId) => {
    
    const postData = async () => {
      const url = '/sell';
      const data = {
        "user_id": user.id + 1,
        "card_id": cardId
      }
      console.log(data)  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    
        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }
        const result = await response.json();
        console.log('Réponse du serveur :', result);
      } catch (error) {
        console.error('Erreur lors de la requête :', error.message);
      }
    };
    // Appel de la fonction asynchrone
    postData();
    // Implement your sell logic here, e.g., show a confirmation dialog, then remove the card from the list or call an API.
    console.log('Selling', cardId);
    // After selling the card, you might want to update the list:
    setCardsWithUserId14((prevCards) => prevCards.filter((c) => c.id !== cardId));
    navigate('/buy')
  };

  const fetchCards = async () => {
    try {
      const response = await fetch('/cards');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const cardsData = await response.json();
      console.log(cardsData)
      const cardsFiltered = Object.values(cardsData).filter((card) => card.userId === user.id+1);
      setCardsWithUserId14(cardsFiltered);
      console.log(user.id)
      console.log(cardsFiltered)
      
    } catch (error) {
      console.error('Error fetching cards', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="sell-page">
      <Header />
      <h1>My Cards</h1>

      <div className="card-list">
        {cardsWithUserId14.map((card) => (
          <UserCardItem key={card.id} card={card} onSell={handleSell} />
        ))}
      </div>
    </div>
  );
};

export default SellPage;
