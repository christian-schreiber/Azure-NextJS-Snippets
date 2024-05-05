"use client";

import { useState } from 'react';
import styles from "./logicappcard.module.css";
import Image from 'next/image';

const Logicappcard = () => {
    const [result, setResult] = useState(null);

    const handleSend = async () => {
        console.log("Call Logic App");

        try {
            const response = await fetch("/api/logicapp", {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
            console.log("Success:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1>Call Azure Logic App</h1>
            <div className={styles.card}>
                <section className={styles.cardicon}>
                    <Image
                        src="/logicapp.svg"
                        width={100}
                        height={100}
                        alt="Azure Logic App Icon"
                    />
                </section>
                <button className={styles.cardbutton} onClick={handleSend}>Call Logic App</button>              
            </div>
            {result && (
                <div className={styles.cardtext}>
                    <h2>Response</h2>
                    <br />
                    {JSON.stringify(result, null, 2)}                                   
                </div>
            )}
        </div>
    )
}
  
export default Logicappcard;