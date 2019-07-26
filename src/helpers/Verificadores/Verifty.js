class Verify {

    VerifyAdm(){
        const id_usuario = localStorage.getItem('id')
       
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ 
              id_usuario: id_usuario
             }),
             headers: new Headers({
              'Content-type':'application/json'
            })
        }

        fetch('http://localhost:5000/getUser', requestInfo).then(info => {
            if(info.ok){
                return info.json()
            }
        }).then(user => {
        console.log(user)
        }).catch( err => {
            console.log(err)
        })
    }

    VerifyLogaded(){
        var i;
  const id_usuario = window.sessionStorage.getItem('c_user')

  const requestInfo = {
    method: 'POST',
    body: JSON.stringify({ 
      id_usuario: id_usuario
     }),
     headers: new Headers({
      'Content-type':'application/json'
    })
}

fetch('http://localhost:5000/verifyId', requestInfo).then(info => {
    if(info.ok){
        return info.text()
    }
    })
    .then(user => {
      if(user == 'true'){
       i =true 
        
      }else {

        i = false
      }
    })
    .catch( err => {
    console.log(err)
        })
    console.log(i)
        return i
    }
   
}

export default Verify;