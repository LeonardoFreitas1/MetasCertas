import React, { Component } from 'react';

import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import PageHeader from '../../components/utility/pageHeader';
import { Form } from 'antd';
import Button from '../../components/uielements/button';
import { Input } from 'antd';
import notification from '../../components/notification';

import ValidaCPF from '../../helpers/Validacoes/ValidaCPF'
const FormItem = Form.Item;

 class AddUser extends Component {
  constructor(props) {
    super(props);

  this.state = {
    confirmDirty: false,
    autoCompleteResult: [],
    valid: '',
    cor: ''
  };
  this.goCPF = this.goCPF.bind(this)
  }
  goCPF(event){
    const input = document.getElementById('cpf')
    const validar = new ValidaCPF();
    
    if(validar.ValidarCPF(event.target.value) === false){
    this.setState({valid: 'CPF Inválido', cor: 'red'})
    }else{
      this.setState({cor:'green', valid:''})
    }
  }
  

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Uma das duas senhas estão incorretas!');
    } else {
      callback();
    }
  };

  

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  
  render(){
   
   
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    
 

    return (
 
           

      <Form >
        
      <div className="isoInputWrapper isoLeftRightComponent">
      <FormItem
              
              label="Nome Completo"
              labelCol={{ span: 100 }}
              style={{paddingLeft: '7px', width: '100%'}}>

              <Input placeholder="Nome Completo"  id="nome" />

      </FormItem>
      
      <FormItem
              
              label="Usuário"
              labelCol={{ span: 100 }}
              style={{paddingLeft: '7px', width: '100%'}}>

              <Input placeholder="Usuário"  id="usuario" />

      </FormItem>
     

              </div>
              <div>
              <FormItem
              
              label="Email"
              labelCol={{ span: 100}}
              style={{paddingLeft: '10px'}}>
              {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Email inválido!',
              },
              {
                required: true,
                message: 'Porfavor digite seu Email!',
              },
            ],
          })(
              <Input placeholder="Email"
                 id="email" 
                
                />)}
              </FormItem>

             </div>

            <div className="isoInputWrapper isoLeftRightComponent">
            
              <FormItem style={{paddingLeft:'10px'}}>
             <span style={{padding: '5px'}}>CPF:</span>
             
              <Input placeholder="CPF" id="cpf" onChange={this.goCPF} style={{borderColor: this.state.cor}}/>
              <span style={{color: 'red'}}>{this.state.valid}</span>
              </FormItem>
            
              <FormItem
              
              label="Whatsapp"
              labelCol={{ span: 100}}
              style={{paddingLeft: '10px'}}>
              <Input placeholder="Whatsapp" 
              id="whatsapp" 
             
             />

              </FormItem>

              </div> 
              <div>
              <FormItem
              
              label="Senha"
              labelCol={{ span: 100}}
              style={{paddingLeft: '10px'}}>
              {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Por favor digite sua senha',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
              </FormItem>

              <FormItem
              
              label="Confirmar Senha"
              labelCol={{ span: 100}}
              style={{paddingLeft: '10px'}}>
              {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Por favor confirme sua senha',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </FormItem>
              
              </div>
              
              </Form>
              
    
      
    );
  }
}

const WrappedFormWIthSubmissionButton = Form.create()(AddUser )

export default 

(WrappedFormWIthSubmissionButton);
