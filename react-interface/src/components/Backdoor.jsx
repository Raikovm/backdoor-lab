import {useEffect, useState} from "react";
import {FileList} from "./FileList.jsx";

const fetchDefaultPath = async () =>
    fetch(`${import.meta.env.VITE_BACKEND_URL}/defaultPath`).then(res => res.json())

export const Backdoor = () => {
    const [currentPath, setCurrentPath] = useState('');
    const [defaultPath, setDefaultPath] = useState('');

    useEffect(() => {
        fetchDefaultPath().then(x => setDefaultPath(x.path))
    }, [])

    const setPath = (path) => 
        setCurrentPath(path)

    const goToUpperDirectory = () => {
        const path = getPath();
        let newPath = path.substring(0, path.lastIndexOf('\\'));
        if (newPath.endsWith(':'))
        {
            newPath = newPath + '\\'
        }

        setCurrentPath(newPath);
    }

    const getPath = () =>
        currentPath === ''
            ? defaultPath
            : currentPath

    return (
        <div>
            {
                (getPath() !== '') &&
                <>
                    <h2>
                        Current path: {getPath()}
                    </h2>
                    <button onClick={goToUpperDirectory}>Go up</button>
                    <FileList path={getPath()} onRedirect={setPath}/>
                    <br/>
                </>
            }
        </div>
    )
}