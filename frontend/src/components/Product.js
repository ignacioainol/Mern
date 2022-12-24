import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Rating } from "./Rating"

export const Product = ({ product }) => {
    const { slug, image, name, price, rating, numReviews } = product
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
                <Button>Add to Card</Button>
            </Card.Body>
        </Card>
    )
}
