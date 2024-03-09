import React, { useState } from 'react';

import ProductCard from "./ProductCard";


const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/searchByName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for product:', error);
    }
  };

  console.log(searchResults);

  return (
    <div>
      <h2>Product Search</h2>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
      <h3>Search Results:</h3>
      <ul>
          { (searchResults.error == "Product not found.")?
            <p>Product not found</p>
            :
            searchResults.filter(product => product.isActive === true).map(productActive => (
              <ProductCard productProp={productActive} key={productActive._id}/>
            ))
          }
      </ul>
    </div>
  );
};

export default ProductSearch;
