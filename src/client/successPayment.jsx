
import React from 'react'
import { Link } from "react-router-dom";

const Success = () => {

  return (
    <div>

      <div>

        <h1>Thank You</h1>
        <p>Order Placed Successfully</p>

        <Link to="/articlesclient">
                <span>Another Shopping</span>
        </Link>

      </div>

    </div>
  )
}

export default Success
