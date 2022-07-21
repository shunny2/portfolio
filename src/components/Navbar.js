import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/img/logo.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon5.png';
import navIcon3 from '../assets/img/nav-icon4.png';

const NavBar = () => {

    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    return (
        <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                        <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
                        <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
                    </Nav>
                    <span className="navbar-text">
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/alexander-davis-2669191b9/" rel="noreferrer" target="_blank"><img src={navIcon1} alt="Linkedin" /></a>
                            <a href="mailto:alexander.davis.098@gmail.com?subject=Oportunidade&body=Ol%C3%A1%20Alexander%2C%20tudo%20
                                bem%3F%0D%0AGostaria%20de%20lhe%20oferecer%20uma%20oportunidade%20de%20emprego.%20Podemos%20marcar%20
                                uma%20entrevista%3F" rel="noreferrer" target="_blank"><img src={navIcon2} alt="Mail" />
                            </a>
                            <a href="https://github.com/shunny2" rel="noreferrer" target="_blank"><img src={navIcon3} alt="Github" /></a>
                        </div>
                        <a href='https://bit.ly/alxdv-whatsapp' rel="noreferrer" target="_blank">
                            <button className="vvd" onClick={() => { }}><span>Let’s Connect</span></button>
                        </a>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;