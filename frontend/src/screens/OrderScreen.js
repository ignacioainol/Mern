import { useContext, useEffect, useReducer } from "react";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import { Card, Col, Row } from "react-bootstrap";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export const OrderScreen = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate()
    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: ''
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
            }
        }

        if (!userInfo) {
            navigate('/signin')
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
    }, [navigate, order._id, orderId, userInfo])


    return (
        loading ? (<LoadingBox />)
            : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                : (
                    <div>
                        <Helmet>
                            <title>Order {orderId}</title>
                        </Helmet>
                        <h1 className="my-3">Order {orderId}</h1>
                        <Row>
                            <Col md={8}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Shipping</Card.Title>
                                        <Card.Text>
                                            <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                            <strong>Address:</strong> {order.shippingAddress.address},
                                            {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                            {order.shippingAddress.country}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Payment</Card.Title>
                                        <Card.Text>
                                            <strong>Method:</strong> {order.paymentMethod}
                                        </Card.Text>
                                        {order.isPaid ? (
                                            <MessageBox variant="success">
                                                
                                            </MessageBox>
                                        ) }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>)
    )
}

🔂 cardinalidad