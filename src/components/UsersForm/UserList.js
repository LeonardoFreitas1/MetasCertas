import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Table } from 'reactstrap'
import { Checkbox, Button } from 'antd';
import notification from '../../components/notification';
import { Form } from 'antd';
import UserSyle from './Users.style';
import WrappedFormWIthSubmissionButton from './addUser';
import $ from 'jquery';
import Conversores from '../../helpers/Conversores/index'



export default class UserList extends Component {
    
constructor(){
    super()
    this.state = {
        open: false,
        disabledAD: false,
        disabledRT: false,
        edit: false,
    };
    this.MudaTag = this.MudaTag.bind(this)
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
  

componentDidMount(){
   

    fetch('http://localhost:5000/users')
    .then(response => response.json())
        .then( async info => {

          
          
        let data = info.user;
       console.log(data[1])
        const list = document.getElementById("table")
        
            
        for(var i = 0; i <= data.length; i++){
            const tr = document.createElement('tr')

            if(data[i].ativo === true){
              tr.setAttribute('class', 'disable')
              

            }
            
            list.appendChild(tr);
            
            const id = document.createElement('td')
            id.innerHTML = data[i].id_usuario

            tr.appendChild(id)

            const nome = document.createElement('td')
            nome.setAttribute('id', data[i].id_usuario)
            nome.setAttribute('headers', 'nome')
            nome.innerHTML = data[i].nome;
            nome.addEventListener('dblclick', () => this.editLine(nome))
            tr.appendChild(nome)

            
            const check = document.createElement('td');

            check.setAttribute('class', 'tag')
            check.setAttribute('id', data[i].id_usuario)
            check.innerHTML = data[i].usuarios_tipos
            check.addEventListener('dblclick', () => this.setState({ editTag: true, idTag: check.id }))
            tr.appendChild(check)

           
            const cpf = document.createElement('td')
            cpf.innerHTML =  data[i].cpf_cnpj;
            cpf.setAttribute('id', data[i].id_usuario)
            cpf.setAttribute('headers', 'cpf_cnpj')
            cpf.addEventListener('dblclick', () => this.editLine(cpf))
            tr.appendChild(cpf)
            
            const whatsapp = document.createElement('td')
            whatsapp.innerHTML = data[i].whatsapp;
            whatsapp.setAttribute('headers', 'whatsapp')
            whatsapp.setAttribute('id', data[i].id_usuario)
            whatsapp.addEventListener('dblclick', () => this.editLine(whatsapp))
            tr.appendChild(whatsapp)

           
            const email = document.createElement('td')
            email.innerHTML = data[i].email;
            email.setAttribute('id', data[i].id_usuario)
            email.setAttribute('headers', 'email')
            email.addEventListener('dblclick', () => this.editLine(email))
            tr.appendChild(email) 
            
            
            
            const edit = document.createElement('Button');
            edit.setAttribute('class', 'ion-edit');
            edit.setAttribute('id', data[i].id_usuario);
            edit.addEventListener('click', () => this.setState({ edit: true }))
            
            tr.appendChild(edit)


            const remove = document.createElement('Button');
            remove.setAttribute("class", "ion-android-delete")
         
            remove.setAttribute("id", data[i].id_usuario);
            
            remove.addEventListener("click", () => this.Desabilitar(remove.id))
            
            tr.appendChild(remove)
            
            
            
            
        }
      
            
        })
        .catch(err => {
            console.log(err)
        })
}

editLine(tag){
  const envia = new UserList()
  var conteudoOriginal = $(tag).text();

  $(tag).addClass("celulaEmEdicao");
  $(tag).html("<input type='text' value='" + conteudoOriginal + "' />");
  $(tag).children().first().focus();
  
  $(tag).children().first().keypress(function (e) {
      if (e.which === 13) {
          var novoConteudo = $(this).val();
          $(this).attr('id', tag.id)
          $(this).parent().text(novoConteudo);
          $(this).parent().removeClass("celulaEmEdicao");
          $(this).addClass(tag.headers)
          envia.atualiza(this)
      }
  });
   
$(this).children().first().blur(function(){
  $(this).parent().text(conteudoOriginal);
  $(this).parent().removeClass("celulaEmEdicao");
});
  
}

atualiza(tag){
  const novoConteudo = tag.value;
  const id = tag.id;
  const conteudo = $(tag).attr('class')
  
  const info = {
    method: 'POST',
    mode:'cors',
    body: JSON.stringify({ 
      id: id,
      novoConteudo: novoConteudo,
      conteudo: conteudo
     }),
     headers: new Headers({
      'Content-type':'application/json'
    })
  }
  fetch('http://localhost:5000/atualiza', info).then( foi =>{
     if(foi.ok){
    
      notification('success','Usuário atualizado!')

    }
        }).catch(err => {
       console.log(err)
     })
}

MudaTag(){
  const MudaAdmin = document.getElementById('MudaAdmin')
  const MudaRoot = document.getElementById('MudaRoot')
  const Geral = document.getElementById('Geral')

  const id = this.state.idTag
  var novoConteudo = null;
  if(MudaAdmin.checked){
novoConteudo = 'Admin'
  }else if(MudaRoot.checked){
novoConteudo = 'Root'
  }else if(Geral.checked){
    novoConteudo = 'Geral'
  }

  const info = {
    method: 'POST',
    mode:'cors',
    body: JSON.stringify({ 
      id: id,
      novoConteudo: novoConteudo,
      conteudo: 'usuarios_tipos'
     }),
     headers: new Headers({
      'Content-type':'application/json'
    })
  }
  fetch('http://localhost:5000/atualiza', info).then( foi =>{
     if(foi.ok){
    
      notification('success','Usuário atualizado!')
      window.location.reload()
    }
        }).catch(err => {
       notification('error', 'Não foi possível cadastrar usuário!')
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
    
      
        return ( 
            <UserSyle>

<div>

<Table striped bordered hover variant="dark" style={{zIndex:'2'}}>
  <thead>
    <tr>
      <th>#</th>
      <th>Nome</th>
      <th>Tag</th>
      <th>CPF</th>
      <th>Whatsapp</th>
      <th>Email</th>
      <th></th>
    </tr>
  </thead>
  <tbody id='table'>

  </tbody>
  
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