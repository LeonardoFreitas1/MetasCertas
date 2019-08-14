class AddUserHasCompany {

   async Add(id_empresa, id_usuario, id_tipo){
        
        const requestInfo = {
      
            method: 'POST',
            body: JSON.stringify({ 
              id_empresa: id_empresa,
              id_usuario: id_usuario,
              id_tipo: id_tipo
             }),
             headers: new Headers({
              'Content-type':'application/json'
            })
          }

      return await fetch('http://localhost:5000/addUserHasCompany', requestInfo).then(resp => {
            if(resp.ok){
                return resp.json()
            }
        })
        .then(info => {
            return "Usuário cadastrado na empresa!"
        })
        .catch(err => {
            console.log(err)
        })
    }
}
export default AddUserHasCompany;   