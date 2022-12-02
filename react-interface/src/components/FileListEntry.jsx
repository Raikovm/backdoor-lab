const getDownloadBaseLink = (path) =>
    `${import.meta.env.VITE_BACKEND_URL}/download/?path=${encodeURI(path)}`

export const FileListEntry = (props) => {
    const { fileName, path, isDirectory, onFileDelete, onRedirect } = props;

    const pathToFile = `${path}\\${fileName}`;

    const renderFile = () =>
        (
            <p>
                <a href={getDownloadBaseLink(pathToFile)} download>{fileName}  </a>
                <button onClick={() => onFileDelete(pathToFile)}>X</button>
            </p>
        );

    const renderDirectory = () =>
        (
            <p>
                <a onClick={() => onRedirect(pathToFile)}>{fileName}</a>
            </p>
        );

    return(
        isDirectory
            ? renderDirectory()
            : renderFile()
    );

}