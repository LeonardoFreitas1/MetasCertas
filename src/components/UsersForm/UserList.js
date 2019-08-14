import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap'
import { Checkbox, Button, Table, Divider, Tag, Form, Select } from 'antd';
import notification from '../../components/notification';
import UserSyle from './Users.style';
import UserForm from './addUser';
import Conversores from '../../helpers/Conversores/index'
import Verify from '../../helpers/Verificadores/Verifty';
import AddUser from '../../helpers/Add/AddUser';
const { Option } = Select
const FormItem = Form.Item;
let id_tipo = null
let id_empresa = null
export default class UserList extends Component {
    
constructor(){
    super()
    this.state = {
        open: false,
        disabledAD: false,
        disabledRT: false,
        edit: false,
        data:[],
        id: null,
        CompanyList: [],
        TypeList: [],

    };
    this.canSubmit = this.canSubmit.bind(this)
    this.tipo = this.tipo.bind(this)
    this.empresa = this.empresa.bind(this)
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
      }
  }).catch(err => {
    console.log(err)
  })
  }
  
  async componentDidMount(){
    const verify = new Verify()

    await fetch('http://localhost:5000/getAdm')
    .then(response => response.json())
        .then( async info => {

        
        info.map(async dados => {
          
          const {cpf_cnpj, email, id_usuario, nome, usuario, whatsapp} = dados;



          const informacao = {
            key: id_usuario,
            nome: nome,
            usuario: usuario,
            CPF: cpf_cnpj,
            tags: this.typeUsers(id_usuario),
            whatsapp: whatsapp,
            email: email,
            ativo: await this.isActive(id_usuario)

           }
         this.setState({data:[...this.state.data, informacao]
          })

        })
            
        })
        .catch(err => {
            console.log(err)
        })

        await fetch('http://localhost:5000/CompanyList')
        .then(response => response.json())
            .then( async company => {
    
          this.setState({ CompanyList: company })
    
        })    
    
        await fetch('http://localhost:5000/allType')
        .then(response => response.json())
            .then( async types => {
    
          this.setState({ TypeList: types })
    
        })

       
         
  }
  tipo(value){
    console.log(value)
    id_tipo = value
  }
  empresa(value){
    console.log(value)
    id_empresa = value
  }

   async envia(){
      const conversores = new Conversores()
      const nome = document.getElementById('nome').value
      const cpf = conversores.converteCPF(document.getElementById('cpf').value)
      const password = document.getElementById('password').value
      const email = document.getElementById('email').value
      const whatsapp = conversores.converteWhatsapp(document.getElementById('whatsapp').value)
      const usuario = document.getElementById('usuario').value

       console.log("aaaaaaaaaaa"+ id_tipo + "aaaaaaa" + id_empresa)

    const add = new AddUser()
   await add.add({nome, password, email, usuario, whatsapp, cpf, id_tipo, id_empresa})
    
  }


  canSubmit(){

    const nome = document.getElementById('nome').value
    let cpf = document.getElementById('cpf').value
    const password = document.getElementById('password').value
    const email = document.getElementById('email').value
    let whatsapp = document.getElementById('whatsapp').value

    const envia = new UserList()
    if(cpf === '' || nome === ''|| password === ''|| email === '' || whatsapp === ''){
      return notification('warning', 'Todos os campos devem estar preenchidos!')
    }else{
      this.setState({ open: false })
      envia.envia()
    }

  }
  async isActive(id){
    const requestInfo = {
      
      method: 'POST',
      mode:'cors',
      body: JSON.stringify({
          id: id
       }),
       headers: new Headers({
        'Content-type':'application/json'
      })
    }
    return await fetch('http://localhost:5000/isActive', requestInfo)
    .then(info => {return info.json()})
    .then(active => {return active.ativo})
    .catch(err => console.log(err))
  }


   typeUsers(id_usuario){
   return["ROOT"]
  }
  
    render(){
  
        const columns = [
          {
            title: 'Name',
            dataIndex: 'nome',
            key: 'nome',
            render: (text, record) => { 
              if(record.ativo)
              return (<span >{text}</span>)
              else
              return (<span style={{color: 'rgba(0,0,0,0.4)'}} >{text}</span>)
            }
            
          },
          {
            title: 'Usuario',
            dataIndex: 'usuario',
            key: 'usuario',
            render: (text, record) => { 
              if(record.ativo)
              return (<span >{text}</span>)
              else
              return (<span style={{color: 'rgba(0,0,0,0.4)'}} >{text}</span>)
            }
          },
          {
            title: 'CPF',
            dataIndex: 'CPF',
            key: 'CPF',
            render: (text, record) => { 
              if(record.ativo)
              return (<span >{text}</span>)
              else
              return (<span style={{color: 'rgba(0,0,0,0.4)'}} >{text}</span>)
            }
          },
          
         
          {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags, record) => (
              <span>
                {tags.map(tag => {
                 let color = 'cyan'
                  switch(tag){
                    case 'ROOT': color = 'red'; break;
                    case 'ADMIN':  color = 'gold'; break;
                    case 'UNDEFINED':  color = 'geekblue'; break;
                    default: color = '#geekblue';
                  }
                  if(record.ativo)
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                  else return (
                    <Tag color={'rgba(0,0,0,0.1)'} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                    )
                })}
              </span>
            ),
          },
          {
            title: 'Whatsapp',
            dataIndex: 'whatsapp',
            key: 'whatsapp',
            render: (text, record) => { 
              if(record.ativo)
              return (<span >{text}</span>)
              else
              return (<span style={{color: 'rgba(0,0,0,0.4)'}} >{text}</span>)
            }
          },
          
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text, record) => { 
              if(record.ativo)
              return (<span >{text}</span>)
              else
              return (<span style={{color: 'rgba(0,0,0,0.4)'}} >{text}</span>)
            }
          },
          {
            title: 'Ações',
            key: 'action',
            render: (text, record) => (
              <span>
                <span style={{color: '#1E90FF	', cursor: 'pointer'}}  onClick={() => this.setState({edit: true})}>Edit</span>
                <Divider type="vertical" />
                <span style={{color: '#FF6347	', cursor: 'pointer'}} onClick={() => this.Desabilitar(record.key)}>Delete</span>
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
           <UserForm/>
           <Form >
           <div >
              <FormItem style={{paddingLeft:'10px'}}>
              <span>Selecione uma Empresa:</span>
                <Select defaultValue="Selecione Uma Empresa" onChange={this.empresa}>
                {
                  this.state.CompanyList.map(company => (
                   <Option value={company.id_empresa}>{company.razao_social}</Option>
                  ))
                }
               
              
              </Select>
            
            </FormItem>
             </div>
              
              <div>
                <FormItem style={{paddingLeft:'10px'}}>
                <span>Selecione o tipo do usuário: </span>
                <Select defaultValue="Selecione um tipo" onChange={this.tipo}>
                  {
                    this.state.TypeList.map(type => (
                      <Option value={type.id_tipo}>{type.tipo}</Option>
                    ))
                  }
                </Select>
                </FormItem>
              </div>
   
            </Form>
           </ModalBody>
           <ModalFooter > 
               <Button type='primary' onClick={this.canSubmit}> Adicionar </Button>
               
               <Button onClick={() => this.setState({ open: false })}> Cancelar </Button>
           </ModalFooter>
       </Modal>

       </Container>

       
      <Container> 

      <Modal isOpen={this.state.edit} scrollable={true}>
          <ModalHeader > Atualizar Usuário </ModalHeader>
          <ModalBody > 
          <UserForm/>
          </ModalBody>
          <ModalFooter > 
              <Button type='primary' onClick={null}> Adicionar </Button>
              
              <Button onClick={() => this.setState({ open: false })}> Cancelar </Button>
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