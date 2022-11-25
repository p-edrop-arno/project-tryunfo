import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.saveButtonValidation = this.saveButtonValidation.bind(this);
    this.superTrunfoHandler = this.superTrunfoHandler.bind(this);
    this.totalAttrSum = this.totalAttrSum.bind(this);
    this.filterName = this.filterName.bind(this);
    this.filterRare = this.filterRare.bind(this);
    // Links de referências que usei, estava dando erro quando passava as props
    // https://stackoverflow.com/questions/2236747/what-is-the-use-of-the-javascript-bind-method
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      actualDeck: [],
    };
  }

  onInputChange({ target }) {
    const { id } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [id]: value,
    });
  }

  onSaveButtonClick(event) {
    event.preventDefault();
    const {
      cardName, cardImage,
      cardDescription,
      cardAttr1, cardAttr2, cardAttr3,
      cardRare,
      cardTrunfo, hasTrunfo,
    } = this.state;

    const newDeck = {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      hasTrunfo,
      cardTrunfo,
    };

    this.setState((prevState) => ({
      actualDeck: [...prevState.actualDeck, newDeck],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
    }), this.superTrunfoHandler);
  }

  totalAttrSum() {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const totalSum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    return totalSum;
  }

  saveButtonValidation() {
    const { cardName, cardDescription, cardImage, cardAttr1, cardAttr2, cardAttr3,
    } = this.state;
    const maxAttrPoints = 90;
    const maxAttrPtsSum = 210;
    const name = cardName.length > 0;
    const img = cardImage.length > 0;
    const description = cardDescription.length > 0;
    const attr1 = cardAttr1 >= 0 && cardAttr1 <= maxAttrPoints;
    const attr2 = cardAttr2 >= 0 && cardAttr2 <= maxAttrPoints;
    const attr3 = cardAttr3 >= 0 && cardAttr3 <= maxAttrPoints;
    const attrSum = this.totalAttrSum() <= maxAttrPtsSum;
    const isAllValid = name && img && description
      && attr1 && attr2 && attr3 && attrSum;
    return isAllValid;
  }

  deleteHandler(cardName) {
    const { actualDeck } = this.state;
    this.setState({
      actualDeck: actualDeck.filter((card) => card.cardName !== cardName),
    }, this.superTrunfoHandler);
  }

  superTrunfoHandler() {
    const { actualDeck } = this.state;
    const hasCardTrunfo = actualDeck.some(
      (cardStatus) => cardStatus.cardTrunfo === true,
    );
    this.setState({ hasTrunfo: hasCardTrunfo });
  }

  filterName({ target }) {
    const { value } = target;
    const { actualDeck } = this.state;
    this.setState(({
      actualDeck: actualDeck.filter(
        (eachCard) => eachCard.cardName.includes(value),
      ),
    }));
  }

  filterRare({ target }) {
    const { value } = target;
    const { actualDeck } = this.state;
    if (value === 'todas') return actualDeck;
    this.setState(({
      actualDeck: actualDeck.filter(
        (eachInDeck) => eachInDeck.cardRare === value,
      ),
    }));
  }

  render() {
    const {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      actualDeck,
    } = this.state;

    return (

      <section>
        <h1>Tryunfo</h1>

        <Form
          cardName={ cardName }
          cardImage={ cardImage }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          trunfoHandler={ this.superTrunfoHandler }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ !this.saveButtonValidation() }
          onSaveButtonClick={ this.onSaveButtonClick }
        />

        <Card
          cardName={ cardName }
          cardImage={ cardImage }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
        />

        <section>
          Procurar carta
          <input
            type="text"
            data-testid="name-filter"
            onChange={ this.filterName }
          />
          <select
            id="cardRare"
            value={ cardRare }
            onChange={ this.filterRare }
            data-testid="rare-filter"
          >
            <option value="todas">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </section>

        <h2>Cartas:</h2>
        {
          actualDeck.map((cardStatus) => (
            <div key={ cardStatus.cardName }>
              <Card
                cardName={ cardStatus.cardName }
                cardImage={ cardStatus.cardImage }
                cardDescription={ cardStatus.cardDescription }
                cardAttr1={ cardStatus.cardAttr1 }
                cardAttr2={ cardStatus.cardAttr2 }
                cardAttr3={ cardStatus.cardAttr3 }
                cardRare={ cardStatus.cardRare }
                cardTrunfo={ cardStatus.cardTrunfo }
                hasTrunfo={ cardStatus.hasTrunfo }
              />

              <button
                type="button"
                onClick={ () => this.deleteHandler(cardStatus.cardName) }
                data-testid="delete-button"
              >
                Excluir
              </button>
            </div>
          ))
        }
      </section>
    );
  }
}
export default App;
