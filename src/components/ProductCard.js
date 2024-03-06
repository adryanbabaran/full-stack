import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({productProp}) {

    // console.log(props);
    /* VALUE USING PARAMETER NAME
        productProp: {
            name:
            description:
            price:
        }
    */
    // console.log(typeof props);
    // console.log(productProp);
    /*
        {
            name:
            description:
            price:
        }
    */

    const { _id, name, description, price } = productProp;

    // Use the state hook for this component to be able to store its state
    // States are used to keep track of information related to individual components
    // Syntax
        // const [getter, setter] = useState(initialGetterValue);
/*    const [count, setCount] = useState(0);

    console.log(useState(0));

    const [seats, setSeats] = useState(10);
*/
    // Function that keeps track of the enrollees for a product
    // By default JavaScript is synchronous it executes code from the top of the file all the way to the bottom and will wait for the completion of one expression before it proceeds to the next
    // The setter function for useStates are asynchronous allowing it to execute separately from other codes in the program
    // The "setCount" function is being executed while the "console.log" is already completed resulting in the value to be displayed in the console to be behind by one count
  /*  function enroll(){

        if (seats > 0) {
            setCount(count + 1);
            console.log('Enrollees: ' + count);
            setSeats(seats - 1);
            console.log('Seats: ' + seats)
        } else {
            alert("No more seats available");
        };

    }
*/
    return (
            <Card>
                <Card.Body>
                    <Card.Title>{ name }</Card.Title>
                    <Card.Subtitle>Description:</Card.Subtitle>
                    <Card.Text>{ description }</Card.Text>
                    <Card.Subtitle>Price:</Card.Subtitle>
                    <Card.Text>PhP { price }</Card.Text>
                    {/*<Card.Text>Enrollees: { count }</Card.Text>*/}
                    <Link className="btn btn-primary" to={`/products/${_id}`}>Add to cart</Link>
                </Card.Body>
            </Card>
        )
}
