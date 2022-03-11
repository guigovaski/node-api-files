import { Router } from 'express';
import multer from 'multer';
import uuid from 'uuid';
import * as apiController from '../controllers/apiController';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './tmp');
    },
    filename(req, file, cb) {
        const random = uuid.v1();
        let extensionFile = file.mimetype.split('/')[1];
        cb(null, `${random}.${extensionFile}`);
    }
});

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        const files: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        cb(null, files.includes(file.mimetype));
    },
    limits: {
        fieldSize: 4194304,
        fieldNameSize: 200
    }
});

const router = Router();

router.post('/file', upload.single('avatar'), apiController.sendFile); 

export default router;