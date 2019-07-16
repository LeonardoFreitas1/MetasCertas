import React, { Component } from 'react';
import SignUpStyleWrapper from './Users.style';

export default class Office extends Component {

    componentDidMount(){
        fetch('http://localhost:5000/users')
        .then(response => response.json())
        .then( async info => {

          var a = document.getElementsByClassName("cha")
          var admin = false
          if(a.checked){
           return admin = true
            
            }
          
        let data = info.user;
        const list = document.getElementById("table")
        
            
        for(var i = 0; i <= data.length; i++){
            const tr = document.createElement('tr')

            if(data[i].ativo == true){
              tr.setAttribute('class', 'disable')


               }
            
            list.appendChild(tr);
            
            const nome = document.createElement('td')
            
            nome.innerHTML = data[i].nome;
            tr.appendChild(nome)
         
        
        
        }
        
        
        })
        .catch(err => {
            console.log(err)
        })

        fetch('http://localhost:5000/usuarios_tipos')
        .then(resp => resp.json())
        .then(info => {

               
        let data = info.user;
        const list = document.getElementById("table")
        

        for(var i = 0; i < data.length; i++){
            const tr = document.createElement('tr')
            
            list.appendChild(tr);

            const cargo = document.createElement('td')
            
            cargo.innerHTML = data[i].tipo;
            tr.appendChild(cargo)

        
        
        }
        

        })
    }
    
    render(){
        return (
            <SignUpStyleWrapper>

            <table id="table">
              <tr>
                <th >Nome</th>
                <th>Cargo</th>


              </tr>
            </table>
            </SignUpStyleWrapper>
        )
    }
}