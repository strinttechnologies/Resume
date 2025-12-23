import React from 'react';
import Template1 from './Template1';
import './Preview.css';

const Preview = () => {
    // In the future, we can switch templates here based on state
    return (
        <div className="preview-container" id="resume-preview">
            {/* Scale wrapper for zooming could go here */}
            <Template1 />
        </div>
    );
};

export default Preview;
