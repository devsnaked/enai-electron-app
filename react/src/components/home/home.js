import React, { Component } from "react";
import "./home.css";
import logoSVG from "./logo.svg";

import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="content">
        <div className="center-content">
          <img src={logoSVG} alt="Logo enai 2018" />
          <h1>Credenciamento</h1>
          <Link to="/qr">
            <button>QRCODE</button>
          </Link>
          <Link to="/keyboard">
            <button>CPF</button>
          </Link>
        </div>
      </div>
    );
  }
}
