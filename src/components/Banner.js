import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import HazeLogo from '../images/HAZE.png'; // Import the image

export default function Banner() {
    return (
        <Row>
            <Col className="d-flex justify-content-center">
                <Link to="/">
                    <img src={HazeLogo} alt="HAZE" /> {/* Use the imported image */}
                </Link>
            </Col>
        </Row>
    );
}
