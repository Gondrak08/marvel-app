import md5 from 'md5';

export const getCharacters = async()=>{

    const baseUrl = 'http://gateway.marvel.com/v1/public/comics?apikey=yourAPIKEY'
    const publicKey = 'def52cd24b619ca4dcb95b7f08b39233';
    const privateKEY ='2d2dff115613c66ecccf637d208d457525ffc2dc';

    console.log(publicKey)

    const time = Date.now().toString();
    const hash = md5(time  + privateKEY + publicKey)
    try{
        const response = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=${time}&apikey=${publicKey}&hash=${hash}`, {
        
    });
    const user = await response.json();

    if(!response.ok){
        throw new Error(user.message);
    }
    if (user) {
        return user
    }

    } catch(error){
        return console.log({error:error})
    }
    return null
};

export default getCharacters;