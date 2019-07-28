import React, { Component } from 'react';
import Axios from 'axios';
import apiToken from './config';
import './App.css';
import Card from './components/Card/Card';

class App extends Component {
  state = {
    city: '',
    state: '',
    isLoading: false,
    error: false
  };

  renderStates() {
    const states = [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO'
    ];

    const statesEl = states.map(state => (
      <option key={`state-${state}`} value={state}>
        {state}
      </option>
    ));

    return statesEl;
  }

  search() {
    this.setState({ isLoading: true });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <input
            onChange={e => this.setState({ city: e.target.value })}
            type="text"
            placeholder="Informe a cidade"
          />
          <select
            defaultValue="UF"
            onChange={e => this.setState({ state: e.target.value })}
          >
            <option disabled>UF</option>
            {this.renderStates()}
          </select>
          <input type="submit" value="Buscar" onClick={() => this.search()} />
        </div>
        <div className="content">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    );
  }
}

export default App;
