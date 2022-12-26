import { Button, Container, Form } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import { Link, useLocation } from "react-router-dom"

export const SigninScreen = () => {
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    return (
        <Container className="small-container">
            <Helmet>
                Sign In
            </Helmet>
            <h1 className="my-3">
                Sign In
            </h1>

            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required />
                </Form.Group>
                <div className="mb-3 mt-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    New Customer{' '}
                    <Link to={`/signin?redirect=${redirect}`}>Create your Account</Link>
                </div>
            </Form>
        </Container>
    )
}