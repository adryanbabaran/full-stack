import {useState,useEffect, useContext} from 'react';
import {Form,Button, Dropdown} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct(){

	const navigate = useNavigate();

    const {user} = useContext(UserContext);

	//input states
	const [category,setCategory] = useState("");
	const [name,setName] = useState("");
	const [description,setDescription] = useState("");
	const [price,setPrice] = useState("");

	function createProduct(e){

		//prevent submit event's default behavior
		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		fetch(`${process.env.REACT_APP_API_URL}/products/`,{

			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
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

			//data is the response of the api/server after it's been process as JS object through our res.json() method.
			console.log(data);

			if(data.error === "Product already exists"){
				

				Swal.fire({

					icon: "error",
					title: "Product already exists.",
					text: data.message

				})

			} else if (data.error === "Failed to save the product") {

				Swal.fire({

					icon: "error",
					title: "Unsuccessful Product Creation",
					text: data.message

				})

			} else {

				Swal.fire({

					icon:"success",
					title: "Product Added"

				})

				navigate("/products");
			}

		})

        setCategory("")
        setName("")
        setDescription("")
        setPrice(0);
	}

	return (

            (user.isAdmin === true)
            ?
            <>
                <h1 className="my-5 text-center">Add Product</h1>
                <Form onSubmit={e => createProduct(e)}>
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

				    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
		    </>
            :
            <Navigate to="/products" />

	)


}