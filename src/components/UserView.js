import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs } from "react-bootstrap";
import ProductCard from './ProductCard';
import ProductSearch from "./ProductSearch";
import SearchByPrice from "./SearchByPrice";


export default function UserView({ productsData }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(productsData);

        const filteredProducts = productsData.filter(product => product.isActive === true);

        setProducts(filteredProducts);
    }, [productsData]);

    return (
        <>
            <Container>
                <ProductSearch />
                <Tabs
                    defaultActiveKey="All"
                    className="mb-3"
                >
                    <Tab eventKey="All" title="All">
                        {products.map(product => (
                            <ProductCard productProp={product} key={product._id} />
                        ))}
                    </Tab>
                    <Tab eventKey="Games" title="Games">
                        {products
                            .filter(product => product.category === "Game")
                            .map(game => (
                                <ProductCard productProp={game} key={game._id} />
                            ))}
                    </Tab>
                    <Tab eventKey="Game Merchandise" title="Game Merchandise">
                        {products
                            .filter(product => product.category === "Game Merchandise")
                            .map(merchandise => (
                                <ProductCard productProp={merchandise} key={merchandise._id} />
                            ))}
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
