"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Dropzonecard from './dropzonecard';
import styles from "./dropzone.module.css";
import { GoFile } from "react-icons/go";
import { LiaTimesSolid } from "react-icons/lia";

const Dropzone = () => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [isFileDropped, setIsFileDropped] = useState(false);

    const onDrop = useCallback((files) => {
        console.log(files);
        setAcceptedFiles(files);
        setIsFileDropped(true);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });    

    const handleSend = () => {
        console.log("send file");
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append("file", file);
        });

        const uploadurl =  process.env.NEXTAUTH_URL + "/api/upload";

        fetch(uploadurl, {
            method: 'PUT',
            body: formData,
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("Success:", result);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const resetForm = () => {
        setAcceptedFiles([]);
        setIsFileDropped(false);
    };

    return (
        <>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Dropzonecard text="Drop the files here ..." />
            ) : (
                <Dropzonecard text="Drag 'n' drop some files here, or click to select files" />                
            )}            
        </div>
        {isFileDropped && (
            <>
                <section className={styles.dropzonefilelist}>
                    <ul>
                        {acceptedFiles.map((file) => (
                            <li key={file.path}>
                                <div className={styles.fileicontainer}>
                                    <span className={styles.fileiconleft}><GoFile /></span>
                                    <span className={styles.filename}>{file.path}</span>   
                                    <span className={styles.fileiconright} onClick={resetForm}><LiaTimesSolid /></span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className={styles.dropzonebutton}>        
                    <button className={styles.button} onClick={handleSend}>Upload</button>
                </section>
            </>
        )}
        </>
    );
};

export default Dropzone;