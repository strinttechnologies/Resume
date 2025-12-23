import React from 'react';
import { useResume } from '../../context/ResumeContext';
import TextArea from '../../components/ui/TextArea';

const Summary = () => {
    const { resumeData, actions } = useResume();

    const handleChange = (e) => {
        actions.updateSummary(e.target.value);
    };

    return (
        <div className="section-content">
            <h3 className="section-title">Professional Summary</h3>
            <TextArea
                placeholder="Briefly describe your professional background and key achievements..."
                value={resumeData.summary}
                onChange={handleChange}
            />
        </div>
    );
};

export default Summary;
