"use client";

import React from 'react';

const DownloadPage: React.FC = () => {
    React.useEffect(() => {
        const link = document.createElement('a');
        link.href = '/fortnite_2_pre_beta.zip';
        link.download = "fortnite_2_pre_beta";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Download Your File</h1>
            <p>Your download will start shortly. If it doesn't, click the button below.</p>
            <a 
                href="/fortnite_2_pre_beta.zip" 
                download
                style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#007bff', 
                    color: '#fff', 
                    textDecoration: 'none', 
                    borderRadius: '5px' 
                }}
            >
                Download Now
            </a>
        </div>
    );
};

export default DownloadPage;