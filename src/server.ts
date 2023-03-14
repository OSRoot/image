import express, { Application, Request, Response } from 'express';
import config from './config/env'
const app: Application = express();
const port: number = +(config.port as string) || 7000;

app.get('/api/v2', (request: Request, response: Response): void => {
    response.status(200).json({
        massage: "This is Version 2.0.0 of the image processing application"
    })
});

app.listen(port, (): void => {
    console.log(`Server started at http://localhost:${port}/api/v2`);
})