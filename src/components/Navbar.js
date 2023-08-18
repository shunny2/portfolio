import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from "../assets/img/logo.webp";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon5.webp";
import navIcon3 from "../assets/img/nav-icon4.webp";

const NavBar = () => {

    const [activeLink, setActiveLink] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50)
                setScrolled(true);
            else
                setScrolled(false);
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
        setExpanded(false);
    }

    const { t } = useTranslation();

    return (
        <Navbar expand="md" expanded={expanded} className={scrolled ? "scrolled" : ""}>
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}>
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#home" className={activeLink === "home" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink("home")}>{t("navbar.links.home")}</Nav.Link>
                        <Nav.Link href="#skills" className={activeLink === "skills" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink("skills")}>{t("navbar.links.skills")}</Nav.Link>
                        <Nav.Link href="#projects" className={activeLink === "projects" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink("projects")}>{t("navbar.links.projects")}</Nav.Link>
                    </Nav>
                    <span className="navbar-text">
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/alexander-davis-2669191b9/" rel="noreferrer" title={t("navbar.anchors.linkedin")} target="_blank"><img src={navIcon1} alt="Linkedin" /></a>
                            <a href="mailto:alexander.davis.098@gmail.com?subject=Oportunidade&body=Ol%C3%A1%20Alexander%2C%20tudo%20
                                bem%3F%0D%0AGostaria%20de%20lhe%20oferecer%20uma%20oportunidade%20de%20emprego.%20Podemos%20marcar%20
                                uma%20entrevista%3F" rel="noreferrer" title={t("navbar.anchors.gmail")} target="_blank"><img src={navIcon2} alt="Mail" />
                            </a>
                            <a href="https://github.com/shunny2" rel="noreferrer" title={t("navbar.anchors.github")} target="_blank"><img src={navIcon3} alt="Github" /></a>
                        </div>
                        <a href="#connect" rel="noreferrer">
                            <button className="vvd" onClick={() => { }}><span>{t("navbar.button.connect")}</span></button>
                        </a>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;