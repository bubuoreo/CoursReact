import React, { Component } from 'react';
import CardShort from '../components/Card/containers/CardShort'; 


class CardSelectionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCards: [],
    };
  }

  handleCardClick = (cardId) => {
    // Vérifier si la carte est déjà sélectionnée
    if (this.state.selectedCards.includes(cardId)) {
      // Si oui, la retirer de la sélection
      this.setState((prevState) => ({
        selectedCards: prevState.selectedCards.filter((id) => id !== cardId),
      }));
    } else {
      // Sinon, ajouter la carte à la sélection (max 2 cartes)
      if (this.state.selectedCards.length < 2) {
        this.setState((prevState) => ({
          selectedCards: [...prevState.selectedCards, cardId],
        }));
      }
    }
  };

  render() {
    return (
      <div className="ui segment">
        <div className="ui grid">
          <div className="twelve wide column">
            <div className="row">
              <div className="ui grid">
                <div className="two wide column">
                  {/* Utilisez le composant CardShort à la place du div si nécessaire */}
                  <CardShort onClick={() => this.handleCardClick(1)} selected={this.state.selectedCards.includes(1)} />
                </div>
                <div className="ten wide column">
                  <div className="ui four column grid">
                    {[2, 3, 4, 5].map((cardId) => (
                      <div className="column" key={cardId}>
                        {/* Utilisez le composant CardShort à la place du div si nécessaire */}
                        <CardShort
                          onClick={() => this.handleCardClick(cardId)}
                          selected={this.state.selectedCards.includes(cardId)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="ui grid ">
                <div className="four wide column">
                  <button
                    className="huge ui primary button"
                    onClick={() => console.log('Selected Cards:', this.state.selectedCards)}
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
  }
}

export default CardSelectionPage;