import React, { Component } from 'react';
import { Input, Button } from 'antd';
import CargosStyle from './Users.style';
import userpic from '../../image/user2.png';


class EditUser extends Component{

    state = {
        edit: [],
        nome: [],
        whatsapp: [],

        animation:''
    };  

   
    render(){
        
        
        return(
            <CargosStyle>
            <img src={userpic}/>
            <span>Nome: {console.log(this.state.nome[1])}</span>
            </CargosStyle>
        )
    }
}export default EditUser;