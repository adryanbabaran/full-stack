import { Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import HazeLogo from '../images/HAZE-logo.png'; // Import the image

export default function Banner() {
    return (
        <Row>
            <Col>
                <Link to="/products">
                    <img src={HazeLogo} alt="HAZE" />
                </Link>
            </Col>
        </Row>
    );
}
