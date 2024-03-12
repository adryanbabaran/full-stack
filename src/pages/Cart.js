import { useCallback, useContext, useEffect, useState } from "react";
import { Container} from "react-bootstrap";
import { Link } from "react-router-dom";

import UserContext from '../UserContext';
import CartItem from "../components/CartItem";

export default function Cart(){


    const { user } = useContext(UserContext);

    console.log(user)

    const [cart, setCart] = useState();

    const fetchData = useCallback(() => {
    
            fetch(`${process.env.REACT_APP_API_URL}/cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
    
                console.log(typeof data);
                console.log(data);
                console.log(typeof data[0].cartItems);
                console.log(data[0].cartItems);

                //const data2 = data[0].cartItems.cartItems;
                
                // Sets the "cart" state to map the data retrieved from the fetch request into several "CourseCard" components
                if(typeof data.message !== "string"){
                    setCart(data);
                } else {
                    setCart([]);
                }
    
            })
    }, []);


    useEffect(() => {

        fetchData()

    }, [fetchData])


    


    return(

            <Container>  
                <Link className="btn-orderhist btn-block" to="/myOrderHistory">My order history</Link>
                <CartItem cartProp={cart} />
            </Container>
        )
}