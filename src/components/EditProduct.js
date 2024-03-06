import React, { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function EditProduct({ product, fetchData }){

	console.log("Edit product",product);

	// state for productId for the fetch url
	const [productId, setProductId] = useState("");

	// Forms state
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	// Modal state
	const [showEdit, setShowEdit] = useState(false);

	// function for opening the modal
	const openEdit = (productId) => {

		fetch(`${process.env.REACT_APP_API_URL}/products/${ productId }`)
			.then(res => res.json())
			.then(data => {

				console.log(data.product);

				setProductId(data.product._id);
				setCategory(data.product.category);
				setName(data.product.name);
				setDescription(data.product.description);
				setPrice(data.product.price);

			})

			setShowEdit(true);

	}

	const closeEdit = () => {

		setShowEdit(false);
		setProductId("");
		setCategory("");
		setName("");
		setDescription("");
		setPrice(0);

	}

	const editProduct = (e, productId) => {

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${ productId }`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				category: category,
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			if(data.message === "Product updated successfully"){
				Swal.fire({
				  title: "Success!",
				  text: "product successfully updated.",
				  icon: "success"
				});

				closeEdit();
				fetchData();

			} else {
				Swal.fire({
				  title: "Error!",
				  text: "Please try again.",
				  icon: "Error"
				});

				closeEdit();
				fetchData();
			}

		})

	}

	return (

		<>
			
			<Button variant="primary" size="sm" onClick={() => openEdit(product)}> Edit </Button>


			{/*Edit product Modal*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form className="modal-content" onSubmit={e => editProduct(e, productId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit product</Modal.Title>
					</Modal.Header>

					<Modal.Body>

						<Form.Group>
						    <Form.Label>Category:</Form.Label>
						    <Dropdown>
						      <Dropdown.Toggle variant="primary" id="dropdown-basic">
						        {category || "Select Category"}
						      </Dropdown.Toggle>
						      <Dropdown.Menu>
						        <Dropdown.Item onClick={() => setCategory("Game")}>Game</Dropdown.Item>
						        <Dropdown.Item onClick={() => setCategory("Game Merchandise")}>Game Merchandise</Dropdown.Item>
						      </Dropdown.Menu>
						    </Dropdown>
						</Form.Group>

						<Form.Group controlId="productName">
						    <Form.Label>Name:</Form.Label>
						    <Form.Control type="text" required value={name} onChange={e => {setName(e.target.value)}}/>
						</Form.Group>

						<Form.Group controlId="productDescription">
						    <Form.Label>Description:</Form.Label>
						    <Form.Control as="textarea" rows={5} required value={description} onChange={e => {setDescription(e.target.value)}}/>
						</Form.Group>

						<Form.Group  controlId="productPrice">
						    <Form.Label>Price:</Form.Label>
						    <Form.Control type="number" required value={price} onChange={e => {setPrice(e.target.value)}}/>
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>


		</>

	)

}