import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import ForgotPasswordStyleWrapper from './forgotPassword.style';
import notification from '../../components/notification';
import ValidaCNPJ from '../../helpers/Validacoes/ValidaCNPJ'

export default class NewCompany extends Component{
      
       envia(event) {
       
        notification('success','Empresa criada com sucesso!');
        const cnpj = document.getElementById('cnpj').value
        const razao_social = document.getElementById('razao_social').value

        const requestInfo = {
      
          method: 'POST',
          mode:'cors',
          body: JSON.stringify({ 
            cnpj: cnpj,
            razao_social: razao_social,

           }),
           headers: new Headers({
            'Content-type':'application/json'
          })
        }
    
        fetch('/newCompany', requestInfo)
        .then(response => {
          if(response.ok){
            return response.text();
          }else{
            
          }
        }).then(err => {
        })
    
    }
  async  canSubmit(){
    
      const cnpj = document.getElementById('cnpj').value
      const razao_social = document.getElementById('razao_social').value
      const send = new NewCompany();
      const Validar = new ValidaCNPJ();
      if(cnpj === '' || razao_social === ''){
        return  notification('error','Você tem que preencher todos com campos');
      }else if(Validar.ValidarCNPJ(cnpj) === true){
        return await send.envia()
      }else{
        return notification('error', 'Digite um CNPJ válido')
      }
    }
    render() {
        return(
        <ForgotPasswordStyleWrapper className="isoForgotPassPage">
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.forgetPassTitle" />
              </Link>
            </div>
            <div className="isoLogoWrapper"> 
              <IntlMessages id="Adicionar Empresa" />
              </div>
           


            <div className="isoForgotPassForm">
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Nome Empresa" id='razao_social'/>
                
                
              </div>
              <div className="isoInputWrapper">
              <Input size="large" placeholder="CNPJ" id='cnpj' />
              </div>

              <div className="isoInputWrapper">
                <Button type="primary" onClick={this.canSubmit}> 
                <Link to='\dashboard'>
                 Cadastrar Empresa 
                 </Link>
                </Button>
              </div>        
      
            </div>
          </div>
        </div>
      </ForgotPasswordStyleWrapper>
    );

    }
} 
