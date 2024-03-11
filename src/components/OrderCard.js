import { useState } from "react";
import { Card } from "react-bootstrap";

export default function OrderCard({orderProp}) {

	console.log(orderProp);

    const { _id, productsOrdered, totalPrice, orderedOn } = orderProp;

    return (
            <Card>
                <Card.Body>
                	<Card.Title>OrderID :{ _id }</Card.Title>
                    <Card.Subtitle>Ordered Date: { orderedOn }</Card.Subtitle>
                    <Card.Text>Products Ordered: { productsOrdered }</Card.Text>
                    <Card.Text>Total: PhP { totalPrice }</Card.Text>
                </Card.Body>
            </Card>
        )
}
