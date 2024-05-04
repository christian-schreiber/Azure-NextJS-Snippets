"use client";

import styles from "./qrcodecard.module.css";
import { useState } from 'react';
import { IoQrCodeOutline } from "react-icons/io5";

const API_URL =  process.env.NEXTAUTH_URL + "/api/qrcode";

const QRCodecard = () => {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState(null);

    const handleSend = async (event) => {
        event.preventDefault();
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(inputText),
        });

        const data = await response.json();
        setResult(data);
    };
    
    return (
        <div className={styles.wrapper}>
            <h1>QR Code Generator</h1>
            <div className={styles.qrcodecard}>
                <section className={styles.qrcodeicon}>
                    <IoQrCodeOutline />
                </section>
            <form>
                <input 
                    className={styles.qrcodecardinput} 
                    type="text"
                    value={inputText} 
                    onChange={e => setInputText(e.target.value)}
                    placeholder="Enter your QR text here ..."
                />
                <button className={styles.qrcodecardbutton} onClick={handleSend}>Generate</button>
            </form>             
            </div>
            {result && 
            <>
            <div className={styles.qrcodeimage}>
                <a href="" download="qrcode.png">
                    <img src={result} alt="QR Code" />
                </a>
            </div>
            </>
            }            
        </div>
        
    )
  }
  
  export default QRCodecard