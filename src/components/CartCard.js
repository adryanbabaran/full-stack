import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CartCard({item}) {
	    const navigate = useNavigate();
/*
    const { _id, name, category, price } = productProp;*/

                const removeToCart = () => {

                //console.log("cart for checkout pdtId", productId);

                fetch(`${process.env.REACT_APP_API_URL}/cart/${item.productId}/removeFromCart`,{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        //productId: productId,
                        //quantity: quantity // Use the quantity state here
                    })
                }).then(res => res.json())
                    .then(data => {

                        console.log(data);
                        console.log(data.message);

                        if(data.message === "Product removed successfully"){

                            Swal.fire({
                              title: "Product removed successfully",
                              icon: "success"
                            });

                            // The navigate hook will allow us to navigate and redirect the user back to the courses page programmatically instead of using a component.
                            navigate("/products");

                        } else {

                            Swal.fire({
                              title: "Something went wrong.",
                              text: data.message,
                              icon: "error"
                            });

                        }

                    })

            }

    return (
    	<Card className="m-2" key={item.productId}>
            <Card.Body>
                <Card.Title>{item.productId}</Card.Title>
                <Card.Text>Quantity: {item.quantity}</Card.Text>
                <Card.Subtitle>Subtotal: {item.subTotal}</Card.Subtitle>
            </Card.Body>
            <Button className="btn-clear" block="true" onClick={removeToCart}>Remove</Button>
        </Card>
            
    )
}

