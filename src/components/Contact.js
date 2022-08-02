import { useState } from "react";
import { Container, Row, Col, Toast } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Contact = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validation)
    });

    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const [show, setShow] = useState(false);

    const sendEmail = async (data) => {
        setButtonText("Sending...");
        
        let response = await fetch("https://alexanderdavis-portfolio-backend.vercel.app/mail/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        }).catch(error => {
            setStatus({ succes: false, message: 'Something went wrong, please try again later.' });
            setShow(true);
        });

        setButtonText("Send");
        reset();

        let result = await response.json();

        if (result.code === 200) {
            setStatus({ succes: true, message: 'Message sent successfully' });
            setShow(true);
        } else {
            setStatus({ succes: false, message: 'Something went wrong, please try again later.' });
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
                                    <h2>Get In Touch</h2>
                                    <form onSubmit={handleSubmit(sendEmail)}>
                                        <Row>
                                            <Col size={12} sm={6} className="px-1">
                                                <input type="text" name="firstName" placeholder="First Name" {...register("firstName")} />
                                                <p>{errors.firstName?.message}</p>
                                            </Col>
                                            <Col size={12} sm={6} className="px-1">
                                                <input type="text" name="lastName" placeholder="Last Name" {...register("lastName")} />
                                                <p>{errors.lastName?.message}</p>
                                            </Col>
                                            <Col size={12} sm={6} className="px-1">
                                                <input type="email" name="email" placeholder="Email Address" {...register("email")} />
                                                <p>{errors.email?.message}</p>
                                            </Col>
                                            <Col size={12} sm={6} className="px-1">
                                                <input type="tel" name="phone" placeholder="Phone No." {...register("phone")} />
                                                <p>{errors.phone?.message}</p>
                                            </Col>
                                            <Col size={12} className="px-1">
                                                <textarea rows="6" name="message" placeholder="Message" {...register("message")}></textarea>
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
        .required('First Name is a required field')
        .min(4, 'First Name must be at least 4 characters')
        .max(20, 'First Name must be at most 20 characters'),
    lastName: yup
        .string()
        .required('Last Name is a required field')
        .min(4, 'Last Name must be at least 4 characters')
        .max(20, 'Last Name must be at most 20 characters'),
    email: yup
        .string()
        .email('Email must be a valid email')
        .required('Email is a required field'),
    phone: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone is a required field'),
    message: yup
        .string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message must be at most 1000 characters')
        .required('Message is a required field'),
});