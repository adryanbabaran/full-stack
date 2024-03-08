import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import ProductCard from "./ProductCard";

const ProductSearch = () => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchByPriceRange = () => {
        // Fetch API call to search by price range
        fetch(`${process.env.REACT_APP_API_URL}/productss/searchByPrice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ minPrice, maxPrice })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setSearchResults(data);
        })
        .catch(error => {
            console.error('Error searching Products by price range:', error);
        });
    };

    return (
        <div>
            <h2>Search Products</h2>
            <Form>
                <Form.Group controlId="formSearchByPriceRange">
                    <Form.Label>Search by Price Range</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter minimum price"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                    />
                    <Form.Control
                        type="number"
                        placeholder="Enter maximum price"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSearchByPriceRange}>Search</Button>
                </Form.Group>
            </Form>
            <h3>Search Results:</h3>
            <ul>
              {searchResults.map(product => (
                // <li key={Product.id}>{Product.name}</li>
                <ProductCard productProp={product} key={product._id}/>
              ))}
            </ul>
        </div>
    );
};

export default ProductSearch;
