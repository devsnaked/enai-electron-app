import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/home'
import Keyboard from './components/keyboard/keyboard'
import Confirm from './components/confirm/confirm'
import QrReaderPage from './components/qr-reader/qrReader'
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="content-home">
        <BrowserRouter className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/keyboard" component={Keyboard} />
            <Route exact path="/credentials/:cpf" component={Confirm} />
            <Route exact path="/qr" component={QrReaderPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  

}

export default App;
