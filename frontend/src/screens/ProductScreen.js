import { useParams } from "react-router-dom"

export const ProductScreen = () => {
    const { slug } = useParams();
    return (
        <div>
            <h1>{slug}</h1>
        </div>
    )
}
