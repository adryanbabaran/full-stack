import { useCallback, useContext, useEffect, useState } from "react";
// import CourseCard from '../components/CourseCard';
// import coursesData from "../data/coursesData";
import UserContext from '../UserContext';

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Courses(){

	/*console.log(coursesData);
	console.log(coursesData[0]);*/

	const { user } = useContext(UserContext);

	console.log(user)

	const [products, setProducts] = useState([]);

	const fetchData = useCallback(() => {
    
            // Allows to have a dynamic url depending whether the user that's logged in is an admin or not
            let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_URL}/products/all
            ` : `${process.env.REACT_APP_API_URL}/products/active`
    
            // headers is included for both /products/all and /products/ to allow flexibility even if it is not needed.
            fetch(fetchUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
    
                console.log(data);
                console.log(typeof data.message);
    
                // Sets the "products" state to map the data retrieved from the fetch request into several "CourseCard" components
                // If the data.message is not a string or equal to undefined it will set the products state with the products from fetch
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

	// useEffect(() => {

		// use the route /all to get all active and not active products (make sure that this route at the backend doesn't have jwt)
		//The fetch will be used to pass the data to Userview and Adminview, where:
			//Userview only active products will be shown
			//Adminview shows all active and non-active products
	// 	fetch(`${process.env.REACT_APP_API_URL}/products/`)
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			 console.log(data);


	// 			 setProducts(data.products)
	// 		});

	// }, []);

	/*const products = productsData.map(course => {

		return (
				<CourseCard key={course.id} courseProp={course}/>
			)
	});*/

	// The "courseProp" in the CourseCard component is called a "prop" which is a shorthand for "property" since components are considered as objects in React JS
	// The curly braces ({}) are used for props to signify that we are providing information using JavaScript expressions rather than hard coded values which use double quotes ("")
	// We can pass information from one component to another using props. This is referred to as "props drilling"
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