import { Col } from "react-bootstrap";

import projectImg from "../assets/img/project-img.webp";

const ProjectCard = ({ name, description, html_url }) => {
    return (
        <Col size={12} sm={6} md={4}>
            <div className="proj-imgbx">
                <a href={html_url} rel="noreferrer" target="_blank">
                    <img src={projectImg}  alt="Project"/>

                    <div className="proj-txtx">
                        <h3>{name}</h3>
                        <span>{description}</span>
                    </div>
                </a>
            </div>
        </Col>
    )
}

export default ProjectCard;