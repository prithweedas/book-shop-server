import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { router as itemRoutes }  from './routes/items';

export const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));


// all routes are below
app.use('/items', itemRoutes);



// 404 route & Pass error to next
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error Handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message || 'Internal Server Error'
        }
    });
});