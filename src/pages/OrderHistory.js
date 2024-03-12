import { useCallback, useContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import UserContext from '../UserContext';

export default function Orders(){

	const { user } = useContext(UserContext);

	console.log(user)

	const [orders, setOrders] = useState([]);

	const fetchData = useCallback(() => {
    
            let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_URL}/orders/all-orders
            ` : `${process.env.REACT_APP_API_URL}/orders/my-orders`

            fetch(fetchUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
    
                console.log(data);
                console.log(typeof data.orders);
                console.log(data.orders);
    
                if(data.message === "My Order History" || data.message === "Search complete."){
                    setOrders(data.orders);
                } else {
                    setOrders([]);
                }
    
            })

        }, [user.isAdmin]);

	useEffect(() => {

		fetchData()

	}, [fetchData])

	return(

			<Container className="m-5">

				{
					user.isAdmin ? 
						<>
							<h2 className="mb-3">Orders</h2> 
							{orders.map(order => (
							   	<Card className="m-2" key={ order._id }>
							       	<Card.Body>
							            <Card.Title>OrderID :{ order._id }</Card.Title>
							           	<Card.Text>Order Date: { order.orderedOn }</Card.Text>
							           	<Card.Text>Total: PhP { order.totalPrice }</Card.Text>
							           	<Card.Text>Status: { order.status }</Card.Text>
							      	 </Card.Body>
							   	</Card>
			            	))}
						</>

					:

						<>
							<h2 className="mb-3">My Order History</h2> 
							{orders.map(order => (
							   	<Card className="m-2" key={ order._id }>
							       	<Card.Body>
							            <Card.Title>OrderID :{ order._id }</Card.Title>
							           	<Card.Text>Order Date: { order.orderedOn }</Card.Text>
							           	<Card.Text>Total: PhP { order.totalPrice }</Card.Text>
							           	<Card.Text>Status: { order.status }</Card.Text>
							      	 </Card.Body>
							   	</Card>
			            	))}
						</>
				}
			</Container>
		)
}