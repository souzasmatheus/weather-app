import React, { Component } from 'react';
import Axios from 'axios';
import apiToken from './config';
import querystring from 'querystring';
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
    Axios.get(
      'https://cors-anywhere.herokuapp.com/' +
        `http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${
          this.state.city
        }&state=${this.state.state}&token=${apiToken}`
    )
      .then(res => {
        Axios.put(
          'https://cors-anywhere.herokuapp.com/' +
            `http://apiadvisor.climatempo.com.br/api-manager/user-token/${apiToken}/locales`,
          {
            localeId: [res.data[0].id]
          }
        )
          .then(res => {
            Axios.get(
              'https://cors-anywhere.herokuapp.com/' +
                `http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/${
                  res.data.locales[0]
                }/days/15?token=${apiToken}`
            )
              .then(res => console.log(res))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
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
