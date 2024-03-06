import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({carttProp}) {


    const { cartItems, totalPrice } = cartProp;

    return (
            <Card>
                <Card.Body>
                    <Card.Title>{ cartItems.productId }</Card.Title>
                    <Card.Subtitle>Description:</Card.Subtitle>
                    <Card.Text>{ cartItems.quantity }</Card.Text>
                    <Card.Subtitle>Price:</Card.Subtitle>
                    <Card.Text>PhP { cartItems.subTotal }</Card.Text>
                </Card.Body>
            </Card>
        )
}
