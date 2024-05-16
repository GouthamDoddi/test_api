import winston from "winston";

import parseIp from "./praseIp.js";

export default function logReq  (req) {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: './logs/reqRes.log',
                json: true,
                format: winston.format.combine(winston.format.timestamp(),
                    winston.format.json()),
            }),
        ],
    });


    console.log(`received req from ${parseIp(req)} with payload ${JSON.stringify(req.body)}`)
}

export const logRes = (res) => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: './logs/reqRes.log',
                json: true,
                format: winston.format.combine(winston.format.timestamp(),
                    winston.format.json()),
            }),
        ],
    });

    console.log(`sent res with payload `)
    console.log(res)
}