import React, { Component } from 'react';
import icon from "../keyboard/icon/arrow.png";
import Spinner from 'react-spinkit'
import './confirm.css'

export default class Confirm extends Component {

    state = {
        load: true,
        credentials: null,
        invalid: false,
        isPrinting: false
    }

    constructor(props) {
        super(props);
        setTimeout(() => {
            this.loadCredential(props.match.params.cpf);
            setTimeout(()=>{
                this.setState({'isPrinting': true});
            },1500);
        }, 1000);
        if(window.electron){
            window.electron.ipcRenderer.on('printed', () => {
                setTimeout(()=>{
                    this.props.history.push('/');
                }, 10*1000);
            });
        }
    }

    render() {
        if (this.state.load && !this.state.invalid)
            return (
                <div className="loader-content">
                    <Spinner name='ball-scale-multiple' className="spinner" color="#0cf"/>
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
        if(this.state.isPrinting){
            let indexCategory = this.state.credentials.type ? this.state.credentials.type : 3;   
            const perfil = [
                {title: 'Coordenação', color: '#010101'},
                {title: 'Staff', color: '#a7a8ad'},
                {title: 'Imprensa', color: '#e9cd38'},
                {title: 'VIP', color: '#0f5769'},
                {title: 'Participante', color: '#d66b2f'}
            ][indexCategory];

            return (
                <div className="accreditedFeedback-containner">
                    <div className="accreditedFeedback confirm-data">
                        <h2>Credenciamento realizado com sucesso</h2>
                        <p>Aguarde a impressão do seu crachá</p>
                    </div>
                    <div className="isPrinting">
                        <div style={{background: perfil.color}} className="isPrinting-tarja"></div>
                        <img className="background" src="./vector.svg" alt="Participante"/> 
                        <img className="foto" src={this.state.credentials.photo} alt="Participante"/> 
                        <p className="description">
                            {this.state.credentials.name}<br/>
                            <span>{this.state.credentials.companies.business_name}</span>
                        </p>
                        <p style={{background: perfil.color}} className="isPrinting-perfil">{perfil.title}</p>
                    </div>
                </div>
            );
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
        this.setState({'isPrinting': true})
        window.electron.ipcRenderer.send('print-cracha');
       
        fetch(`http://10.83.3.198:8000/api/credentials/${this.state.credentials.id}`, {
            method: 'PATCH'
        }) 
        .then(r => r.json())
        .then(response => {
            // if (response.data.length > 0)
        })
    }

}