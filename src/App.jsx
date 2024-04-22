//import CardsArticles from "./components/CardsArticles"
//import MultiStepForm from "./components/FormWithSteps/MultiStepForm"

import Listarticles from "./client/Listarticles"
import Cart from "./client/Cart"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import SuccessPayment from './client/successPayment'

import ListOrders from './admin/orders/ListOrders'

import Login from "./admin/adminLogin/Login"
import Logout from "./admin/adminLogin/Logout"
import Register from "./admin/adminLogin/Register"
import ForgotPassword from './admin/adminLogin/ForgotPassword'
import ResetPassword from './admin/adminLogin/ResetPassword'
import Dashboard from "./admin/adminLogin/dashboard";

function App() {
 

  return (
    <div className="container">
       <ToastContainer/>
       <Router>
       <div>


</div>
{/* <MultiStepForm /> */} 
{/* <CardsArticles /> */} 

       <Routes>
       <Route path="/" element={<Listarticles/>}/>
       <Route path="/articlesclient" element={<Listarticles/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/successPayment" element={<SuccessPayment/>}/>
        <Route path="/admin/orders" element={<ListOrders/>}/>

        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<p>Page Not Found: 404!</p>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        <Route path="/dashboard"  element={<Dashboard/>}/>    

      </Routes>
      </Router>
    
    </div>
  )
}

export default App
