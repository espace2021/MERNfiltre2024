import React, { useEffect } from 'react'
import { useDispatch} from "react-redux";
import {getOrders} from "../../features/orderSlice";
import AffOrders from './AffOrders';


const ListOrders = () => {

    const dispatch=useDispatch()
   
    const getData = async () => {
      dispatch(getOrders())
  }
  
  useEffect(() => {
      getData();
  }, [dispatch]);
  
  
  return (
    <div>
     <AffOrders />
    </div>
  )
}
export default ListOrders;
