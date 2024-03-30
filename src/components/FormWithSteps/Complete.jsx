import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Complete(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.objectData.avatar} />
      <Card.Body>
        <Card.Title>{props.objectData.name}</Card.Title>
        <Card.Text>
        {props.objectData.email}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Complete;