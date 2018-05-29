import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/home'
import Keyboard from './components/keyboard/keyboard'
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="content-home">
        <BrowserRouter className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/keyboard" component={Keyboard} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  

}

export default App;
