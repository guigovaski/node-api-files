import express, { Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { MulterError } from 'multer';

import routes from './routes/MainRoutes';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use(routes);

server.use((req: Request, res: Response) => {
    res.status(404).json({error: 'Not Found'});
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400);

    if (err instanceof MulterError) {
        res.json({error: err.code});
    }
    console.log(err);
    res.json({error: 'Ocoreeru algum erro'});
}
server.use(errorHandler);

server.listen(process.env.PORT);
