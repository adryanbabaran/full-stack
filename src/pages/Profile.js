import { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from "sweetalert2";

export default function Profile() {

    const { user } = useContext(UserContext);

    const [details, setDetails] = useState({});

    useEffect(()=>{

        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			// Set the user states values with the user details upon successful login.
			if (typeof data.user._id !== "undefined") {

				setDetails(data.user);

			} else if (data.error === "User not found") {

				Swal.fire({
	        	    title: "User not found",
	        	    icon: "error",
	        	    text: "Something went wrong, kindly contact us for assistance."
	        	});

			} else {

				Swal.fire({
	        	    title: "Something went wrong",
	        	    icon: "error",
	        	    text: "Something went wrong, kindly contact us for assistance."
	        	});

			}
        });

    }, [])

    return(
        <div>
            <h1>Profile</h1>
            <h4>Name: {`${details.firstName} ${details.lastName}`} </h4>
            <h4>Email: {`${details.email}`} </h4>
            <h4>Mobile Number: {`${details.mobileNo}`} </h4>
            <Button className='m-1'>Edit Profile</Button>
            <Button>Reset Password</Button>
        </div>
    )
}