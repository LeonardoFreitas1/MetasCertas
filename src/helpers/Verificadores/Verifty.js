class Verify {

    VerifyAdm(){
        const token = localStorage.getItem('c_user')
       
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ 
              token: token
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
        localStorage.setItem('t_user', user.t_user)
        }).catch( err => {
            console.log(err)
        })
    }

   async VerifyLogaded(){
        let int = null

     const token = localStorage.getItem('c_user');
     const requestInfo = {

      method: 'POST',
      body: JSON.stringify({ 
        token: token,
       }),
       headers: new Headers({
        'Content-type':'application/json'
      })

    }
   await fetch('http://localhost:5000/checkUser', requestInfo).then( request =>{
      return request.json()
  }).then(foi => {
      int = foi
    }).catch(err => {
        console.log(err)
    })
    
    return int
    }

   async returnType(){
        const type = localStorage.getItem('t_user');
        let int = null
        const requestInfo = {

            method: 'POST',
            body: JSON.stringify({ 
              type: type,
             }),
             headers: new Headers({
              'Content-type':'application/json'
            })
            
          }
         await fetch('http://localhost:5000/verifyId', requestInfo).then( request =>{
            return request.json()
             }).then(foi => {
                 int = foi.tipo.id_tipo;
            }).catch(err => {
             console.log(err)
             })
            
             return int
    }
 
}

export default Verify;