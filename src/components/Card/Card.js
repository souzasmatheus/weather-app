import React from 'react';
import './Card.css';

function Card({ dataObj, isToday, index }) {
  if (isToday) {
    return (
      <div className="card-container">
        <div className="card-header">
          <p>Agora</p>
        </div>
        <div className="card-content">
          <img src={require(`../../assets/${dataObj.icon}.png`)} alt="" />
          <p>{dataObj.temperature}° C</p>
          <p>{dataObj.condition}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card-container">
        <div className="card-header">
          <p>{index === 0 ? 'Amanhã' : 'Depois de amanhã'}</p>
        </div>
        <div className="card-content">
          <p>
            min: {dataObj.temperature.min}° máx: {dataObj.temperature.max}°
          </p>
          <p>{dataObj.text_icon.text.pt}</p>
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  dataObj: {
    date_br: '28/07/2019',
    text_icon: {
      icon: {
        day: '1'
      },
      text: {
        pt: 'Sol com poucas nuvens'
      }
    },
    temperature: {
      min: 18,
      max: 32
    }
  },
  index: 0
};

export default Card;
