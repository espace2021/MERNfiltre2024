/*import  Menu  from "../Menu"
import { Outlet, Navigate } from 'react-router-dom'
const ProtectedRoutes = () => {
    let token=localStorage.getItem("CC_Token");
    // console.log("token est " + token)
    return(
    token!=null ? <><Menu/><Outlet/></>: <Navigate to="/login"/>
    )
    }
    export default ProtectedRoutes
*/

import  Menu  from "../Menu"
import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'
import {  useSelector } from "react-redux";

const ProtectedRoutes = () => {

         
    const {user} = useSelector((state) => state.auth);
   
 
    return(
       user!==null &&  user.role==="admin" ? <><Menu/><Outlet/></> : <Navigate to="/login"/>  
    
    )
        
}
export default ProtectedRoutes