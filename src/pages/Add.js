import React, { useState, useEffect } from 'react';
import { CardGroup, Container, Tab, Tabs } from "react-bootstrap";
import AddProduct from './AddProduct';
import AddAdmin from "./AddAdmin";

export default function Add() {

    return (
        <>
            <Container className="m-5">
                <Tabs
                    defaultActiveKey="AddProduct"
                    className="mb-3"
                >
                    <Tab eventKey="AddProduct" title={<span className="tab-styles">Add Product</span>}>
                        <AddProduct />
                    </Tab>
                    <Tab eventKey="AddAdmin" title={<span className="tab-styles">Add Admin</span>}>
                        <AddAdmin />
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
