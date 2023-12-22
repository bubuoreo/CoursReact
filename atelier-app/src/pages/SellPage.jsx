import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import UserCardItem from '../components/User/containers/UserCardItem.jsx';
import { update_user_action } from '../slices/userSlice.js';

const SellPage = () => {

  let user = useSelector(state => state.userReducer.user);
  
  const [cardsWithUserId14, setCardsWithUserId14] = useState([]);
  const dispatch = useDispatch();
  console.log(cardsWithUserId14);
  const handleSell = async (cardId) => {
    const url = '/sell';
    const data = {
      "user_id": user.id,
      "card_id": cardId
    };
    
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
  
      // Après la vente de la carte, tu voudras peut-être mettre à jour la liste :
      setCardsWithUserId14((prevCards) => prevCards.filter((c) => c.id !== cardId));

      const userinfo = await fetch('/user/' + String(data.user_id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!userinfo.ok) {
        throw new Error(`Erreur HTTP! Statut : ${userinfo.status}`);
      }

      const userinfo1 = await userinfo.json();
      
      dispatch(update_user_action(userinfo1));
      console.log('user3', userinfo1)

    } catch (error) {
      console.error('Erreur lors de la requête :', error.message);
    }
  };
  

  const fetchCards = async () => {
    try {
      const response = await fetch('/cards');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const cardsData = await response.json();
      console.log(cardsData)
      const cardsFiltered = Object.values(cardsData).filter((card) => card.userId === user.id);
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
      <Header page={"Sell"}/>
      <div className="ui grid">
            <div className="ten wide column">
                 <h3 className="ui aligned header"> My Card List</h3>
                <table className="ui selectable celled table" id="cardListId">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Family</th>
                            <th>HP</th>
                            <th>Energy</th>
                            <th>Defence</th>
                            <th>Attack</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {cardsWithUserId14.map((card) => (
                      <UserCardItem key={card.id} card={card} onSell={handleSell} />
                    ))}

                    </tbody>
                </table>
            </div>
            <div className=" five wide column">
                <div id="card"></div> 

            </div>

        </div>
    </div>
  );
};

export default SellPage;
