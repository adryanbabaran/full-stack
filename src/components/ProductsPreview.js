import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductsPreview(props){

	// props is used here to get the data and breakPoint from the Featuredproducts.js
	const { data, breakPoint } = props;

	// console.log(data);

	const { _id, name, description, price } = data;

	return (

		<Col xs={12} md={breakPoint} >
			<Card className="cardHighlight m-2">
			    <Card.Body className="text-center">
			    	<Card.Title>
			        	<Link to={`/products/${_id}`} >{name}</Link>
			   		</Card.Title>

			    	<Card.Text>
			        	{price}
			    	</Card.Text>
			    </Card.Body>
			    <Card.Footer>
			 		<h5 className="text-center">{price}</h5>
			 		<Link className="btn btn-primary d-block" to={`/products/${_id}`} >Details</Link>
			    </Card.Footer>
			</Card>
		</Col>

		)


}