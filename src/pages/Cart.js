import { useCallback, useContext, useEffect, useState } from "react";

import UserContext from '../UserContext';

export default function Cart(){


	const { user } = useContext(UserContext);

	console.log(user)

	const [cart, setCart] = useState([]);

	const fetchData = useCallback(() => {
    
            // Allows to have a dynamic url depending whether the user that's logged in is an admin or not
            
            // headers is included for both /cart/all and /cart/ to allow flexibility even if it is not needed.
            fetch(`${process.env.REACT_APP_API_URL}/cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
    
                console.log(data);
                console.log(typeof data.message);
    
                // Sets the "cart" state to map the data retrieved from the fetch request into several "CourseCard" components
                // If the data.message is not a string or equal to undefined it will set the cart state with the cart from fetch
                if(typeof data.message !== "string"){
                    setCart(data.cart);
                } else {
                    setCart([]);
                }
    
            })
        }, [user.isAdmin]);

	useEffect(() => {

		fetchData()

	}, [fetchData])

	return(

			<> 
				{ cart }
			</>
		)
}