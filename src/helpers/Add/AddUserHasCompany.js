class AddUserHasCompany {

    Add(id_empresa, id_usuario, id_tipo){
        
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

        fetch('http://localhost:5000/addUserHasCompany', requestInfo).then(resp => {
            if(resp.ok){
                return resp.json()
            }
        })
        .then(info => {
            localStorage.setItem('id_user_company', info.id_usuario_empresa)
        })
        .catch(err => {
            console.log(err)
        })
    }
}
export default AddUserHasCompany;   