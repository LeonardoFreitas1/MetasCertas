import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import notification from '../../components/notification';

class SignIn extends Component {
constructor(){
super();

this.state = {
  canSubmit: false
};
this.submit = this.submit.bind(this);
}

submit(event){ 
const cpf_cnpj = document.getElementById('cpf_cnpj').value
const senha = document.getElementById('password').value

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
        
        console.log(resp.text())
       return resp.text()
      
        
    }else{
      console.log('erro!')
      return notification('error', 'Usuário ou senha inválidos!')
    }
        
    }).then( token => {
      return localStorage.setItem("token", token)
      
}).catch(err =>{
  console.log(err)
  localStorage.setItem('canSubmit', false);
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
    
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'undefined') {
  return <Redirect to='/dashboard'></Redirect>;
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
             
            <div className="isoSignInForm">
            <form onSubmit={this.canSubmit}>
            
              <div className="isoInputWrapper">
              
                <Input id="cpf_cnpj" size="large"  placeholder="cpf"  />
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

export const isAutenticade = () => {if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'undefined') {
  return true
  }else{
    return false
  }
}