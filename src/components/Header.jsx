import React from 'react';
import { Download, FileText } from 'lucide-react';
import './Header.css';

const Header = ({ onDownload }) => {
    return (
        <header className="app-header">
            <div className="logo-section">
                <FileText size={24} color="var(--primary)" />
                <h1 className="app-title">Resume<span className="text-primary">Builder</span></h1>
            </div>
            <div className="actions-section">
                <button className="btn-primary" onClick={onDownload}>
                    <Download size={18} />
                    <span>Export PDF</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
