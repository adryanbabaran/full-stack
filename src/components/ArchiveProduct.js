import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ArchiveProduct({ productId, isActive, fetchData }) {
	console.log("archive", productId);
    const archiveToggle = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/archive/${productId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}})
            .then(res => res.json())
            .then(data => {
                if (data.message === "Product archived successfully") {
                    Swal.fire({
                        title: "Success!",
                        text: "Product successfully archived.",
                        icon: "success"
                    });
                    fetchData();
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to archive product. Please try again.",
                        icon: "error"
                    });
                }
            });
    };

    const activateToggle = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/activate/${productId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}})
            .then(res => res.json())
            .then(data => {
                if (data.message === "Product activated successfully") {
                    Swal.fire({
                        title: "Success!",
                        text: "Product successfully activated.",
                        icon: "success"
                    });
                    fetchData();
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to activate product. Please try again.",
                        icon: "error"
                    });
                }
            });
    };

    return (
        isActive ?
            <Button variant="danger" onClick={archiveToggle}>Archive</Button>
            :
            <Button variant="success" onClick={activateToggle}>Activate</Button>
    );
}
