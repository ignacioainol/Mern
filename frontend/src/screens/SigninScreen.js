import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import { Store } from '../Store'
import { toast } from "react-toastify";
import { getError } from "../utils";

export const SigninScreen = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signin', {
                email,
                password
            });

            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            // console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (error) {
            toast.error(getError(error));
        }
    }

    return (
        <Container className="small-container">
            <Helmet>
                Sign In
            </Helmet>
            <h1 className="my-3">
                Sign In
            </h1>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className="mb-3 mt-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    New Customer{' '}
                    <Link to={`/signup`}>Create your Account</Link>
                </div>
            </Form>
        </Container >
    )
}