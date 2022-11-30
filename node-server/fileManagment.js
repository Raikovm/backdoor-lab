import fs from "fs";

export const getFilesInDirectory = async (path) => {
    return await fs.promises.readdir(path, (err, files) => {
        const list = [];
        files.forEach((file) => {
            list.push(file);
        });
    });
};

export const removeFile = (path) => {
    if (fileExists(path)) {
        fs.rmSync(path, { recursive: true, force: true });
        console.log(`${path} was deleted`)
        return true;
    }

    return false;
}

export const makeDirectory = (path, directory) => {
    const dir = `${path}/${directory}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

export const fileExists = (path) =>
    fs.existsSync(path);