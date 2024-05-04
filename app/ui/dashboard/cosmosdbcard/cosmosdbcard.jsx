"use client";

import { useState, useEffect } from 'react';
import styles from "./cosmosdbcard.module.css";
import Link from 'next/link';
import Image from 'next/image';

const API_URL = "http://localhost:3000/api/cosmosdb";

const Cosmosdbcard = () => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(API_URL, {
                method: 'GET',
            });

            const data = await response.json();
            setResult(data);
        };

        fetchData();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.boxContainer}>
                {result && result.resources.map((snippet) => (
                    <Link href={`/dashboard/${snippet.id}`}>
                        <div key={snippet.id} className={styles.box}>
                            <span>
                            <h2>{snippet.snippetname}</h2>
                            <br />
                            <p>{snippet.shortdescription}</p>
                            <br />
                            <p>{snippet.tags.join(' | ')}</p>
                            <section className={styles.boximage}>
                                <Image
                                    src={snippet.imagesrc}
                                    width={100}
                                    height={100}
                                    alt="Snippet Icon"
                                />
                            </section>
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
  
export default Cosmosdbcard;