import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
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
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form>

        <label htmlFor="cardName">
          Nome:
          <input
            id="cardName"
            value={cardName}
            onChange={onInputChange}
            type="text"
            data-testid="name-input"
          />
        </label>

        <label htmlFor="cardImage">
          Imagem:
          <input
            id="cardImage"
            value={cardImage}
            onChange={onInputChange}
            type="text"
            alt={cardName}
            data-testid="image-input"
          />

        </label>
        <label htmlFor="cardDescription">
          Descrição:
          <textarea
            id="cardDescription"
            value={cardDescription}
            onChange={onInputChange}
            data-testid="description-input"
          />
        </label>

        <label htmlFor="cardAttr1">
          Inteligência:
          <input
            id="cardAttr1"
            value={cardAttr1}
            onChange={onInputChange}
            type="number"
            data-testid="attr1-input"
          />
        </label>

        <label htmlFor="cardAttr2">
          Força:
          <input
            id="cardAttr2"
            value={cardAttr2}
            onChange={onInputChange}
            type="number"
            data-testid="attr2-input"
          />
        </label>

        <label htmlFor="cardAttr3">
          Defesa:
          <input
            id="cardAttr3"
            value={cardAttr3}
            onChange={onInputChange}
            type="number"
            data-testid="attr3-input"
          />
        </label>

        <label htmlFor="cardRare">
          Raridade:
          <select
            id="cardRare"
            value={cardRare}
            onChange={onInputChange}
            data-testid="rare-input"
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>

        {
          hasTrunfo
            ? <p data-testid="trunfo-input">Você já tem um Super Trunfo em seu baralho</p>
            : (
              <label htmlFor="cardTrunfo">
                <input
                  id="cardTrunfo"
                  checked={cardTrunfo}
                  onChange={onInputChange}
                  type="checkbox"
                  data-testid="trunfo-input"
                />
                Super Trunfo !
              </label>)
        }

        <button
          id="saveCardButton"
          disabled={isSaveButtonDisabled}
          data-testid="save-button"
          type="submit"
          onClick={onSaveButtonClick}
        >
          Salvar
        </button>

      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
