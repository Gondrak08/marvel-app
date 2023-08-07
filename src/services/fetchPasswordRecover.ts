export const fetchRecoverPassword = async(email:string) => {
   try{
    const response = await fetch('/recoverPassword',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            email:email
        })
    })

    const data =  await response.json()
    
    if(response.status === 200){
        return {status:response.status, data};
    } 
    if (response.status == 404){
        return {status:response.status, message:data};
    }
   } catch(error){
    console.log("password recovery had some error", error)
   }

}
