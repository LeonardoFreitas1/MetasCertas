import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import notification from '../../components/notification';
import MaskedInput from 'react-maskedinput'
import ValidaCPF from '../../helpers/Validacoes/ValidaCPF'
import Conversores from '../../helpers/Conversores';
const jwt = require('jsonwebtoken');
const jwtOptions = {};
jwtOptions.secretOrKey = process.env.REACT_APP_SECRETKEY;

class SignIn extends Component {
constructor(){
super();

this.state = {
  message: '',

};
this.goCPF = this.goCPF.bind(this)
this.submit = this.submit.bind(this);
}

goCPF(event){
  const conversores = new Conversores()
  let converte = event.target.value
  converte = converte.toString()
  let atualizado = conversores.converteCPF(converte)

  const validar = new ValidaCPF();
  
  if(validar.ValidarCPF(atualizado) === false){
  this.setState({valid: 'CPF Inválido', message: 'CPF inválido!'})
  }else{
    this.setState({message:'', valid:''})
  }
  if(atualizado.length == 0){
    this.setState({message: ''})
  }
}

submit(){ 
let cpf_cnpj = document.getElementById('cpf_cnpj').value
const senha = document.getElementById('password').value
const conv = new Conversores()
const converteCPF = conv.converteCPF
cpf_cnpj = converteCPF(cpf_cnpj)
const requestInfo = {
      
      method: 'POST',
      body: JSON.stringify({ 
        cpf_cnpj: cpf_cnpj,
        senha: senha,
       }),
       headers: new Headers({
        'Content-type':'application/json'
      })
    }
    
   
        
    fetch('http://localhost:5000/login', requestInfo)
    
    .then(resp => {
      if (resp.ok) {
        
       return resp.text()
    }   
    }).then( token => {
      const payload = { senha: senha }
      const webToken = jwt.sign(payload, jwtOptions.secretOrKey)
      if(token == webToken){
        localStorage.setItem('token', token) 
      }
      window.location.reload();
      
}).catch(err =>{
  return notification('error', 'Usuário ou senha inválidos!')
})

  }

  canSubmit(){
    const cpf_cnpj = document.getElementById('cpf_cnpj').value
    const password = document.getElementById('password').value
  
    const enter = new SignIn()
   if(cpf_cnpj === '' || password === ''){
     return notification('warning', 'Você deve preencher todos os campos!')
   }else{
      return enter.submit()
   }
}

  render() {
    const maskStyle = {
    margin: 0,
    padding: 0,
    fontVariant: 'tabular-nums',
    listStyle: 'none',
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    height: '32px',
    padding: '4px 11px',
    color: 'rgba(0, 0, 0, 0.65)',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    padding: '18px',
    paddingLeft: '7px'
        }

  if(localStorage.getItem('token')){
    return <Redirect to="/dashboard"></Redirect>
  }
    return (
     
      <SignInStyleWrapper className="isoSignInPage">
      
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
              
            </div>
            <spam style={{color: 'red'}}>{this.state.message}</spam>

            <div className="isoSignInForm">
            <form onSubmit={this.canSubmit}>
            
              <div className="isoInputWrapper">
              <MaskedInput style={maskStyle}  placeholder="CPF" id="cpf_cnpj" onChange={this.goCPF} mask="111.111.111-11"/>
              </div>

              <div className="isoInputWrapper">
                <Input id="password" size="large" type="password" placeholder="Password" />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
               
                <Button  onClick={this.canSubmit}>
                
                  <IntlMessages id="page.signInButton" />
                  
                </Button>
                
              </div>
              
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="Esqueceu a senha?" />
                </Link>
                
              </div>
              </form>
            </div>
          </div>
        </div>
        
      </SignInStyleWrapper>
    );
  }
}

export default (SignIn);

export const isAutenticade = () => {
  
  if(localStorage.getItem('token')){
  return true
  }else{
    return false
  }
}

