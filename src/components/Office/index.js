import React, { Component } from 'react';
import CargosStyle from './Users.style';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import EditUser from './Edit.user';
import { Input, Button, notification } from 'antd';
import userpic from '../../image/user2.png';
import box from '../../components/utility/box';

export default class Office extends Component {
    constructor(){
        super()
        this.state = {
            edit: [],
            id: [],
            nome: [],
            whatsapp: [],

            animation:''
        };  
        this.createBox = this.createBox.bind(this)
    }
    
        createBox(nome, id){
            
            return (
            <Box title={nome}>

         <button id={id} style={{transform: this.state.animation}} onClick={() => this.form(id)} >></button>

                 {this.state.id.map(() => {   
                    
                      return (
                        <div key={nome}>
                         <img src={userpic}/>
                           <span>Nome: {nome}</span>

                        </div>
                      )
                 })}
            </Box>
            )
        }
        
        
      componentWillMount(){
            fetch('http://localhost:5000/users')
            .then(resp => resp.json())
            .then(info => {
                
                const dados = info.user
                
                for(var i = 0; i <= dados.length; i++){
                    this.setState({nome: [...this.state.nome, dados[i].nome], whatsapp: [...this.state.whatsapp, dados[i].whatsapp], id: [...this.state.id, dados.id_usuario]})
                    
                
                }
            }).catch(err => console.log(err))

        }
    check(id){
       const botao= document.getElementById('id')
        if(id == botao){
            this.form()
        }
    }

    form(id){
        if(this.state.edit.length == 0){
        this.setState({edit: [...this.state.edit, ""], animation: 'rotate(90deg)'})
        }else{
            this.setState({edit: [], animation:''})
        }
    }


  
    render(){
        
        return (
            <CargosStyle>
                <PageHeader>
                    <span>Cargos</span>
                 </PageHeader>
            
            <Box title={<span >Editar Usuarios</span>} >

            <ContentHolder id='principal'>

                 {this.state.nome.map(this.createBox)}
            </ContentHolder>
            
            </Box>
            </CargosStyle>
        )
    }
}