import { useContext, useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function AddToCart(){

    const { user } =  useContext(UserContext);

    // The "useParams" hook allows us to retrieve the courseId passed via the URL
    const { productId } = useParams();

    // Allows us to gain access to methods that will allow us to redirect a user to a different page after enrolling a course
    //an object with methods to redirect the user
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1); // Set default quantity to 1

    const addToCart = () => {

        console.log("atc pdtId", productId);

        fetch(`${process.env.REACT_APP_API_URL}/cart/addToCart`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity // Use the quantity state here
            })
        }).then(res => res.json())
            .then(data => {

                console.log(data);
                console.log(data.message);

                if(data.message === "Product(s) Added Successfully"){

                    Swal.fire({
                      title: "Product(s) Added Successfully",
                      icon: "success"
                    });

                    // The navigate hook will allow us to navigate and redirect the user back to the courses page programmatically instead of using a component.
                    navigate("/products");

                } else {

                    Swal.fire({
                      title: "Something went wrong.",
                      text: "Please try again.",
                      icon: "error"
                    });

                }

            })

    }

    useEffect(() => {

        console.log(productId);

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {

                console.log(data);
                console.log(data.product);

                setName(data.product.name);
                setDescription(data.product.description);
                setPrice(data.product.price);

            })

    }, [productId]);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value)); // Parse input value to integer
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3}}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {price}</Card.Text>
                            <Form.Group>
                                <Form.Label>Quantity:</Form.Label>
                                <Form.Control type="number" value={quantity} onChange={handleQuantityChange} />
                            </Form.Group>
                            {
                                (user.id !== null) ?
                                    <Button className="btn-addToCart"
                                    block="true" onClick={addToCart}>Add to cart</Button>
                                :
                                    <Link className="btn-addToCart btn-block" to="/login">Add to cart</Link>
                            }
                        </Card.Body>        
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}
