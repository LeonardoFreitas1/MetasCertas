import React, {Component} from 'react';
import MaskedInput from 'react-maskedinput'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Input, Form, Button, Popover } from 'antd';
import ValidarCNPJ from '../../helpers/Validacoes/ValidaCNPJ'
import Conversores from '../../helpers/Conversores';
import notification from '../../components/notification';
import AddUserHasCompany from '../../helpers/Add/AddUserHasCompany';

export default class addEmpresa extends Component {

    constructor(){
        super();
        this.state={
          addEmpresa: true,
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
    
        return (

            <> 
    
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
           
           </>
          
           
        );
      }
}
