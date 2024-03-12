import {useState, useContext} from 'react';
import {Form, Button} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import Container from 'react-bootstrap/Container'; 

export default function AddAdmin(){

	const navigate = useNavigate();

    const {user} = useContext(UserContext);

	//input states
	const [userId,setUserId] = useState("");

	function setAdmin(e){

		//prevent submit event's default behavior
		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}/set-as-admin`,{

			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			if(data.error){
				

				Swal.fire({

					icon: "error",
					title: data.error

				})

			} else {

				Swal.fire({

					icon:"success",
					title: "User updated successfully."

				})

				navigate("/add");
			}

		})

        setUserId("")
	}

	return (

            (user.isAdmin === true)
            ?
            <>
			<Container className='mx-auto rounded'>
                <h1 className="my-3 text-center">Add Admin</h1>
                <Form onSubmit={e => setAdmin(e)}>
				  
				    <Form.Group>
                        <Form.Label className="my-3">UserID:</Form.Label>
                        <Form.Control type="text" placeholder="Enter UserId" required value={userId} onChange={e => {setUserId(e.target.value)}}/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" className="btn-addToCart my-4 reg-submit">Set as Admin</Button>
                </Form>
			</Container>
		    </>
            :
            <Navigate to="/products" />
		

	)


}