import { Router, Request, Response } from "express";
import Resize_Route from "./api/resizer";
const router = Router();


router.use('/', Resize_Route)

export default router;