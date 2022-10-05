import { useState } from "react";
import { Container, Row, Col, Toast } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import contactImg from "../assets/img/contact-img.svg";
import TrackVisibility from 'react-on-screen';
import * as yup from 'yup';

import 'animate.css';

import i18n from "../i18n";

const { t } = i18n;

const Contact = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validation)
    });

    const [buttonText, setButtonText] = useState(t("contact.button.send"));
    const [status, setStatus] = useState({});

    const [show, setShow] = useState(false);

    const sendEmail = async (data) => {
        setButtonText(t("contact.button.sending"));
        
        let response = await fetch("https://alexanderdavis-portfolio-backend.vercel.app/mail/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        }).catch(error => {
            setStatus({ succes: false, message: t("contact.message.wrong") });
            setShow(true);
        });

        setButtonText(t("contact.button.send"));
        reset();

        let result = await response.json();

        if (result.code === 200) {
            setStatus({ succes: true, message: t("contact.message.success") });
            setShow(true);
        } else {
            setStatus({ succes: false, message: t("contact.message.wrong") });
            setShow(true);
        }
    };

    return (
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col size={12} md={6}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" />
                            }
                        </TrackVisibility>
                    </Col>
                    <Col size={12} md={6}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <h2>{t("contact.title")}</h2>
                                    <form onSubmit={handleSubmit(sendEmail)}>
                                        <Row>
                                            <Col size={12} sm={6} className="px-1">
                                                <input type="text" name="firstName" placeholder={t("contact.form.firstName")} {...register("firstName")} />
                                                <p>{errors.firstName?.message}</p>
                                            </Col>
                                            <Col size={12} sm={6} className="px-1">
                                                <input type="text" name="lastName" placeholder={t("contact.form.lastName")} {...register("lastName")} />
                                                <p>{errors.lastName?.message}</p>
                                            </Col>
                                            <Col size={12} sm={6} className="px-1">
                                                <input type="email" name="email" placeholder={t("contact.form.email")} {...register("email")} />
                                                <p>{errors.email?.message}</p>
                                            </Col>
                                            <Col size={12} sm={6} className="px-1">
                                                <input type="tel" name="phone" placeholder={t("contact.form.phone")} {...register("phone")} />
                                                <p>{errors.phone?.message}</p>
                                            </Col>
                                            <Col size={12} className="px-1">
                                                <textarea rows="6" name="message" placeholder={t("contact.form.message")} {...register("message")}></textarea>
                                                <p>{errors.message?.message}</p>
                                                <button type="submit"><span>{buttonText}</span></button>
                                            </Col>
                                        </Row>
                                        {
                                            status.message &&
                                            <Row>
                                                <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide className="toast">
                                                    <Toast.Body>{status.message}</Toast.Body>
                                                </Toast>
                                            </Row>
                                        }
                                    </form>
                                </div>
                            }
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Contact;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validation = yup.object().shape({
    firstName: yup
        .string()
        .required(t("contact.validation.firstName.required"))
        .min(4, t("contact.validation.firstName.min"))
        .max(20, t("contact.validation.firstName.max")),
    lastName: yup
        .string()
        .required(t("contact.validation.lastName.required"))
        .min(4, t("contact.validation.lastName.min"))
        .max(20, t("contact.validation.lastName.max")),
    email: yup
        .string()
        .email(t("contact.validation.email.email"))
        .required(t("contact.validation.email.required")),
    phone: yup
        .string()
        .matches(phoneRegExp, t("contact.validation.phone.regex"))
        .required(t("contact.validation.email.required")),
    message: yup
        .string()
        .min(10, t("contact.validation.message.min"))
        .max(1000, t("contact.validation.message.max"))
        .required(t("contact.validation.message.required")),
});