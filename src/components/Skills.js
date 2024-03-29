import graphic from "../assets/img/graphic.svg";
import Carousel from "react-multi-carousel";
import colorSharp from "../assets/img/color-sharp.webp";

import { useTranslation } from "react-i18next";

import "react-multi-carousel/lib/styles.css";

const Skills = () => {
    
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const { t } = useTranslation();

    return (
        <section className="skill" id="skills">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="skill-bx wow zoomIn">
                            <h2>{t("skills.title")}</h2>
                            <p>{t("skills.hardAndSoftSkills")}<br></br> {t("skills.newSkills")}</p>
                            <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                                <div className="item">
                                    <img src={graphic} alt="Graphic skills" />
                                    <h3>{t("skills.skillsPercent.web")}</h3>
                                </div>
                                <div className="item">
                                    <img src={graphic} alt="Graphic skills" />
                                    <h3>{t("skills.skillsPercent.brand")}</h3>
                                </div>
                                <div className="item">
                                    <img src={graphic} alt="Graphic skills" />
                                    <h3>{t("skills.skillsPercent.logo")}</h3>
                                </div>
                                <div className="item">
                                    <img src={graphic} alt="Graphic skills" />
                                    <h3>{t("skills.skillsPercent.backend")}</h3>
                                </div>
                                <div className="item">
                                    <img src={graphic} alt="Graphic skills" />
                                    <h3>{t("skills.skillsPercent.creativity")}</h3>
                                </div>
                                <div className="item">
                                    <img src={graphic} alt="Graphic skills" />
                                    <h3>{t("skills.skillsPercent.proactivity")}</h3>
                                </div>
                                <div className="item">
                                    <img src={graphic} alt="Graphic skills" />
                                    <h3>{t("skills.skillsPercent.empathy")}</h3>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <img className="background-image-left" src={colorSharp} alt="Background" />
        </section>
    )
}

export default Skills;