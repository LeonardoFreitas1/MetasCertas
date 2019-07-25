import React, { Component } from 'react';
import CargosStyle from './Users.style';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import userpic from '../../image/user2.png';
import $ from 'jquery';

export default class Office extends Component {

    constructor(){
        super()
        this.state = {
            id: [],
            nome: [],
            whatsapp: [],
            conta: 0,
            cargo: [],
        };  
        this.createBox = this.createBox.bind(this)
    }
    
    
     
        createBox(nome, id){

            for(var i = 0; i < this.state.whatsapp.length; i++){
            let whatsapp = this.state.whatsapp[i]
            return (
            <Box title={nome} className="cargos" style={{margin: '10px'}}>
                
         <button id={id}  onClick={() =>  this.renderiza(id, nome, whatsapp)} >></button>
                 <div id={`div${id}`}></div>
                 
            </Box>
            )
            }

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



        renderiza(id, nome, whatsapp){
            
            const button = document.getElementById(id);
           
            const div = document.getElementById(`div${id}`);       
            
               
               
            if($(div).text().length === 0){

                this.setState({ conta: 1 })
                $(div).append(() => {
                button.setAttribute('style', 'transform: rotate(90deg)')
                       
                return `
                    <image src=${userpic}/>
                    <br/>
                    <span>Nome: ${nome}</span>
                    <br/>
                    <span>Whatsapp: ${whatsapp}</span>
                    <br/>
                    <span>Cargo: Programador</span>
                    `
                
                })
            }else {

                this.setState({ conta: 0 })
                button.setAttribute('style', 'transform: rotate(0deg)')
                $(div).empty()
            }

    }




  
    render(){
    
        return (
            <CargosStyle>
                <PageHeader>
                    <span>Cargos</span>
                 </PageHeader>
            
            <Box title='Editar Usuarios'>

            <ContentHolder id='principal'>

                 {this.state.nome.map(this.createBox)}
                 
            </ContentHolder>
            
            </Box>
            </CargosStyle>
        )
    }
}