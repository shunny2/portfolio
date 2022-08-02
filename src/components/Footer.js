import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.webp";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from '../assets/img/nav-icon5.webp';
import navIcon3 from '../assets/img/nav-icon4.webp';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="align-items-center">
                    <Col size={12} sm={6}>
                        <img src={logo} alt="Logo" />
                    </Col>
                    <Col size={12} sm={6} className="text-center text-sm-end">
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/alexander-davis-2669191b9/" rel="noreferrer" target="_blank"><img src={navIcon1} alt="Linkedin" /></a>
                            <a href="mailto:alexander.davis.098@gmail.com?subject=Oportunidade&body=Ol%C3%A1%20Alexander%2C%20tudo%20
                                bem%3F%0D%0AGostaria%20de%20lhe%20oferecer%20uma%20oportunidade%20de%20emprego.%20Podemos%20marcar%20
                                uma%20entrevista%3F" rel="noreferrer" target="_blank"><img src={navIcon2} alt="Mail" />
                            </a>
                            <a href="https://github.com/shunny2" rel="noreferrer" target="_blank"><img src={navIcon3} alt="Github" /></a>
                        </div>
                        <p>Copyright 2022. All Rights Reserved</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;