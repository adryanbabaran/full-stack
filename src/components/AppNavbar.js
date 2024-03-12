import { useContext} from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../UserContext";

export default function AppNavbar(){

	const { user } = useContext(UserContext);

	console.log(user);

	return (

			<Navbar className="nav-bar" expand="lg">
			    <Container fluid>
			        <Navbar.Brand className="text-light" as={Link} to="/">Haze</Navbar.Brand>
			        <Navbar.Toggle className="text-light" aria-controls="basic-navbar-nav"/>
			        <Navbar.Collapse id="basic-navbar-nav">
			            <Nav className="ms-auto">
			            <Nav.Link className="text-light" as={NavLink} to="/">Home</Nav.Link>
			            <Nav.Link className="text-light" as={NavLink} to="/products">Products</Nav.Link>
			            {
			            	(user.id !== null) ?
			            	// (user !== null) ?
			            		(user.isAdmin ) ?
				            		<>
				            			<Nav.Link className="text-light" as={Link} to="/addProduct">Add Product</Nav.Link>
				            			<Nav.Link className="text-light" as={Link} to="/logout">Logout</Nav.Link>
				            		</>
			            		:
				            		<>
				            			<Nav.Link className="text-light" as={Link} to="/profile">Profile</Nav.Link>
				            			<Nav.Link className="text-light" as={Link} to="/cart">Cart</Nav.Link>
				            			<Nav.Link className="text-light" as={Link} to="/logout">Logout</Nav.Link>
				            		</>
			            	: 
			            		<>
			            			<Nav.Link className="text-light" as={Link} to="/login">Login</Nav.Link>
			            			<Nav.Link className="text-light" as={Link} to="/register">Register</Nav.Link>
			            		</>
			            }
			            </Nav>
			        </Navbar.Collapse>
			    </Container>
			</Navbar>

		)

}