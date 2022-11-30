import {fileExists, getFilesInDirectory, makeDirectory, removeFile} from './fileManagment.js';
import express from 'express';

const app = express();

app.get('/', async (req, res) => {
    const path = req.query.path
    if (!path) {
        return res.sendStatus(400);
    }

    const files = await getFilesInDirectory(path);
    res.send(files);
});

app.delete('/', async (req, res) => {
    const path = req.query.path
    if (!path) {
        return res.sendStatus(400);
    }
    const isDeleted = removeFile(path);

    if (!isDeleted){
        return res.sendStatus(404);
    }
    return res.sendStatus(200);
});

app.get('/download', (req, res) => {
    const path = req.query.path
    if (!path) {
        return res.sendStatus(400);
    }

    if (!fileExists(path)) {
        return res.sendStatus(404);
    }

    res.download(path);
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});

