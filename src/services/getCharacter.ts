import md5 from 'md5';
export const getCharacter = async(id:number)=>{
    const baseUrl = 'http://gateway.marvel.com/v1/public/characters'
    const publicKey = 'def52cd24b619ca4dcb95b7f08b39233';
    const privateKEY ='2d2dff115613c66ecccf637d208d457525ffc2dc';

    const time = Date.now().toString();
    const hash = md5(time  + privateKEY + publicKey)
    try{
        const response = await fetch(`${baseUrl}/${id}?ts=${time}&apikey=${publicKey}&hash=${hash}`, {
        
    });
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message);
    }
    if (data) {
        return data
    }

    } catch(error){
        return console.log({error:error})
    }
    return null
};

