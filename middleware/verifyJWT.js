import jwt from 'jsonwebtoken';
const secret = process.env.SECRET;

function verifyJWT (token) {
    try {
        return jwt.verify(token, secret, (err, data) => {
            if (err)
                return [ false, err ];


            return [ true, data ];
        });
    } catch (error) {
        console.error(error);

        return false;
    }
}

export default verifyJWT;
