import React from 'react';
import './Input.css'; // Reusing Input styles for consistency

const TextArea = ({ label, error, ...props }) => {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <textarea
                className={`input-field ${error ? 'input-error' : ''}`}
                rows={5}
                {...props}
            />
            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
};

export default TextArea;
