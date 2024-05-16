import verifyJWT from  './verifyJWT';
import parseIp from './praseIp';


const verifyToken = async (req, res, next) => {

    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: 'logs/JWT.log',
                json: true,
                format: winston.format.combine(winston.format.timestamp(),
                    winston.format.json()),
            }),
        ],
    });

    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.log(`Received ${token} as token. Authorization failed!`);

        return res.sendStatus(401); // if there isn't any token
    }

    const result = await verifyJWT(token);

    if (!result[0]) {
        console.log(`Token: ${token} is invalid. Unauthorized!`);

        return res.json({
            statusCode: 403,
            message: result[1],
            ipAddress: parseIp(req),
        });
    }

    console.log(`Token: ${token} is varified and authorized.`);
    next();

    return true;
};

export default verifyToken;
