import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Table } from 'reactstrap'
import { Input, Checkbox, Button, Tag } from 'antd';
import notification from '../../components/notification';
import { Form } from 'antd';
import SignUpStyleWrapper from './Users.style';
import ValidaCPF from '../../helpers/Validacoes/ValidaCPF'
import WrappedFormWIthSubmissionButton from './addUser';
import { InputGroup } from '../../components/uielements/input';
import $ from 'jquery';
import Select, { SelectOption } from '../../components/uielements/select';

const FormItem = Form.Item;



export default class UserList extends Component {
    
constructor(){
    super()
    this.state = {
        open: false,
        disabled: false,
        edit: false,
        Invalido: 'aaaaaaaaaaaaaaaaaaa'
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

          
          
        let data = info.user;
       
        const list = document.getElementById("table")
        
            
        for(var i = 0; i <= data.length; i++){
            const tr = document.createElement('tr')

            if(data[i].ativo == true){
              tr.setAttribute('class', 'disable')
              
              

            }
            
            list.appendChild(tr);
            
            const id = document.createElement('td')
            id.innerHTML = data[i].id_usuario

            tr.appendChild(id)

            const nome = document.createElement('td')
            nome.setAttribute('id', data[i].id_usuario)
            nome.innerHTML = data[i].nome;
            nome.addEventListener('dblclick', () => this.editLine(nome))
            tr.appendChild(nome)
            

            const check = document.createElement('span');

            check.setAttribute('class', 'tag')
            check.innerHTML = data[i].usuarios_tipos
            check.addEventListener('dblclick', () => this.setState({ editTag: true }))
            tr.appendChild(check)

            const whatsapp = document.createElement('td')
            whatsapp.innerHTML = data[i].whatsapp;
            whatsapp.addEventListener('dblclick', () => this.editLine(whatsapp))
            tr.appendChild(whatsapp)

            const cpf = document.createElement('td')
            cpf.innerHTML =  data[i].cpf_cnpj;
            
            cpf.addEventListener('dblclick', () => this.editLine(cpf))
            tr.appendChild(cpf)
            
           
            const email = document.createElement('td')
            email.innerHTML = data[i].email;
            email.addEventListener('dblclick', () => this.editLine(email))
            tr.appendChild(email) 
            
            
            
            const edit = document.createElement('Button');
            edit.setAttribute('class', 'ion-edit');
            edit.setAttribute('id', data[i].id);
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
  
        var conteudoOriginal = $(tag).text();
        const id = tag.id
        $(tag).addClass("celulaEmEdicao");
        $(tag).html("<input type='text' value='" + conteudoOriginal + "' />");
        $(tag).children().first().focus();
 
        $(tag).children().first().keypress(function (e) {
            if (e.which == 13) {
                var novoConteudo = $(tag).val();
                $(tag).parent().text(novoConteudo);
                const conteudo = {
                  method: 'POST',
                  mode:'cors',
                  body: JSON.stringify({
                    id: id,
                    novoConteudo: novoConteudo
                  })
                }
                fetch('http://localhost:5000/atualiza', conteudo).then( foi =>{
                   if(foi.ok){
                  
                        window.location.reload()
       
                  }
                      }).catch(err => {
                     console.log(err)
                   })
  
             
            }
        });

        
}


envia(){
  

  const nome = document.getElementById('nome').value
  const cpf = document.getElementById('cpf').value
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const whatsapp = document.getElementById('whatsapp').value
  const usuario = document.getElementById('usuario').value
  const TGadmin = document.getElementById('TGadmin');
  const TGroot = document.getElementById('TGroot');
  let marcado = null

    if(TGadmin.checked){
      marcado = 'Admin'
    }else{
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


  canSubmit(){

  
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
  }
  
    render(){

      const Option = SelectOption;
    
        return ( 
            <SignUpStyleWrapper>
<div>
<Table striped bordered hover variant="dark">
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
     <div id='oi'></div>

      <Container> 

         




       <Modal isOpen={this.state.open} scrollable={true}>
           <ModalHeader > Adicionar Usuário </ModalHeader>
           <ModalBody > 
           <WrappedFormWIthSubmissionButton/>
           <Form >
 <Checkbox id="TGadmin">Admin</Checkbox>
   <Checkbox id="TGroot">Root</Checkbox>
   <Checkbox id="TGads">ADS</Checkbox>
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
            <Button>Admin</Button>
            <Button>Root</Button>
          

          </ModalBody>
          <ModalFooter > 
               <Button type='primary' onClick={console.log('aaa')}> Adicionar </Button>
               
               <Button onClick={() => this.setState({ editTag: false })}> Cancelar </Button>
           </ModalFooter>
          </Modal>
          </Container>



       <Button  onClick={() => this.setState({ open: true })}>Adicionar Usuário</Button>
      </SignUpStyleWrapper>
      
        
        )
                    
    }
}