import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Ignacio',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Nike Shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            numReviews: 10,
            description: 'high quality shirt',
            rating: 4
        },
        {
            name: 'Adidas Fit Shirt',
            slug: 'adidas-fit-sirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Nike',
            numReviews: 10,
            description: 'high quality shirt',
            rating: 7
        },
        {
            name: 'Nike Slim Part',
            slug: 'nike-slim-part',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            numReviews: 10,
            description: 'high quality shirt',
            rating: 8
        },
        {
            name: 'Nike Pants',
            slug: 'nike-pants-soft',
            category: 'Shirts',
            image: '/images/p4.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            numReviews: 10,
            description: 'high quality shirt',
            rating: 1
        }
    ]
}

export default data;