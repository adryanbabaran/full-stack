import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({productProp}) {

    const { _id, name, category, price } = productProp;

    return (
            <Card>
                <Card.Body className="product-card">
                    <Card.Title className="card-title">{ name }</Card.Title>
                    <Card.Subtitle>Category:</Card.Subtitle>
                    <Card.Text>{ category }</Card.Text>
                    <Card.Subtitle>Price:</Card.Subtitle>
                    <Card.Text>PhP { price }</Card.Text>
                    {/*<Card.Text>Enrollees: { count }</Card.Text>*/}
                    <Link className="btn btn-primary" to={`/products/${_id}`}>Add to cart</Link>
                </Card.Body>
            </Card>
        )
}
