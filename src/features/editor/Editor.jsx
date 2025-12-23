import React from 'react'; // Checking if I need React import, generally yes for older setups or just to be safe
import PersonalInfo from './PersonalInfo';
import Summary from './Summary';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import './Editor.css';

const Editor = () => {
    return (
        <div className="editor-container">
            <PersonalInfo />
            <div className="section-separator" />
            <Summary />
            <div className="section-separator" />
            <Experience />
            <div className="section-separator" />
            <Education />
            <div className="section-separator" />
            <Skills />
        </div>
    );
};

export default Editor;
