import { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import ProjectCard from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import giffLoading from "../assets/img/loading.gif";

import api from "../services/api";

const Projects = () => {

    const [projects, setProjects] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get(``, {
            params: {
                per_page: 9
            }
        })
            .then((response) => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col size={12}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <h2>Projects</h2>
                                    <p>Some of the projects are already developed and in progress.</p>
                                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                                        <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                                            <Nav.Item>
                                                <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="third">Tab 3</Nav.Link>
                                            </Nav.Item>
                                        </Nav>

                                        {loading &&
                                            <Col size={12}>
                                                <div className="loading">
                                                    <img src={giffLoading} alt="loading" />
                                                </div>
                                            </Col>
                                        }

                                        {!loading &&
                                            <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                                                <Tab.Pane eventKey="first">
                                                    <Row>
                                                        {
                                                            projects.map((project, index) => {
                                                                return (
                                                                    <ProjectCard
                                                                        key={index}
                                                                        {...project}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </Row>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <p>Project in progress.</p>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="third">
                                                    <p>Project in progress.</p>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        }
                                    </Tab.Container>
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2} alt="Background"></img>
        </section>
    )
}

export default Projects;