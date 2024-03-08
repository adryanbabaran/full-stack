import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs } from "react-bootstrap";
import ProductCard from './ProductCard';
import ProductSearch from "./ProductSearch";
import SearchByPrice from "./SearchByPrice";


export default function UserView({productsData}) {

	const [products, setProducts] = useState([])

	useEffect(() => {
		console.log(productsData);

		const productsArr = productsData.map(product => {
			//only render the active products
			if(product.isActive === true) {
				return (
					<ProductCard productProp={product} key={product._id}/>
					)
			} else {
				return null;
			}
		})

		//set the products state to the result of our map function, to bring our returned product component outside of the scope of our useEffect where our return statement below can see.
		setProducts(productsArr)

	}, [productsData])

	return(
		<>
		<Container>
			<ProductSearch />
			<SearchByPrice />
			<Tabs
		      defaultActiveKey="All"
		      className="mb-3">
		      <Tab eventKey="All" title="All">
		        { products }
		      </Tab>
		      <Tab eventKey="Games" title="Games">
		        Tab content for Profile
		      </Tab>
		      <Tab eventKey="Game Merchandise" title="Game Merchandise">
		        Tab content for Contact
		      </Tab>
		    </Tabs>			
		</Container>
		</>
		)
}