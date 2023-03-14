import sharp from "sharp";
import fs from 'fs';
import os from 'os'
import { Request, Response, NextFunction } from "express";
import config from '../config/env'

const home = os.homedir()
const Resize_Image = async (
    filename: string,
    width: number,
    height: number
): Promise<void> => {
    try {
        const Output_File: string = `images/cache/${filename}_${width}_${height}.jpg`
        const Resized_Image = await sharp(`images/${filename}.jpg`).resize(width, height).toFile(Output_File);
    } catch (error) {
        throw new Error(`Unable to Process the Image: ${error}`)
    }
}

export const Resizer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Checking stage
        const isFoundImg = await (fs.existsSync(`images`));
        if (!isFoundImg) {
            await fs.mkdirSync('images')

        }
        const isFoundCache = await (fs.existsSync('images/cache'))
        if (!isFoundCache) {
            await fs.mkdirSync("images/cache")
            console.log(`Images Folder and Cache are created`);
        }
        const { filename, width, height } = req.query;
        if (!filename || filename === '') {

            return res.send(`<h1  style="color:red; padding:250px"> 'filename' Query is Requried put the correct filename Value</h1>`)
        }
        if (!width || width === '') {
            return res.send(`<h1 style="color:red; padding:250px"> 'width' Query is Requried put the correct Width Value</h1>`)
        }
        if (!height || height === '') {
            return res.send(`<h1 style="color:red; padding:250px"> 'height' Query is Requried put the correct Height Value</h1>`)
        }

        // ##########################################################################################################################
        // ##########################################################################################################################
        // ##########################################################################################################################

        // Check the cach stage for not repeating the resizing and just retreive the cached image
        const Cached_Image = `images/cache/${filename}_${width}_${height}.jpg`
        // Does it exist?
        const Found_Cached_Image = await fs.existsSync(Cached_Image);

        if (!Found_Cached_Image) {
            await Resize_Image(filename as string, +(width), +(height));
        }

        const src = `http://localhost:${config.port}/cache/${filename}_${width}_${height}.jpg`
        res.send(`<img src=" ${src}"/>`)

    } catch (error) {
        next(error)
    }
}
