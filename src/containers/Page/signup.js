import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Checkbox from '../../components/uielements/checkbox';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import Button from '../../components/uielements/button';
import Input from '../../components/uielements/input';
import Form from '../../components/uielements/form';
import Notification from '../../components/notification';
import notification from '../../components/notification';

import ValidaCPF from '../../helpers/Validacoes/ValidaCPF'
const FormItem = Form.Item;




class SignUp extends Component {
 
  state = {
    confirmDirty: false,
    
  };
 
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Notification(
          'success',
          'Received values of form',
          JSON.stringify(values),
          console.log(values),
        );
      }
    });
  };
  

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Uma das senhas estão incorretas');
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  
    envia(event){
    
      
      const cpf_cnpj = document.getElementById('cpf').value
      const nome = document.getElementById('nome').value
      const password = document.getElementById('password').value
      const email = document.getElementById('email').value
      const whatsapp = document.getElementById('whatsapp').value

      const requestInfo = {
    
        method: 'POST',
    
        body: JSON.stringify({ 
          cpf_cnpj: cpf_cnpj,
          nome: nome,
          senha: password,
          email: email,
          whatsapp: whatsapp 
         }),
         headers: new Headers({
          'Content-type':'application/json'
        })
      }
    
      fetch('http://localhost:5000/addUser', requestInfo)
      
      .then(response => {
        if(response.ok){
          return response.text();
        }
      }).catch(err => {
        console.log(err)
      });
    }
    canSubmit(){
      const cpf = document.getElementById('cpf').value
      const nome = document.getElementById('nome').value
      const password = document.getElementById('password').value
      const email = document.getElementById('email').value
      const whatsapp = document.getElementById('whatsapp').value
      const validar = new ValidaCPF();
      const envia = new SignUp()
      if(cpf === '' || nome === ''|| password === ''|| email === '' || whatsapp === ''){
        return notification('warning', 'Todos os campos devem estar preenchidos!')
      }
      else if(validar.ValidarCPF(cpf) === true){

          envia.envia()
           notification('success', 'Usuário Cadastrado!')

      }else{
        return notification('error','CPF Inválido')
       
      }
    }
  

  render(){
   
    //  const { history } = this.props;
    const { getFieldDecorator } = this.props.form;
console.log(this.props.form)
    const formItemLayout = {
      labelCol: {
        xs: { span: 100 },
        sm: { span: 100 },
      },
      wrapperCol: {
        xs: { span: 100 },
        sm: { span: 100 },
      },
    };
   
   
    return (

      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/">
                <IntlMessages id="page.signUpTitle" />
              </Link>
            </div>
            <span>{this.state.msg}</span>
            
            <div className="isoSignUpForm">
            <form id= 'form1' onSubmit={this.envia.bind(this)}>
              <div className="isoInputWrapper isoLeftRightComponent">
                <Input id="nome" size="large" placeholder="Nome Completo"
                 
                
                />
                </div>
              
             
              <div className="isoInputWrapper isoLeftRightComponent">
              <Input size="large" placeholder="cpf_cnpj"
                 id="cpf"
                
                />
             <Input size="large" placeholder="Whatsapp"
                 id="whatsapp"
                
                />
              
              </div>

              
              <FormItem {...formItemLayout} hasFeedback>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(
              <Input size="large" placeholder="Email"
                 id="email" 
                
                />)}
              </FormItem>
             
             
              <FormItem {...formItemLayout}  hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Senha',
              },
              {
                validator: this.checkConfirm,
              },
            ],
          })(<Input size="large"  placeholder="senha"type="password"
                />)}
                  </FormItem>
                  
                 
                  <FormItem {...formItemLayout}  hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Confirar senha!',
              },
              {
                validator: this.checkPassword,
              },
            ],
          })(
                 <Input size="large" placeholder=" confirmar senha" type="password"  />)}
              </FormItem>
              
              
              <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
                <Checkbox>
                  <IntlMessages id="Eu li e concordo com o termo e condições" />
                </Checkbox>
              </div>
              </form>
              <div className="isoInputWrapper">
              
                <Button  onClick={this.canSubmit}>
                
                <Link to="/signin">Registrar</Link>
                
                
                </Button>
               

              </div>
              
              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                <Link to="/signin">
                  <IntlMessages id="Já tenho uma conta" />
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(SignUp)

export default 

(WrappedFormWIthSubmissionButton);
