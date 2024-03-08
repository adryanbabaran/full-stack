import { useContext, useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import Container from 'react-bootstrap/Container'; 
export default function Register(){

    const { user } = useContext(UserContext);

    // State hooks to store the values of the input fields 
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(false);
    // State to manage modal visibility
    const [isRegistering, setIsRegistering] = useState(false);

    function registerUser(e){
        // Prevents page redirection via form submission
        e.preventDefault();

        // Show registering modal
        setIsRegistering(true);

        fetch(`${process.env.REACT_APP_API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName : firstName,
                lastName : lastName,
                email : email,
                mobileNo : mobileNo,
                password : password
            })
        }).then(res => res.json())
        .then(data => {
            // Hide registering modal
            setIsRegistering(false);

            // Handle response
            if(data.message === "Registered Successfully"){
                // Clear form fields
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobileNo("");
                setPassword("");
                setConfirmPassword("");

                Swal.fire({
                    title: "Registration successful!",
                    text: "Welcome to Zuitt!",
                    icon: "success"
                });

            } else if (data.error === "Email invalid"){
                Swal.fire({
                    title: "Email is invalid",
                    icon: "error"
                });
            } else if (data.error === "Mobile number invalid"){
                Swal.fire({
                    title: "Mobile number is invalid",
                    icon: "error"
                });
            } else if (data.error === "Password must be atleast 8 characters"){
                Swal.fire({
                    title: "Password must be atleast 8 characters",
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: "Something went wrong.",
                    text: "Please try again",
                    icon: "error"
                });
            }
        })
        .catch(error => {
            // Hide registering modal
            setIsRegistering(false);
            console.error('Error:', error);
            Swal.fire({
                title: "Error",
                text: "Something went wrong.",
                icon: "error"
            });
        });
    }

    useEffect(() => {
        if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    return (
        <>
            <Modal show={isRegistering} backdrop="static" keyboard={false} centered>
                <Modal.Body>Registering...</Modal.Body>
            </Modal>
            <Container className='register-cont rounded w-25 p-3 my-5'>
                <Form onSubmit={e => registerUser(e)}>
                    <h1 className="my-3 text-center">Register</h1>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            value={ firstName }
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="my-2">Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            value={ lastName } 
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="my-2">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={ email } 
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="my-2">Mobile No.</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter 11 digit number"
                            value={ mobileNo } 
                            onChange={e => setMobileNo(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="my-2">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={ password } 
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="my-2">Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={ confirmPassword } 
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    { isActive ? 
                        <Button className="reg-submit my-3" variant="primary" type="submit" id="submitBtn">Submit</Button>
                        :
                        <Button className='reg-submit my-3' variant="primary" type="submit" id="submitBtn" disabled>Submit</Button>
                    }
                </Form>
                <h6 className="reg-question">Already have an account? <Link to={"/login"}>Login</Link></h6>
            </Container>
        </>
    );
}
