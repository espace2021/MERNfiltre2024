//import CardsArticles from "./components/CardsArticles"
//import MultiStepForm from "./components/FormWithSteps/MultiStepForm"

import Listarticles from "./client/Listarticles"
import Cart from "./client/Cart"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

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
      </Routes>
      </Router>
    
    </div>
  )
}

export default App
