import { Router } from "express";
import { Resizer } from "../../handlers/resizer";
const Resize_Route = Router();
Resize_Route.get('/images', Resizer)

export default Resize_Route;