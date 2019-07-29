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
    error: false,
    data: []
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

  async search() {
    this.setState({ isLoading: true });

    // Workaround to make sure api response does not get blocked by the browser
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';

    // Get city's id
    const cityId = await Axios.get(
      proxyURL +
        `http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${
          this.state.city
        }&state=${this.state.state}&token=${apiToken}`
    )
      .then(res => res.data[0].id)
      .catch(err => {
        this.setState({ isLoading: false, error: true });
      });

    // Register city's id in api token
    await Axios.put(
      proxyURL +
        `http://apiadvisor.climatempo.com.br/api-manager/user-token/${apiToken}/locales`,
      {
        localeId: [cityId]
      }
    )
      .then(res => res)
      .catch(err => {
        this.setState({ isLoading: false, error: true });
      });

    // Fetch weather data and set new state to component
    Axios.get(
      proxyURL +
        `http://apiadvisor.climatempo.com.br/api/v1/weather/locale/${cityId}/current?token=${apiToken}`
    )
      .then(res => {
        let data = [];
        data.push(res.data.data);
        Axios.get(
          proxyURL +
            `http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/${cityId}/days/15?token=${apiToken}`
        )
          .then(res => {
            data.push(res.data.data[1]);
            data.push(res.data.data[2]);
            this.setState({ data, isLoading: false });
            console.log(this.state.data);
          })
          .catch(err => {
            this.setState({ isLoading: false, error: true });
          });
      })
      .catch(err => {
        this.setState({ isLoading: false, error: true });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <input
            onChange={e => this.setState({ city: e.target.value.trimRight() })}
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
          {!this.state.isLoading &&
            !this.state.error &&
            this.state.data.length === 0 && (
              <h1 className="message">Aguardando input</h1>
            )}
          {this.state.isLoading && (
            <img
              src="https://media1.tenor.com/images/556e9ff845b7dd0c62dcdbbb00babb4b/tenor.gif?itemid=5300368"
              alt=""
              style={{ width: '200px' }}
            />
          )}
          {!this.state.isLoading && this.state.error && (
            <h1 className="message">
              Ocorreu um erro. Por favor, verifique se o nome da cidade está
              escrito corretamente.
            </h1>
          )}
          {!this.state.isLoading &&
            this.state.data.length !== 0 &&
            this.state.data.map((day, index) => (
              <Card key={`card-${index}`} dataObj={day} index={index} />
            ))}
        </div>
      </div>
    );
  }
}

export default App;
