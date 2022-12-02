import fs from "fs";

export const getFilesInDirectory = (path) => {
    const fileNames = fs.readdirSync(path);
    const fileList = [];

    fileNames.forEach(file =>
        fileList.push({
            fileName: file,
            isDirectory: pathIsDirectory(`${path}/${file}`)
        }));

    return fileList;
};

export const removeFile = (path) => {
    if (fileExists(path)) {
        fs.rmSync(path, { recursive: true, force: true });
        console.log(`${path} was deleted`)
        return true;
    }

    return false;
}

export const pathIsDirectory = (path) => {
    return (fs.existsSync(path) && fs.lstatSync(path).isDirectory());
}

export const fileExists = (path) =>
    fs.existsSync(path);