import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}