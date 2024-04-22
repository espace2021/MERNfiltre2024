import Api from '../axios/Api';
const USER_API="users"

export const signup=async(user)=> { console.log(user)
return await Api.post(USER_API + "/register",user);
} 
export const signin=async(user)=> { 
return await Api.post(USER_API+"/login", user); 
} 
export const forgot=async(email)=> { 
return await Api.post(USER_API+"/forgot-password", {email}); 
    }
export const resetPass=async(id,token,password)=> { 
return await Api.post(USER_API+"/reset_password/"+ id+ '/' + token, {password}); 
     }