import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './Template1.css';

const Template1 = () => {
    const { resumeData } = useResume();
    const { personalInfo, summary, experience, education, skills } = resumeData;

    return (
        <div className="resume-a4">
            <header className="resume-header">
                <h1 className="resume-name">{personalInfo.fullName || 'Your Name'}</h1>
                <div className="resume-contact-info">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.email && <><span>|</span><span>{personalInfo.email}</span></>}
                    {personalInfo.phone && <><span>|</span><span>{personalInfo.phone}</span></>}
                    {personalInfo.linkedin && <><span>|</span><span>{personalInfo.linkedin}</span></>}
                    {personalInfo.website && <><span>|</span><span>{personalInfo.website}</span></>}
                </div>
            </header>

            {summary && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Professional Summary</h2>
                    <p className="resume-text">{summary}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Experience</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="resume-item">
                            <div className="resume-item-header">
                                <h3 className="resume-item-title">{exp.role}</h3>
                                <span className="resume-item-date">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="resume-item-subtitle">{exp.company}</div>
                            <p className="resume-text">{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {education.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Education</h2>
                    {education.map(edu => (
                        <div key={edu.id} className="resume-item">
                            <div className="resume-item-header">
                                <h3 className="resume-item-title">{edu.degree}</h3>
                                <span className="resume-item-date">{edu.graduationDate}</span>
                            </div>
                            <div className="resume-item-subtitle">{edu.school}</div>
                            {edu.score && <p className="resume-text">Grade: {edu.score}</p>}
                        </div>
                    ))}
                </section>
            )}

            {skills.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Skills</h2>
                    {/* Assuming skills is an array of strings for now or simple objects */}
                    <div className="resume-skills-list">
                        {/* If skills are simple strings, just join them. If objects, map them. */}
                        {skills.map(skill => (typeof skill === 'string' ? skill : skill.name)).join(' • ')}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Template1;
