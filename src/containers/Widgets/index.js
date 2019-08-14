import React, { Component } from 'react';
import $ from 'jquery';
import MaskedInput from 'react-maskedinput'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Input, Form, Button, Popover } from 'antd';
import ValidarCNPJ from '../../helpers/Validacoes/ValidaCNPJ'
import Conversores from '../../helpers/Conversores';
import { StyleButton } from './style';
import notification from '../../components/notification';
import AddUserHasCompany from '../../helpers/Add/AddUserHasCompany';

export default class User extends Component {

constructor(){
  super();
  this.state={
    addEmpresa: false,
    message: '',
    notification: null
  };
  this.goCNPJ = this.goCNPJ.bind(this)
  this.submit = this.submit.bind(this)
}

  goCNPJ(event){
  const empresa = document.getElementById('empresa')
  const conversores = new Conversores()
  let converte = event.target.value
  converte = converte.toString()
  let atualizado = conversores.converteCNPJ(converte)
  atualizado = atualizado.toString()
  const validar = new ValidarCNPJ();
  
  if(validar.validarCNPJ(atualizado) === false || empresa == null){
    
   this.setState({message: 'CNPJ inválido!', submit: () => {
    this.setState({addEmpresa: false, message: ''})
    notification('error', 'Não foi possível concluir cadastro!')
     }
  })

  }else{
    this.setState({message:'', submit: this.submit})
  }
  if(atualizado.length === 0){
    this.setState({message: ''})
  }
}

  submit(){
    
    const conversores = new Conversores();
    let cnpj = document.getElementById('CNPJ').value;
    const Nome = document.getElementById('empresa').value;
    cnpj = conversores.converteCNPJ(cnpj);
    const requestInfo = {
      
      method: 'POST',
      body: JSON.stringify({ 
        razao_social: Nome,
        cpf_cnpj: cnpj,
       }),
       headers: new Headers({
        'Content-type':'application/json'
      })
    }

    fetch('http://localhost:5000/newCompany', requestInfo)
    .then(resp => {
      if(resp.ok){
        return resp.json()
      }
    })
    .then(info => {
      this.setState({ addEmpresa: false })
      notification({ 'success': info.message })
    })
    .catch(err => {
      this.setState({addEmpresa: false})
      notification('error', 'Não foi possível cadastrar empresa!')
      
    })
  }

  render() {
  
    return (
       <div/>
    );
  }
}
