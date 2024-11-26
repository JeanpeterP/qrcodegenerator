import React from 'react';
import styled from 'styled-components';

interface YouTubeProps {
    youtubeData: {
        url: string;
    };
    isPreview?: boolean;
}

export const YouTube: React.FC<YouTubeProps> = ({ youtubeData, isPreview }) => {
    return (
        <div>
            <iframe
                width="100%"
                height="315"
                src={youtubeData.url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}; 