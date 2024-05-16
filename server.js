import createError from 'http-errors';
import express from 'express';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
// import webpush from 'web-push';
import cors from 'cors';

import indexRouter from './routes/index.js';



const app = express();

app.use(cors());

const __dirname = dirname(fileURLToPath(
    import.meta.url,
));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// logging req and res
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook')
        next();
    else
        express.json()(req, res, next);
});

// routes init
app.use('/', indexRouter);
// app.get('/encrypt', (req, res) => {
//     const {
//         text,
//     } = req.body;

//     return res.status(200).json({
//         encryptedText: encrypt(text),
//     });
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((req, res) => {
    // set locals, only providing error in development
    res.locals.message = err;
    res.locals.error = req.app.get('env') === 'development'
        ? 'error'
        : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`server running at ${port}`));
