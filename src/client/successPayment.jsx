
import React, { useEffect, useState , useRef } from 'react';
import { Link } from "react-router-dom";
import {createOrder} from '../features/orderSlice'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart} from '../features/cartSlice'; 
import {updateArticleQty} from "../features/articleSlice";

const Success = () => {

  const dataFetchedRef = useRef(false);

  const cart = useSelector((state) => state.storecart.cart);

  const dispatch = useDispatch();

  const [nomClient, setNomClient] = useState('');
  const [emailClient, setEmailClient] = useState('');

  const transaction = () => {

    fetch('http://localhost:3001/api/payment/recuperer-details-transaction/'+localStorage.getItem("sessionId"))
    .then(response => response.json())
    .then(data => { console.log(data)
        setNomClient(data.nomClient);
        setEmailClient(data.emailClient);
        localStorage.removeItem("sessionId")
        addOrder(data.nomClient,data.emailClient)
    })
    .catch(error => console.error('Erreur lors de la récupération des détails de la transaction:', error));
    
  }

   useEffect(() => {  
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    transaction();
  }, []);


      const addOrder = (name,email) => {
    
            const lineOrder= cart.map((lc) => ({
              articleID: lc._id,
              quantity: lc.qty,
              totalPrice: lc.prix*lc.qty
            }));
            const objectOrder ={
              "client": "Client : "+localStorage.getItem('profileName') +"-"+localStorage.getItem('profileEmail')+" Payed by : "+name +"-"+email,
              "status":"Not processed",
              "lineOrder": lineOrder
            }
             
            dispatch(createOrder(objectOrder))
          dispatch(updateArticleQty(lineOrder))
            dispatch(clearCart());
            localStorage.removeItem("profile")
          }

  return (
    <div>

      <div>

        <h1>Thank You</h1>
        {nomClient && emailClient &&  <div>
          <h2>Nom : {localStorage.getItem('profileName')}</h2>
           <h2>Email : {localStorage.getItem('profileEmail')}</h2>
           <h3> Payment made by </h3> 
           <h3>Nom : {nomClient}</h3>
           <h3>Email : {emailClient}</h3>
        </div>
       }
        <p>Order Placed Successfully</p>

        <Link to="/articlesclient">
                <span  onClick={() =>dispatch(clearCart())}>Another Shopping</span>
        </Link>

      </div>

    </div>
  )
}

export default Success
