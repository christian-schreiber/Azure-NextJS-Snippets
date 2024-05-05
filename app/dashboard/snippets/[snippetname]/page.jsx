"use client";

import Snippetcard from '../../../ui/dashboard/snippetcard/snippetcard';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const Snippets = () => {
    const params = useSearchParams();
    const id = params.get("id");
    const [result, setResult] = useState(null);

    useEffect(() => {
        const callSnippet = async () => {
            try {
                const response = await fetch('/api/cosmosdb', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const snippet = await response.json();
                setResult(snippet);
                console.log("Success:", snippet);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (id) {
            callSnippet();
        }
    }, [id]);

    return (
        <div>        
            <Snippetcard result={result} />
        </div>
    )
}

export default Snippets;