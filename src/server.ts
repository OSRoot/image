import express, { Application, Request, Response } from 'express';
import config from './config/env'
import Resize_Route from './routers/api/resizer';
import router from './routers/main';
const app: Application = express();
const port: number = +(config.port as string) || 7000;
app.use(express.json())

app.get('/', (_request: Request, response: Response): void => {
    response.status(200).json({
        message: "This is Version 2.0.0 of the image processing application"
    })
});
app.use('/', router)
app.use(express.static("images"))
app.listen(port, (): void => {
    console.log(`Server started at http://localhost:${port}/api/v2`);
})