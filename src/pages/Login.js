import { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import Container from 'react-bootstrap/Container'; 

export default function Login() {

	const { user, setUser } = useContext(UserContext);

	console.log(user);

	// State hooks to store the values of the input fields
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

	function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();
		fetch( `${process.env.REACT_APP_API_BASE_URL}/users/login`,{

		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({

			email: email,
			password: password

		})
	})
	.then(res => res.json())
	.then(data => {

		// console.log(data);

		if (typeof data.access !== "undefined"){

			localStorage.setItem("token", data.access);

			retrieveUserDetails(data.access);

			// alert(`You are now logged in`);
			Swal.fire({
			  title: "Login successful!",
			  text: "Welcome to Haze!",
			  icon: "success"
			});
		
		} else if (data.error === "No Email Found") {

			//alert(`Email not found`);
			Swal.fire({
			  title: "No email found!",
			  text: "Please register first.",
			  icon: "error"
			});

		} else {

			// alert(`Check your login credentials`)
			Swal.fire({
			  title: "Authentication failed.",
			  text: "Check your login credentials",
			  icon: "error"
			});
		}
	})
	// Clear input fields after submission
	setEmail('');
	setPassword('');
	}

	const retrieveUserDetails = (token) => {

		fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
			headers:{
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			setUser({
				id: data.user._id,
				isAdmin: data.user.isAdmin
			});

		})
	}

	useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (	
	    	
	    (user.id !== null) ? 
	    	<Navigate to="/products" />
	    :
	    	<>
			<div className="back-login">
				<Container className="login-cont rounded w-25 p-3 mt-5">
					<Form onSubmit={(e) => authenticate(e)}>
						<h1 className="my-3 text-center">Login</h1>
						<Form.Group controlId="userEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control 
								type="email" 
								placeholder="Enter Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group controlId="password">
							<Form.Label className='py-1'>Password</Form.Label>
							<Form.Control 
								type="password" 
								placeholder="Enter Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>
					
						{ isActive ? 
						
							<Button className=" float-end submitButton my-3" variant="primary" type="submit" id="submitBtn">
								Submit
							</Button>
							: 
							<Button className="submitButton my-3 float-end" variant="danger" type="submit" id="submitBtn" disabled>
								Submit
							</Button>
						}
					</Form>
					<h6 className="question">Dont have an account? <Link className="register" to={"/register"}>Register</Link></h6>
				</Container>
				
			</div>
		    </>  
    )
}