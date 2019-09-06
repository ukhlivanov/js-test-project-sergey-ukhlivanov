import axios from 'axios';
import qs from 'querystring';

import React, { Component } from 'react';
import './App.css';

const API_BASE_URL = 'https://naosxd9a48.execute-api.us-east-2.amazonaws.com/hiring';
const API_KEY = '8FbZ6sdhIf6yEPWVM1Sw56Km5G1GXwKL73CvWzWv';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 250,
  headers: {
    'x-api-key': API_KEY
  }
});

class App extends Component {
  constructor() {
    super();

    let params = {};

    if (window.location.search) {
      params = qs.parse(window.location.search.substr(1));
    }

    this.isDev = params.dev !== undefined;

    this.state = {
      age: this.isDev ? '30' : undefined,
      contribution: this.isDev ? '85000' : undefined,
      income: this.isDev ? '850000' : undefined,
      savings: this.isDev ? '50000' : undefined
    };
  }

  componentDidMount() {
    if (this.isDev) this.getRetirmentProjection();
  }

  handleChange = (event) => {
    console.log(event.target.name + ' changed');

    this.setState({
      [event.target.name]: parseInt(event.target.value)
    });

    this.getRetirmentProjection();
  }

  calculateMinRetirment = () => {
    const minRetirment = this.state.retirmentProjection.filter(data => {
      if (data.availableMonthlyIncome < data.minimumMonthlyIncome) return;
      return true;
    });

    console.log(minRetirment);
    this.setState({ minRetirment: minRetirment[0].year });
  }

  getRetirmentProjection = async () => {
    const { age, contribution, income, savings } = this.state;
    if (!age || !contribution || !income) return;

    await api.post('/calculate', {
      age,
      contribution,
      income,
      savings
    })
    .then(res => {
      console.log('testing!!', res);
      this.setState({ retirmentProjection: res.data.data });
      this.calculateMinRetirment();
    });
  }

  render() {
    const { minRetirment } = this.state;

    const inputProps = {
      autoComplete: 'off',
      type: 'number',
      onChange: this.handleChange
    };

    return (
      <main>
        <div className="form">
          <big style={{ display: 'block', marginBottom: '10px' }}>
            <b>Retirment Calculator</b>
          </big>

          <div style={{ marginBottom: '10px' }}>
            <span>I am</span>&thinsp;
            <input value={this.state.age} size={2} maxLength={2} id="age" name="age" {...inputProps} />
            &thinsp;
            <label>years old</label>
            &thinsp;
            <span>with</span>&thinsp;
            <input value={this.state.income} size={8} id="income" name="income" {...inputProps} />
            &thinsp;
            <span>in</span>&thinsp;
            <label>pre-tax income</label>
            &thinsp;
            <span>and</span>&thinsp;
            <input value={this.state.savings} size={8} id="savings" name="savings" {...inputProps} />
            &thinsp;
            <span>in</span>&thinsp;
            <label>savings</label>.
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>I can contribute</label>
            <input value={this.state.contribution} size={8} id="contribution" name="contribution" {...inputProps} />
            &thinsp;
            <span>every month to my retirment savings.</span>
          </div>

          {!minRetirment && (
            <p><b><i>This is less than 10% of your monthly income</i></b></p>
          )}

          {minRetirment && (
            <p>The earliest you can retire with 70% of your current income is <b>{minRetirment}</b></p>
          )}
        </div>
        <figure className="visualization">
          Visualization
        </figure>
      </main>
    );
  }
}

export default App;
