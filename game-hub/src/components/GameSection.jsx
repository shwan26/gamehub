// src/components/GameSection.jsx
import React from 'react';

const GameSection = ({ title, imgSrc }) => {
    return (
        <div className="section">
            <h2>{title}</h2>
            <div className="content">
                <div className="image-tabs">
                    <div className="image-tab">
                        <img src={imgSrc} alt={title} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameSection;
