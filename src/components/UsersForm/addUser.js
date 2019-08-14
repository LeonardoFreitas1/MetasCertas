import React, { Component } from 'react';
import UserSyle from './Users.style';
import { Form, Input, Select } from 'antd';
import MaskedInput from 'react-maskedinput'
import ValidaCPF from '../../helpers/Validacoes/ValidaCPF'
import Conversores from '../../helpers/Conversores';
const FormItem = Form.Item;
const { Option } = Select

 class AddUser extends Component {
  constructor(props) {
    super(props);

  this.state = {
    confirmDirty: false,
    autoCompleteResult: [],
    valid: '',
    cor: 'rgba(0, 0, 0, 0.20)',
 
  };
  this.goCPF = this.goCPF.bind(this)
  }


  goCPF(event){
    const conversores = new Conversores()
    let converte = event.target.value
    converte = converte.toString()
    let atualizado = conversores.converteCPF(converte)

    const validar = new ValidaCPF();
    
    if(validar.ValidarCPF(atualizado) === false){
    this.setState({valid: 'CPF Inválido', cor: 'red'})
    }else{
      this.setState({cor:'rgba(0, 0, 0, 0.20)', valid:''})
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

  getValue(value){
    console.log(value)
  }
  render(){
   
    
    const { getFieldDecorator } = this.props.form;

    
  
  const maskStyle = {
      
  margin:  '0',
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  height: '32px',
  color: 'rgba(0, 0, 0, 0.65)',
  fontSize: '14px',
  lineHeight: '1.5',
  backgroundColor: '#fff',
  backgroundImage: 'none',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  borderColor: this.state.cor,
  boxSizing: 'border-box',
  transition: 'all 0.3s',
  
    }

const style = {
  margin:  '0',
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  height: '32px',
  color: 'rgba(0, 0, 0, 0.65)',
  fontSize: '14px',
  lineHeight: '1.5',
  backgroundColor: '#fff',
  backgroundImage: 'none',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  transition: 'all 0.3s',
  paddingLeft: '10px'
}
     
    return (
 
        
<UserSyle>
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
              <MaskedInput style={maskStyle}  placeholder="CPF" id="cpf" onChange={this.goCPF} mask="111.111.111-11"/>
              <span style={{color: 'red'}}>{this.state.valid}</span>

              </FormItem>
            
              <FormItem style={{paddingLeft:'10px'}}>
              <span style={{padding: '5px'}}>Whatsapp:</span>
              <MaskedInput placeholder="Whatsapp" 
              id="whatsapp" mask="(11) 11111-1111"
              style={style}/>
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
              
              </UserSyle>
      
    );
  }
}

const UserForm = Form.create()(AddUser)

export default 

(UserForm);
