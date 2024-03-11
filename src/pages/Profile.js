import { useEffect, useState, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from "sweetalert2";

import ResetPassword from "../components/ResetPassword"
import OrderHistory from "./OrderHistory"

export default function Profile() {
    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
    }, []);

    return (
        <div className="my-3">
            <h1 className="my-3">Profile</h1>
            <h4 className="my-3">Name: {`${details.firstName} ${details.lastName}`} </h4>
            <h4 className="my-3">Email: {`${details.email}`} </h4>
            <h4 className="my-3">Mobile Number: {`${details.mobileNo}`} </h4>
            <Button className="btn btn-addToCart my-1" onClick={() => setShowResetPasswordModal(true)}>Reset Password</Button>


            <Modal show={showResetPasswordModal} onHide={() => setShowResetPasswordModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ResetPassword />
                </Modal.Body>
            </Modal>
            <div className="my-4">
                <h2>My Order History</h2>
                <OrderHistory />
            </div>
            
        </div>
    )
}
