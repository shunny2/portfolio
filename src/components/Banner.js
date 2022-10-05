import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { useTranslation } from "react-i18next";

import headerImg from "../assets/img/header-img.svg";
import TrackVisibility from 'react-on-screen';

import 'animate.css';

const Banner = () => {

    const { t } = useTranslation();

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = [t("banner.stack")];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="aligh-items-center">
                    <Col xs={12} md={8} xl={7}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <span className="tagline">{t("banner.welcome")}</span>
                                    <h1>{t("banner.me")} <span className="txt-rotate" dataperiod="1000" data-rotate={t("banner.stack")}><span className="wrap">{text}</span></span></h1>
                                    <p>{t("banner.bio")} <br/> {t("banner.bioMid")} <br/> {t("banner.bioEnd")}
                                    </p>
                                    <a href='https://bit.ly/alxdv-whatsapp' rel="noreferrer" target="_blank">
                                        <button className="vvd" onClick={() => { }}>{t("banner.button.connect")} <ArrowRightCircle size={25} /></button>
                                    </a>
                                </div>}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={4} xl={5}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                                    <img src={headerImg} alt="Header" />
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner;