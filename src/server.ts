import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
//import 'express-async-errors';
import routes from './shared/infra/http/routes/index';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3300, () => {
    console.log('Server Started');
});
