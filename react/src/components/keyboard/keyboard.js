import React, { Component } from "react";
import "./keyboard.css";
import icon from "./icon/arrow.png";
import { Link } from "react-router-dom";
export default class Keyboard extends Component {
  state = {
    input: [],
    text: ["_", "_", "_", ".", "_", "_", "_", ".", "_", "_", "_", "-", "_", "_"]
  };

  render() {
    return (
      <div className="content-keyboard">
        <div className="header-bar">
          <Link to="/" className="back-btn">
              <img src={icon} alt="icone de voltar" />
          </Link>
          {this.confirmButton()}
        </div>
        <div className="keyboard">
          <h2>INFORME SEU CPF:</h2>
          <div className="output">{this.maskOutput()}</div>
          <div className="btns">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "X"].map(btn => (
              <button
                key={btn}
                onClick={e => this.KeyboardClick(e)}
                value={btn}>
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  KeyboardClick(event) {
    let value = event.target.value;
    if (value === "X") return this.removeItemInput(event);

    if (this.state.input.length === 14) return false;



    this.setState(
      state => {
        let arrayPush = [];
        if ([3, 7, 11].includes(this.state.input.length))
          arrayPush.push(this.state.input.length === 11 ? "-" : ".");

        arrayPush.push(parseInt(value));

        return {
          input: [...this.state.input, ...arrayPush]
        };
      });
  }

  maskOutput() {
    return this.state.text.map((str, index) => {
      if (
        typeof this.state.input[index] === "undefined" ||
        str === "." ||
        str === "-"
      )
        return str;
      return this.state.input[index];
    });
  }

  removeItemInput(event) {
    let array = [...this.state.input];

    if (['.', '-'].includes(this.state.input[this.state.input.length - 1]))
      array.pop();

    array.pop();

    this.setState(state => {
      return {
        input: [...array]
      }
    })
  }

  confirmButton() {
    if (this.state.input.length === 14) {
      let cpf = this.state.input.reduce((acc, i) => acc + i.toString())
      return (
        <Link to={`/credentials/${cpf}`}>
          <button className="confirm-btn">
            CONFIRMAR
          </button>
        </Link>
      )
    }
  }

}
