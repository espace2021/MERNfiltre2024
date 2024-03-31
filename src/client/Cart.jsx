import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart, plusCart, minusCart } from '../features/cartSlice'; 
import React,{useEffect,useCallback} from 'react'
import { Link } from "react-router-dom";
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
    <p>Taxes and shipping calculated at checkout</p>
    <button>Check out</button>
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