import React, { Component } from 'react';
import './styles.js';
export default class UserHasCompany extends Component {

    constructor(){
        super()
        this.state = {
            UserList:[],
            CompanyList: []
        };
       
    }
    
    async componentDidMount(){
        
        await fetch('http://localhost:5000/getAdm')
        .then(response => response.json())
            .then( async users => {

                this.setState({ UserList: users })

            })

            await fetch('http://localhost:5000/CompanyList')
            .then(response => response.json())
                .then( async company => {
    
                    this.setState({ CompanyList: company })
    
                })    
    }

    render(){
        return (
            <div className="page">
                <div>
                {this.state.UserList.map(users => (
                    <>
                    <span>{users.id_usuario}</span>    
                    <li>{users.nome}</li>
                    
                    </>
                ))}
                </div>
                <div>
                {this.state.CompanyList.map(company => (
                    <>
                    <li>{company.razao_social}</li> 
                    </>
                ))}
                </div>
            </div>
        )
    }

}