import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart, plusCart, minusCart } from '../features/cartSlice'; 
import React,{useCallback,useState,useEffect} from 'react'
import { Link } from "react-router-dom";

import Api from "../axios/Api";
import { loadStripe } from '@stripe/stripe-js';

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Cart() {
    
  const cart = useSelector((state) => state.storecart.cart);
  const cartTotal = useSelector((state) => state.storecart.cartTotal);
  const dispatch = useDispatch();

  const handleAddToCart = useCallback((product) => {
    dispatch(plusCart(product));
    }, [dispatch])
  const handleDecreaseCart = useCallback((product) => {
    dispatch(minusCart(product));
    }, [dispatch])
  const handleRemoveFromCart = useCallback((product) => {
    
    dispatch(removeFromCart(product));
    }, [dispatch])
  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
    }, [dispatch])
   
  const [status, setStatus] = useState("idle");
  async function handleClickStripe(event,name,email) {
      
      event.preventDefault();
      alert(name)
      alert(email)
      if (cartTotal > 0) {
        setStatus("loading");
        try {
          const stripe = await loadStripe("pk_test_51KtYRUD3HS4vNAwatvmqAEXLKKX11UOcpkHfLnw9UPI9kZ7AJCOeLkqik61wHFXLmRGHUd4aNBvp45v82DpskKl300bMfznwlE");

          if (!stripe) throw new Error('Stripe failed to initialize.');
     
          const checkoutResponse = await Api.post('payment', {cart})
          const {sessionId} = await checkoutResponse.data;
          const stripeError = await stripe.redirectToCheckout({sessionId});

          if (stripeError) {
              console.error(stripeError);
          }
  
         } catch (error) {
          console.error(error);
          setStatus("redirect-error");
        }
      } else {
        setStatus("no-items");
      }
    }

    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
    <div className="cart-container">
         
    <h2>Shopping Cart</h2>
  
    {cart.length === 0 ? (
    <div className="cart-empty">
    <p>Panier Vide</p>
    <div className="start-shopping">
    <Link to="/articlesclient">
    <span>Start Shopping</span>
    </Link>
    </div>
    </div>
    ) : (
    <div>
    <div className="titles">
    <h3 className="product-title">Product</h3>
    <h3 className="price">Price</h3>
    <h3 className="quantity">Quantity</h3>
    <h3 className="total">SubTotal</h3>
    </div>
    <div className="cart-items">
    {cart &&
    cart.map((cartItem) => (
    <div className="cart-item" key={cartItem._id}>
    <div className="cart-product">
    <img src={`${cartItem.imageart}`} alt={cartItem.designation}/>
    <div>
    <h3>{cartItem.designation}</h3>
    <p>{cartItem.reference}</p>
    <button onClick={() => handleRemoveFromCart(cartItem)}>
    Remove
    </button>
    </div>
    </div>
    <div className="cart-product-price"> {cartItem.prix} TND</div>
    <div className="cart-product-quantity">
    <button onClick={() => handleDecreaseCart(cartItem)}>
    -
    </button>
    <div className="count">{cartItem.qty}</div>
    <button onClick={() => handleAddToCart(cartItem)}>+</button>
    
    </div>
    <div className="cart-product-total-price">
    {(cartItem.prix * cartItem.qty)} TND
    </div>
    </div>
    ))}
    </div>
    <div className="cart-summary">
    <button className="clear-btn" onClick={() => handleClearCart()}>
    Clear Cart
    </button>
    <div className="cart-checkout">
    <div className="subtotal">
    <span>Total</span>
    <span className="amount">{cartTotal}
    TND</span>
    </div>
    
    {profile && profile.name ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                    <p>Taxes and shipping calculated at checkout</p>
    <button onClick={(event)=>handleClickStripe(event,profile.name,profile.email)}>{status !== "loading" ? "Check Out" : "Loading..."}</button>
                </div>
            ) : (
                <button onClick={login}>Check Out Sign in Google 🚀</button>
            )}
    <div className="continue-shopping">
    <Link to="/articlesclient">
    <span>Continue Shopping</span>
    </Link>
    </div>
    </div>
    </div>
    </div>
    )}
    </div>
    );
    };
    export default Cart;