import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductsPreview(props){

	// props is used here to get the data and breakPoint from the Featuredproducts.js
	const { data, breakPoint } = props;

	// console.log(data);

	const { _id, name, price } = data;

	return (

		<Col xs={12} md={breakPoint} >
			<Card className="product-card cardHighlight m-2">
			    <Card.Body className="text-center">
			    	<Card.Title>
			        	<Link className="link-styles" to={`/products/${_id}`} >{name}</Link>
			   		</Card.Title>
			   		<h5 className="text-center">{price}</h5>
			 		<Link className="btn-addToCart d-block text-center" to={`/products/${_id}`} >Add to Cart</Link>
			    </Card.Body>
			</Card>
		</Col>

		)


}