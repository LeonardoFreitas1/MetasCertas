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

  componentDidMount(){
    fetch('http://localhost:5000/users')
    .then(user => user.json())
    .then(data => {

       const id =  localStorage.getItem('id')
      const info = data.user[id - 1].id_empresa
      console.log(info)
      if(info == null){
        $('#main').append(`
        <div id="box">
        <span>Adicionar Empresa:</span>
        <button id="add" class="bttn">Adicionar Empresa</button>
        </div>
        
        `)
       let button =  document.getElementById('add')
       button.addEventListener('click', () => this.setState({addEmpresa: true}))
      }else{
        $('.main').empty()
      }
    })
  }

  submit(){
    const add = new AddUserHasCompany();
    
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
        const id_usuario = localStorage.getItem('c_user');
        const id_tipo = localStorage.getItem('t_user');
        add.Add(info.body, id_usuario, id_tipo)
        this.setState({addEmpresa: false})
        notification('success', 'Empresa Cadastrada!')
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
