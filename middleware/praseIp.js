const parseIp = req =>
    typeof req.headers['x-forwarded-for'] === 'string' &&
    req.headers['x-forwarded-for'].split(',').shift() ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.connection?.socket?.remoteAddress;


export default parseIp;
