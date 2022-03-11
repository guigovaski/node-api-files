import { unlink } from 'fs/promises';
import { Request, Response } from 'express';
import sharp from 'sharp';

export const sendFile = async (req: Request, res: Response) => {
    if (req.file) {
        await sharp(req.file.path)
        .resize(500)
        .toFormat('jpeg')
        .toFile(`./public/media/${req.file.filename}`);

        await unlink(req.file.path);
        
        res.json({});
    }
    res.status(400).json({error: 'Invalid File!'});
}