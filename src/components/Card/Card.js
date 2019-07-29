import React from 'react';
import './Card.css';

function Card({ dataObj, index }) {
  // Get weekday name
  const week = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado'
  ];
  const splitDate = dataObj.date.split('-');
  const formattedDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
  const dayName = week[formattedDate.getDay()];

  const isToday = index === 0;
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
          <p>{index === 1 ? 'Amanhã' : dayName}</p>
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

export default Card;
