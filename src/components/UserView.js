import React, { useState, useEffect } from 'react';
import { CardGroup, Container, Tab, Tabs } from "react-bootstrap";
import ProductCard from './ProductCard';
import ProductSearch from "./ProductSearch";

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
                    <Tab eventKey="All" title={<span className="tab-styles">All</span>}>
                        <CardGroup>
                            {products.map(product => (
                                <ProductCard productProp={product} key={product._id} />
                            ))}
                        </CardGroup>
                    </Tab>
                    <Tab eventKey="Games" title={<span className="tab-styles">Games</span>}>
                        <CardGroup>
                        {products
                            .filter(product => product.category === "Game")
                            .map(game => (
                                <ProductCard productProp={game} key={game._id} />
                            ))}
                        </CardGroup>
                    </Tab>
                    <Tab eventKey="Game Merchandise" title={<span className="tab-styles">Games Merchandise</span>}>
                        <CardGroup>
                        {products
                            .filter(product => product.category === "Game Merchandise")
                            .map(merchandise => (
                                <ProductCard productProp={merchandise} key={merchandise._id} />
                            ))}
                        </CardGroup>
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
