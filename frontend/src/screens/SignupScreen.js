import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import { Store } from '../Store'
import { toast } from "react-toastify";
import { getError } from "../utils";

export const SignupScreen = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signup', {
                name,
                email,
                password,
                confirmPassword
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
                Sign Up
            </Helmet>
            <h1 className="my-3">
                Sign Up
            </h1>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" required onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <div className="mb-3 mt-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    Already have an accout ?{' '}
                    <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                </div>
            </Form>
        </Container >
    )
}