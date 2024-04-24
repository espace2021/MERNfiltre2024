import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Menuclient = () => {

    const {isLoggedIn,user} = useSelector((state) =>state.auth);

    const {cart} = useSelector((state) => state.storecart);

    const navigate = useNavigate();

  return (
    <>
<Navbar bg="dark" data-bs-theme="dark">
<Container>

<Navbar.Brand href="#home">Ecommerce

<Badge>
<IconButton size="small"
color="secondary"
>
  { isLoggedIn===true ?<> 
  <img 
   src={user.avatar} 
   alt="Avatar"
   style={{ "borderRadius": "50%"}}
   width="30"
   height="30"
   />
   {"   "}
  {user.name} 
  <ExitToAppIcon onClick={()=>{navigate("/logout")}} /> 
  </>
    : <AccountCircleIcon onClick={()=>{navigate("/login")}} />}
</IconButton>
</Badge>

</Navbar.Brand>

<IconButton size="large"
edge="end"
aria-label="account of current user"
aria-haspopup="true"
color="error"
onClick={()=>{navigate("/cart")}}
>
<ShoppingCartIcon sx={{ fontSize: 40 }}/>
<Badge badgeContent={cart && cart.length}
color="success">
</Badge>
</IconButton>
</Container>
      </Navbar>
      </>
  )
}

export default Menuclient
