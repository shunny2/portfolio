import { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import TrackVisibility from 'react-on-screen';
import ProjectCard from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.webp";
import giffLoading from "../assets/img/loading.gif";

import 'animate.css';

import api from "../services/api";

const Projects = () => {

    const [projects, setProjects] = useState({});
    const [secondPartProjects, setSecondPartProjects] = useState({});
    const [thirdPartProjects, setThirdPartProjects] = useState({});
    const [loading, setLoading] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        setLoading(true);
        api.get(``)
            .then((response) => {
                let threePartIndex = Math.ceil(response.data.length / 3);
                setThirdPartProjects(response.data.splice(-threePartIndex));
                setSecondPartProjects(response.data.splice(-threePartIndex));
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
                                    <h2>{t("projects.title")}</h2>
                                    <p>{t("projects.someProjects")}</p>
                                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                                        <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                                            <Nav.Item>
                                                <Nav.Link eventKey="first">{t("projects.tabs.tab1")}</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second">{t("projects.tabs.tab2")}</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="third">{t("projects.tabs.tab3")}</Nav.Link>
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
                                                    <Row>
                                                        {
                                                            secondPartProjects.map((project, index) => {
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
                                                <Tab.Pane eventKey="third">
                                                    <Row>
                                                        {
                                                            thirdPartProjects.map((project, index) => {
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