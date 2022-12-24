import axios from "axios";
import { useEffect, useReducer } from "react";
import { Badge, Button, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom"
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { Rating } from "../components/Rating";
import { getError } from "../utils";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export const ProductScreen = () => {
    const { slug } = useParams();

    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: ''
    })

    const { image, name, rating, numReviews, price, description, countInStock } = product;

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });

            try {
                const { data } = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });

            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
            }
            // setProducts(data);
        };
        fetchData();
    }, [slug])
    return (
        loading ? (<LoadingBox />) :
            error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                <div>
                    <Row>
                        <Col md={6}>
                            <img className="img-large" src={image} alt={name} />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Helmet>
                                        <title>{name}</title>
                                    </Helmet>
                                    <h1>{name}</h1>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating rating={rating} numReviews={numReviews}></Rating>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description:
                                    <p>{description}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${price}:</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {countInStock > 0 ?
                                                <Badge bg="success">In Stock</Badge>
                                                : <Badge bg="danger">Unavailable</Badge>
                                            }
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button variant="primary">Add to Cart</Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
    )
}
