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
        const id_usuario = localStorage.getItem('id');
        const id_tipo = 2;
        add.Add(info.body, parseInt(id_usuario), id_tipo)
        this.setState({addEmpresa: false})
        notification('success', 'Empresa Cadastrada!')
    })
    .catch(err => {
      this.setState({addEmpresa: false})
      notification('error', 'Não foi possível cadastrar empresa!')
      
    })
  }

  render() {
    const maskStyle = {
      
      margin: 0,
      fontVariant: 'tabular-nums',
      listStyle: 'none',
      position: 'relative',
      width: '100%',
      height: '32px',
      color: 'rgba(0, 0, 0, 0.65)',
      backgroundColor: '#fff',
      backgroundImage: 'none',
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
      padding: '18px',
      paddingLeft: '7px',
      }

      const content = (
        <div>
          <p>Você não possui nenhuma empresa cadastrada!</p>
          
        </div>
      );
  
    return (
      
      <StyleButton>
               <Popover content={content} placement="bottom" title="Cadastre uma empresa!">

        <div id="main"> 

       <Modal isOpen={this.state.addEmpresa} scrollable={true}>
           <ModalHeader > Adicionar Empresa </ModalHeader>
           <ModalBody > 
            <Form >
              <div style={{padding: '10px'}}>
             <span>Nome da Empresa: </span>
              <Input id="empresa" placeholder="Nome da Empresa"/>
              </div>
              <div style={{padding: '10px'}}>
              <span>Cnpj da empresa: </span>
              <span style={{color: 'red'}}>{this.state.message}</span>
              <MaskedInput style={maskStyle}  mask='11.111.111/1111-11' id="CNPJ" placeholder="CNPJ" onChange={this.goCNPJ} />
              </div>
            </Form>
           </ModalBody>
           <ModalFooter > 
               <Button type='primary' onClick={this.state.submit}> Adicionar </Button>
               
               <Button onClick={() => this.setState({ addEmpresa: false })}> Cancelar </Button>
           </ModalFooter>
       </Modal>
       
       </div>
       </Popover>
       </StyleButton>
       
    );
  }
}
