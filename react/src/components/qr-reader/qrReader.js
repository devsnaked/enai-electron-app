import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import './qrReader.css'
import { timingSafeEqual } from 'crypto';
import { Link } from 'react-router-dom';
import icon from '../keyboard/icon/arrow.png'
export default class QrReaderPage extends Component {

    state = {}

    handleScan(data) {
        console.log(data)
        if (!data) return false;
            
        this.props.history.push(`/credentials/${data}`)

    }

    render() {
        return (
            <div className="qr-content">
                <Link to="/">
                    <button className="back-btn">
                        <img src={icon} alt="icone de voltar" />
                    </button>
                </Link>
                <div className="qr-scanner">
                    <QrReader
                        onScan={this.handleScan.bind(this)}
                        onError={this.handleError.bind(this)}
                    />
                </div>
                <p className="message">Apresente seu QRCODE</p>
            </div>
        )
    }

    handleError(err){
        console.log(err)
    }

}