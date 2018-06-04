import React, { Component } from 'react';
import icon from "../keyboard/icon/arrow.png";
import './confirm.css'

export default class Confirm extends Component {

    state = {
        load: true,
        credentials: null,
        invalid: false
    }

    constructor(props) {
        super(props)
        setTimeout(() => {
            this.loadCredential(props.match.params.cpf)
        }, 500)
    }

    render() {
        if (this.state.load && !this.state.invalid)
            return (
                <div className="loader-content">
                    <div className="loader"></div>
                    <p>Carregando...</p>
                </div>
            )
        if (this.state.invalid) {
            return (
                <div className="content-confirm">
                    <div className="header-bar">
                        <button className="back-btn" onClick={() => this.goBack()}>
                            <img src={icon} alt="icone de voltar" />
                        </button>
                    </div>
                    <div className="confirm-data">
                        <h2 style={{color: '#777'}}>NÃO FOI ENCONTRADO NENHUM REGISTRO. <br /> DIRIJA-SE À SECRETARIA PARA MAIS INFORMAÇÕES.</h2>
                    </div>

                </div>
            )
        }
        if (this.state.credentials)
            return (
                <div className="content-confirm">
                    <div className="header-bar">
                        <button className="back-btn" onClick={() => this.goBack()}>
                            <img src={icon} alt="icone de voltar" />
                        </button>
                        <button className="confirm-btn">
                            CONFIRMAR
                        </button>
                    </div>
                    <div className="confirm-data">
                        <h2>CONFIRME SEUS DADOS:</h2>
                        <p>{this.state.credentials.name}</p>
                        <p>CPF: {this.state.credentials.cpf_number}</p>
                    </div>

                </div>
            )
    }


    loadCredential(cpf) {
        fetch(`http://10.83.3.198:8000/api/credentials/${cpf}`)
            .then(r => r.json())
            .then(response => {
                if (response.data.length > 0) {
                    this.setState(state => {
                        console.log(response.data[0])
                        return {
                            credentials: response.data[0],
                            load: false
                        }
                    })
                } else {
                    console.log(response)
                    this.setState(state => { return { invalid: true } })
                }
            })
            .catch(e => this.setState(state => { return { invalid: true } }))
    }

    goBack() {
        this.props.history.goBack();
    }
}