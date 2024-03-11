import { useCallback, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import UserContext from '../UserContext';

//import OrderCard from '../components/OrderCard';

export default function Orders(){

	const { user } = useContext(UserContext);

	console.log(user)

	const [orders, setOrders] = useState([]);

	const fetchData = useCallback(() => {

            fetch(`${process.env.REACT_APP_API_URL}/orders/my-orders`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
    
                console.log(data);
                console.log(typeof data.orders);
                console.log(data.orders);
    
                if(data.message === "My Order History"){
                    setOrders(data.orders);
                } else {
                    setOrders([]);
                }
    
            })
        }, []);

	useEffect(() => {

		fetchData()

	}, [fetchData])

	console.log(orders);

	return(

			<>
				{orders.map(order => (
				            <Card>
				                <Card.Body>
				                	<Card.Title>OrderID :{ order._id }</Card.Title>
				                    <Card.Text>Order Date: { order.orderedOn }</Card.Text>
				                    <Card.Text>Total: PhP { order.totalPrice }</Card.Text>
				                </Card.Body>
				            </Card>
            	))}
			</>
		)
}