import React, { Component } from 'react';
import icon from "../keyboard/icon/arrow.png";
import Spinner from 'react-spinkit'
import './confirm.css'
import senai from './images/senai.svg'
import vector from './images/vector.svg'
import vector_vip from './images/vector_vip.svg'
import vector_imprensa from './images/vector_imprensa.svg'

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
            // setTimeout(()=>{
            //     this.setState({'isPrinting': true});
            // },1500);
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
            console.log(this.state.credentials)
            let indexCategory = this.state.credentials.type ? this.state.credentials.type : 1;
            const perfil = [
                {title: 'Coordenação', color: '#010101'},
                {title: 'Staff', color: '#a7a8ad'},
                {title: 'Imprensa', color: '#e9cd38'},
                {title: 'VIP', color: '#0f5769'},
                {title: 'Participante', color: '#d66b2f'}
            ][indexCategory-1];
            // delete this.state.credentials.type_msg
            return (
              <div className="print" style={{position: 'relative'}}>
                <div className="accreditedFeedback-containner">
                    <div className="accreditedFeedback confirm-data">
                        <h2>Credenciamento realizado com sucesso</h2>
                        <p>Aguarde a impressão do seu crachá</p>
                    </div>
                    <div className="isPrinting">
                        <div style={{background: perfil.color}} className="isPrinting-tarja"></div>
                        {this.imageBackgroundPerfil(perfil)}
                        {this.imagePhoto(this.state.credentials.photo)}
                        {/* <img className="foto" src={this.state.credentials.photo} alt="Participante"/> */}
                        <p className="description">
                            {this.state.credentials.name}<br/>
                            <span>{this.state.credentials.companies.business_name}</span>
                        </p>
                        <p style={{background: perfil.color, color: (this.state.credentials.type_msg) ? '#fff' : perfil.color }} className="isPrinting-perfil" >{this.state.credentials.type_msg || "-"}</p>
                    </div>
                </div>
                <div className="empty-div isPrinting">
                    <img src={senai} />
                </div>
                <p style={{background: perfil.color, width: '50%', right: 0}} className="isPrinting-perfil isPrinting">&nbsp;</p>
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
                        {this.confirmPhoto(this.state.credentials.photo)}
                        {/* <img src={this.state.credentials.photo} alt="perfil usuario" style={{ width: 207, borderRadius: '50%', margin: '50px' }} /> */}
                        <p>{this.state.credentials.name}</p>
                        <p>CPF: {this.state.credentials.cpf_number}</p>
                    </div>

                </div>
            )
    }

    imagePhoto(perfil){
        if(perfil)
            return <img className="foto" src={perfil} alt="Participante"/>
    }

    confirmPhoto(photo){
        if(photo)
        return <img src={photo} alt="perfil usuario" style={{ width: 207, borderRadius: '50%', margin: '50px' }} />
    }
    imageBackgroundPerfil(perfil){
      let src = vector;
      if(perfil.title === 'VIP') src = vector_vip
      if(perfil.title === 'Imprensa') src = vector_imprensa

      return <img className="background" src={src}/>
    }

    loadCredential(cpf) {
        fetch(`https://api.enai2018.senai.br/api/credentials/${cpf}`)
            .then(r => r.json())
            .then(response => {
                if (response.data.length > 0) {
                    this.setState(state => {
                        return {
                            credentials: response.data[0],
                            load: false
                        }
                    })
                } else {
                    this.setState(state => { return { invalid: true } })
                }
            }).catch(e => {
              this.setState(state => { return { invalid: true } })
              console.log(e)
            })
    }

    goBack() {
        return this.props.history.push('/');
    }

    retry() {
        this.props.history.goBack();
    }

    confirmBtn() {
        this.setState({'isPrinting': true})
        setTimeout(() => {
            if(window.electron){
                window.electron.ipcRenderer.send('print-cracha');
            }
            fetch(`https://api.enai2018.senai.br/api/credentials/${this.state.credentials.id}`, {
                method: 'PATCH'
            })
            .then(r => r.json())
            .then(response => {
              // if (response.data.length > 0)
            }, 2000)
        })
    }

}
