import Espace from "../Espace"
import {  Navigate } from 'react-router-dom'
import React from 'react'
import {  useSelector } from "react-redux";

const ProtectedRoutes2 = () => {

         
    const {user} = useSelector((state) => state.auth);
   
 
    return(
       user!==null &&  user.role==="user" ? <><Espace/></> : <Navigate to="/"/>  
    
    )
        
}
export default ProtectedRoutes2