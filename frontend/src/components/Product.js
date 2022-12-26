import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios";
import { Rating } from "./Rating"
import { useContext } from "react";
import { Store } from "../Store";

export const Product = ({ product }) => {
    const { slug, image, name, price, rating, numReviews } = product;

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;

    const addToCartHandler = async (item) => {
        const existsItem = cartItems.find((x) => x._id === product._id);
        const quantity = existsItem ? existsItem.quantity + 1 : 1;

        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry, Product is out of stock');
            return;
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    }

    return (
        <Card>
            <Link to={`/product/${slug}`}>
                <img src={image} className="card-img-top" alt={name} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={rating} numReviews={numReviews}></Rating>
                <Card.Text>${price}</Card.Text>
                {product.countInStock === 0 ? <Button disabled variant="light">Out of Stock</Button> :
                    <Button onClick={() => addToCartHandler(product)}>Add to Card</Button>
                }
            </Card.Body>
        </Card>
    )
}
