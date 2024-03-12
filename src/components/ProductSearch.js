import React, { useEffect, useState } from 'react';

import ProductCard from "./ProductCard";


const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/searchByName`, {
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

  useEffect(() => {
        if(searchQuery !== ""){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [searchQuery]);

  console.log(searchResults);

  return (
    <div className="search-container my-4">
      <h2>Product Search</h2>
      <div className="form-group my-2">
          <div className="d-flex">
            <input
              type="text"
              id="productName"
              placeholder="Product Name"
              className="form-control h-auto m-1"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
            />
          
          { isActive ? 
            <button className="btn-addToCart m-1" onClick={handleSearch}>
            Search
            </button>
            :
            <button className="btn-addToCart m-1" onClick={handleSearch} disabled>
            Search
            </button>
          }
          </div>
      </div>
      <h3>Search Results:</h3>
      <ul>
          { (searchResults.error === "Product not found.")?
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
