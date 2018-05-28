import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <button onClick={() => this.printPage()}>
          Printar
        </button>
      </div>
    );
  }

  printPage(){
    // const {webContents} = require('electron')
    // console.log(webContents)
    console.log('hi')
  }



}

export default App;
