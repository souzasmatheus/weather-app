import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    city: '',
    state: '',
    isLoading: false
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

    statesEl.push(
      <option disabled selected>
        UF
      </option>
    );

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
          <select onChange={e => this.setState({ state: e.target.value })}>
            {this.renderStates()}
          </select>
          <input type="submit" value="Buscar" onClick={() => this.search()} />
        </div>
      </div>
    );
  }
}

export default App;
