import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import CartCard from "./CartCard";

export default function ProductCard({cartProp}) {

    console.log(cartProp);

    const navigate = useNavigate();

    let cardElements = [];

    if (cartProp && cartProp.length > 0 && cartProp[0].cartItems) {
        const cartItems = cartProp[0].cartItems;

        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            cardElements.push(
                <CartCard item={item} key={item._id}/>                
            );
        }
    }

    const clearCart = () => {

        //console.log("cart for checkout pdtId", productId);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clearCart`,{
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

                if(data.message === "Cart successfully cleared"){

                    Swal.fire({
                      title: "Cart successfully cleared",
                      icon: "success"
                    });

                    // The navigate hook will allow us to navigate and redirect the user back to the courses page programmatically instead of using a component.
                    navigate("/");

                } else {

                    Swal.fire({
                      title: "Something went wrong.",
                      text: data.message,
                      icon: "error"
                    });

                }

            })

    }

    const checkout = () => {

        //console.log("cart for checkout pdtId", productId);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`,{
            method: "POST",
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

                if(data.message === "Order checkout successful"){

                    Swal.fire({
                      title: "Order checkout successful",
                      icon: "success"
                    });

                    // The navigate hook will allow us to navigate and redirect the user back to the courses page programmatically instead of using a component.
                    navigate("/cart");

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
        <Container>
            {cardElements.length > 0 ? (
                <>
                    {cardElements}
                    <h3>Total {cartProp[0].totalPrice}</h3>
                    <Button className="btn-clear" block="true" onClick={clearCart}>Clear Cart</Button>
                    <Button className="btn-addToCart" block="true" onClick={checkout}>Checkout</Button>
                </>
            ) : (
                <>
                    <p>Your cart is empty</p>
                    <Link className="btn-addToCart btn-block" to="/products">Add to cart now</Link>
                </>
            )}
        </Container>
    );
}
