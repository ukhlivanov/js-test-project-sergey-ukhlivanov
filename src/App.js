import React from 'react';
import './App.css';

import Header from './components/Header'
import Form from './components/Form'

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Form />
      </div>
    );
  }

}


