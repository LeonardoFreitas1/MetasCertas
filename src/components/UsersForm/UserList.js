import React, { Component } from 'react';
import intlMessages from '../utility/intlMessages';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap'
import { Input, Checkbox, Button } from 'antd';
import notification from '../../components/notification';
import { Form } from 'antd';
import SignUpStyleWrapper from './Users.style';
import ValidaCPF from '../../helpers/Validacoes/ValidaCPF'
import WrappedFormWIthSubmissionButton from './addUser';
import { InputGroup } from '../../components/uielements/input';

import Select, { SelectOption } from '../../components/uielements/select';

const FormItem = Form.Item;

 

export default class UserList extends Component {


constructor(){
    super()
    this.state = {
        open: false,
        disabled: false,
        edit: false,
    };
    
}


Desabilitar(id){
  console.log(id)
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

          var a = document.getElementsByClassName("cha")
          var admin = false
          if(a.checked){
           return admin = true
            
            }
          
        let data = info.user;
        const list = document.getElementById("table")
        
            
        for(var i = 0; i <= data.length; i++){
            const tr = document.createElement('tr')

            if(data[i].ativo == true){
              tr.setAttribute('class', 'disable')
              
              

            }
            
            list.appendChild(tr);
            
            const nome = document.createElement('td')
            
            nome.innerHTML = data[i].nome;
            tr.appendChild(nome)
            

            const check = document.createElement('span');

            check.setAttribute('class', 'tag')
            check.innerHTML = data[i].id_tipo
            tr.appendChild(check)

            const whatsapp = document.createElement('td')
            whatsapp.innerHTML = data[i].whatsapp;
            tr.appendChild(whatsapp)

            const cpf = document.createElement('td')
            cpf.innerHTML =  data[i].cpf_cnpj;
            tr.appendChild(cpf)
            
           
            const email = document.createElement('td')
            email.innerHTML = data[i].email;
            tr.appendChild(email) 
            
            
            
            const edit = document.createElement('i');
            edit.setAttribute('class', 'ion-edit');
            edit.setAttribute('type','button')
            edit.setAttribute('id', data[i].id);
            edit.addEventListener('click', () => this.setState({ edit: true }))
            
            tr.appendChild(edit)


            const remove = document.createElement('i');
            remove.setAttribute("class", "ion-android-delete")
            remove.setAttribute('type','button')
            remove.setAttribute("id", data[i].id_usuario);
            
            remove.addEventListener("click", () => this.Desabilitar(remove.id))
            
            tr.appendChild(remove)
            
            
            
            
        }
      
            
        })
        .catch(err => {
            console.log(err)
        })
}
deletar(){

}
envia(event){
  

  const nome = document.getElementById('nome').value
  const cpf = document.getElementById('cpf').value
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const whatsapp = document.getElementById('whatsapp').value
  const usuario = document.getElementById('usuario').value


console.log(event)
    const requestInfo = {
      
      method: 'POST',
      mode:'cors',
      body: JSON.stringify({
        id_tipo: event,
        cpf_cnpj: cpf,
        nome: nome,
        usuario: usuario,
        senha: password,
        email: email,
        whatsapp: whatsapp,
       }),
       headers: new Headers({
        'Content-type':'application/json'
      })
    }
  
    fetch('http://localhost:5000/addAdmin', requestInfo)
    
    .then(response => {
      if(response.ok){
        response.text()
        
        return notification('success', 'Usuário Cadastrado!')
       
      }
    }).catch(err =>{
      return console.log(err)
    })
    
  }


  canSubmit(tipo){

  
  const nome = document.getElementById('nome').value
  const cpf = document.getElementById('cpf').value
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const whatsapp = document.getElementById('whatsapp').value

    const validar = new ValidaCPF();
    const envia = new UserList()
    if(cpf === '' || nome === ''|| password === ''|| email === '' || whatsapp === ''){
      return notification('warning', 'Todos os campos devem estar preenchidos!')
    }
    else if(validar.ValidarCPF(cpf) === true){

        envia.envia(tipo)
      window.location.reload()

    }else{
      return notification('error','CPF Inválido')

    }
  }
  
    render(){

      const Option = SelectOption;
    
        return ( 
            <SignUpStyleWrapper>
<div>
<table id="table">
  <tr>
    <th >Nome</th>
    <th>Tag</th>
    <th >whatsapp</th>
    <th >CPF</th>
    <th >Email</th>
    <th></th>
   
    
  </tr>
  
  
</table>
      
      </div>
     <div id='oi'></div>

      <Container> 

          <Modal isOpen={this.state.edit} scrollable={true}>
           <ModalHeader > Editar Usuário </ModalHeader>
           <ModalBody > 
           <WrappedFormWIthSubmissionButton/>
           <Form >
           <InputGroup compact style={{ marginBottom: '15px' }}>   
                  <Select defaultValue="Tipo de Usuário" id='iu'onChange={this.canSubmit}>
                    <Option value="Root">Root</Option>             
                    <Option  value="Admin">Admin</Option>
                  </Select>
                   

              </InputGroup>    
                
           </Form>
           </ModalBody>
           <ModalFooter > 
               <Button type='primary' onClick={this.canSubmit}> Adicionar </Button>
               
               <Button onClick={() => this.setState({ edit: false })}> Cancelar </Button>
           </ModalFooter>
       </Modal>




       <Modal isOpen={this.state.open} scrollable={true}>
           <ModalHeader > Adicionar Usuário </ModalHeader>
           <ModalBody > 
           <WrappedFormWIthSubmissionButton/>
           <Form >
           <InputGroup compact style={{ marginBottom: '15px' }}>   
                  <Select defaultValue="Tipo de Usuário" id='iu'onChange={this.canSubmit}>
                    <Option value="1">Root</Option>             
                    <Option  value="2">Admin</Option>
                  </Select>
                   

              </InputGroup>   
                </Form>
           </ModalBody>
           <ModalFooter > 
               <Button type='primary' onClick={this.canSubmit}> Adicionar </Button>
               
               <Button onClick={() => this.setState({ open: false })}> Cancelar </Button>
           </ModalFooter>
       </Modal>

       </Container>
       <Button  onClick={() => this.setState({ open: true })}>Adicionar Usuário</Button>
      </SignUpStyleWrapper>
      
        
        )
                    
    }
}