import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import icon from "../keyboard/icon/arrow.png";
import Spinner from 'react-spinkit'
import './confirm.css'

export default class Confirm extends Component {

    state = {
        load: true,
        credentials: null,
        invalid: false
    }

    constructor(props) {
        super(props);

        setTimeout(() => {
            this.loadCredential(props.match.params.cpf)
        }, 1000)
    }

    render() {
        if (this.state.load && !this.state.invalid)
            return (
                <div className="loader-content">
                    {/* <Loader type="ball-scale-multiple"/> */}
                    <Spinner name='ball-scale-multiple' className="spinner" color="#0cf"/>
                    {/* <div className="loader"></div> */}
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
                        <h2 style={{ color: '#777' }}>NÃO FOI ENCONTRADO NENHUM REGISTRO. <br /> DIRIJA-SE À SECRETARIA PARA MAIS INFORMAÇÕES.</h2>
                        <button className="confirm-btn retry" onClick={this.retry.bind(this)}>TENTAR NOVAMENTE</button>
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
                        <button className="confirm-btn" onClick={this.confirmBtn.bind(this)}>
                            CONFIRMAR
                        </button>
                    </div>
                    <div className="confirm-data">
                        <h2>CONFIRME SEUS DADOS:</h2>
                        <img src={this.state.credentials.photo} alt="perfil usuario" style={{ width: 207, borderRadius: '50%', margin: '50px' }} />
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
        return this.props.history.push('/');
    }

    retry() {
        this.props.history.goBack();
    }

    confirmBtn() {
        fetch(`http://10.83.3.198:8000/api/credentials/${this.state.credentials.id}`, {
            method: 'PATCH'
        })
            .then(r => r.json())
            .then(response => {
                if (response.data.length > 0)
                    window.electron.ipcRenderer.send('print-cracha', { data: response });
            })
    }

}