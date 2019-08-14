import notification from '../../components/notification';
import AddUserHasCompany from './AddUserHasCompany';
const addUserhasCompany = new AddUserHasCompany()

class AddUser {


   async add({ id_tipo, cpf, nome, usuario, password, email, whatsapp, id_empresa }){
       console.log(id_empresa + " e " + id_tipo)
        const requestInfo = {
      
            method: 'POST',
            mode:'cors',
            body: JSON.stringify({
              cpf_cnpj: cpf,
              nome: nome,
              usuario: usuario,
              senha: password,
              email: email,
              whatsapp: whatsapp,
             }),
             headers: new Headers({
              'Content-type':'application/json'
            })
          }
        
         await fetch('http://localhost:5000/addUser', requestInfo)
          .then(response => {
            if(response.ok){
              return response.json()
            }
          })
          .then( async resp => {
              console.log(resp)
           await addUserhasCompany.Add(id_empresa, resp.id_usuario, id_tipo).then(foi => {
               notification('success', resp.message)
               notification('success', foi)
           })
          })
          .catch(err =>{
            return console.log(err)
            
          })
    }
}
export default AddUser