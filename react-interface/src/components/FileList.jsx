import {FileListEntry} from "./FileListEntry";
import {useEffect, useState} from "react";

const fetchFilesInDirectory = async (path) =>
    fetch(`${import.meta.env.VITE_BACKEND_URL}/?` + new URLSearchParams({path: path}))
        .then(res => res.json())

const removeFile = async (path) =>
    fetch(`${import.meta.env.VITE_BACKEND_URL}/?` + new URLSearchParams({path: path}), {
        method: 'DELETE'
    }).then(res => res)

export const FileList = (props) => {
    const { path, onRedirect } = props
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFilesInDirectory(path).then(x => setFiles(x));
    },[path])

    const onFileDelete = async (path) => {
        setFiles(files.filter(x =>
            x.fileName !== path.substring(path.lastIndexOf('\\') + 1)));
        return await removeFile(path);
    };

    return(
        <>
            {
                files !== [] &&
                <div>
                    {files.map(x => <FileListEntry
                        key={x.fileName}
                        fileName={x.fileName}
                        path={path}
                        isDirectory={x.isDirectory}
                        onFileDelete={onFileDelete}
                        onRedirect={onRedirect}
                    />)}
                </div>
            }
        </>

    );
}