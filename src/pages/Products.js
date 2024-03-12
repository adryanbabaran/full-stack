import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from '../UserContext';

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products(){

	const { user } = useContext(UserContext);

	console.log(user)

	const [products, setProducts] = useState([]);

	const fetchData = useCallback(() => {
    
            let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_BASE_URL}/products/all
            ` : `${process.env.REACT_APP_API_BASE_URL}/products/active`

            fetch(fetchUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
    
                console.log(data);
                console.log(typeof data.message);
    
                if(typeof data.message !== "string"){
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }
    
            })
        }, [user.isAdmin]);

	useEffect(() => {

		fetchData()

	}, [fetchData])

	return(

			<> 
				{
					user.isAdmin ? 
						<AdminView productsData={products} fetchData={fetchData}/>

					:

						<UserView productsData={products} />
				}
			</>
		)
}