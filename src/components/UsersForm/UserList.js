import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap'
import { Checkbox, Button } from 'antd';
import notification from '../../components/notification';
import { Form } from 'antd';
import UserSyle from './Users.style';
import WrappedFormWIthSubmissionButton from './addUser';
import $ from 'jquery';
import Conversores from '../../helpers/Conversores/index'
import { Table, Divider, Tag } from 'antd';


export default class UserList extends Component {
    
constructor(){
    super()
    this.state = {
        open: false,
        disabledAD: false,
        disabledRT: false,
        edit: false,
        data:[],
    };
    this.canSubmit = this.canSubmit.bind(this)
}


Desabilitar(id){

  var userInfo = {
    method: 'POST',
    mode:'cors',
    body: JSON.stringify({ 
      id: id
     }),
     headers: new Headers({
      'Content-type':'application/json'
    })
  }

  fetch('http://localhost:5000/disable', userInfo).then( foi =>{
    if(foi.ok){
      notification('warning', 'Usuário Desabilitado!')
      setTimeout(() => window.location.reload(), 1000)
        
       
      }
  }).catch(err => {
    console.log(err)
  })
  }
  
  async componentDidMount(){

    await fetch('http://localhost:5000/users')
    .then(response => response.json())
        .then( async info => {
  
        let data = info.user;
        data.map( dados => {
          const {cpf_cnpj, email, id_usuario, nome, usuario, whatsapp} = dados;
          const informacao = {
            key: id_usuario,
            nome: nome,
            usuario: usuario,
            CPF: cpf_cnpj,
            tags: ['Root'],
            whatsapp: whatsapp,
            email: email,

           }
         this.setState({data:[...this.state.data, informacao]
          })

        })
            
        })
        .catch(err => {
            console.log(err)
        })
         
  }


envia(){
  
  const conversores = new Conversores()
  const nome = document.getElementById('nome').value
  let cpf = document.getElementById('cpf').value
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  let whatsapp = document.getElementById('whatsapp').value
  const usuario = document.getElementById('usuario').value
  const TGadmin = document.getElementById('TGadmin');
  const TGroot = document.getElementById('TGroot');
  const td = document.createElement('td')
  const tr = document.createElement('tr')
  const list = document.getElementById("table")
  let marcado = null
    whatsapp = conversores.converteWhatsapp(whatsapp)
    cpf = conversores.converteCPF(cpf)
    if(TGadmin.checked){
      marcado = 'Admin'

    }
     if(TGroot.checked){
      marcado = 'Root'
     
    }

    const requestInfo = {
      
      method: 'POST',
      mode:'cors',
      body: JSON.stringify({
        id_tipo: 1,
        cpf_cnpj: cpf,
        nome: nome,
        usuario: usuario,
        senha: password,
        email: email,
        whatsapp: whatsapp,
        usuarios_tipos: marcado
       }),
       headers: new Headers({
        'Content-type':'application/json'
      })
    }
  
    fetch('http://localhost:5000/addUser', requestInfo)
    
    .then(response => {
      if(response.ok){
        response.text()
        td.innerHTML = nome
        tr.appendChild(td)
        list.appendChild(tr)
        return notification('success', 'Usuário Cadastrado!')
       
      }
    }).catch(err =>{
      return console.log(err)
      
    })
    
  }


  canSubmit(){

  
  const nome = document.getElementById('nome').value
  const cpf = document.getElementById('cpf').value
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const whatsapp = document.getElementById('whatsapp').value

    const envia = new UserList()
    if(cpf === '' || nome === ''|| password === ''|| email === '' || whatsapp === ''){
      return notification('warning', 'Todos os campos devem estar preenchidos!')
    }else{
      this.setState({ open: false })
      envia.envia()
    }

  }
  
    render(){

      const columns = [
        {
          title: 'Name',
          dataIndex: 'nome',
          key: 'nome',
        
        },
        {
          title: 'Usuario',
          dataIndex: 'usuario',
          key: 'usuario',
        },
        {
          title: 'CPF',
          dataIndex: 'CPF',
          key: 'CPF',
        },
       
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <span>
              {tags.map(tag => {

                let color = tag == 'Root' ? 'volcano' : 'green';

                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          ),
        },
        {
          title: 'Whatsapp',
          dataIndex: 'whatsapp',
          key: 'whatsapp'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Ações',
          key: 'action',
          render: (text, record) => (
            <span>
              <a style={{color: '#1E90FF	'}} onClick={() => console.log('clicado')}>Edit</a>
              <Divider type="vertical" />
              <a style={{color: '#FF6347	'}} onClick={() => console.log('clicado')}>Delete</a>
            </span>
          ),
        },
      ];

        return ( 
            <UserSyle>

<div>

<Table columns={columns} dataSource={this.state.data}>
  
</Table>
         
      </div>

      <Container> 

       <Modal isOpen={this.state.open} scrollable={true}>
           <ModalHeader > Adicionar Usuário </ModalHeader>
           <ModalBody > 
           <WrappedFormWIthSubmissionButton/>
           <Form >
            <Checkbox id="TGadmin" disabled={this.state.disabledAD}>Admin</Checkbox>
            <Checkbox id="TGroot" disabled={this.state.disabledRT}>Root</Checkbox>
   
            </Form>
           </ModalBody>
           <ModalFooter > 
               <Button type='primary' onClick={this.canSubmit}> Adicionar </Button>
               
               <Button onClick={() => this.setState({ open: false })}> Cancelar </Button>
           </ModalFooter>
       </Modal>

       </Container>

          <Container>
          <Modal isOpen={this.state.editTag} scrollable={true}>
          <ModalHeader > Editar Tag </ModalHeader>
          <ModalBody > 
            <Checkbox id='MudaAdmin' classname='usuarios_tipos'>Admin</Checkbox>
            <Checkbox id='MudaRoot' classname='usuarios_tipos'>Root</Checkbox>
            <Checkbox id='Geral' classname='usuarios_tipos'>Geral</Checkbox>

          </ModalBody>
          <ModalFooter > 
               <Button type='primary' onClick={this.MudaTag}> Adicionar </Button>
               
               <Button onClick={() => this.setState({ editTag: false })}> Cancelar </Button>
           </ModalFooter>
          </Modal>
          </Container>
          <div className='botao'>
          <button className='round' onClick={() => this.setState({ open: true })}>+</button>
          </div>


          

      </UserSyle>
    
        
        )
                    
    }
}