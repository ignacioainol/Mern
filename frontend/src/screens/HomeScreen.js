import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios';

export const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };
        fetchData();
    }, [])
    return (
        <div>
            <h1>Featured</h1>
            <div className="products">
                {
                    products.map(product => (
                        <div key={product.slug} className="product">
                            <Link to={`/product/${product.slug}`}>
                                <img src={product.image} alt={product.name} />
                            </Link>
                            <div className="product-info">
                                <p>{product.name}</p>
                                <p> <strong>{product.price}</strong> </p>
                                <button>Add to Cart</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
