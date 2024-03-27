import React from 'react'
import Card from 'react-bootstrap/Card';

const CardsArticlesItems = ({product}) => {
  return (
    <div className="col-sm-3 mt-5">
      
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.imageart} alt={product.designation}/>
      <Card.Body>
        <Card.Title>{product.designation.substr(0,20)} ...</Card.Title>
        <Card.Text>
        {product.marque} <br/>
        {product.prix} TND
        </Card.Text>
        <div className="text-center">
        <button className="btn btn-warning" disabled={product.qtestock <= 0} onClick={() => {}}>
          Add to cart
        </button>
        </div>
      </Card.Body>
     </Card>

    </div> 
  )
}

export default CardsArticlesItems
