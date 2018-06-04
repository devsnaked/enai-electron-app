import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import './qrReader.css'
import { timingSafeEqual } from 'crypto';
import { Link } from 'react-router-dom';
import icon from '../keyboard/icon/arrow.png'
export default class QrReaderPage extends Component {

    state = {hasDifficulty: false}
    
    handleScan(data) {
        console.log(data)
        if (!data) return false;
            
        this.props.history.push(`/credentials/${data}`)

    }

    render() {
        if(this.state.hasDifficulty){
            var data = {
                msg: 'Diminua a opacidade da tela do celular', 
                class: "message warning"
            } 
        } else {
            var data = { msg: 'Apresente seu QRCODE', class: "message"};
        }
        
        return (
            <div className="qr-content">
                <Link to="/" className="back-btn">
                    <img src={icon} alt="icone de voltar" />
                </Link>
                <div className="qr-scanner">
                    <QrReader
                        onScan={this.handleScan.bind(this)}
                        onError={this.handleError.bind(this)}
                    />
                </div>
                <p className={data.class}>{data.msg}</p>
            </div>
        )
    }
    componentDidMount() {
        this.timerID = setTimeout(
            () => {
                this.setState({hasDifficulty: true});
            },
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
  

    handleError(err){
        console.log(err)
    }

}