import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, X } from 'lucide-react';
import './Skills.css';

const Skills = () => {
    const { resumeData, actions } = useResume();
    const { skills } = resumeData;
    const [newSkill, setNewSkill] = useState('');

    const handleAddKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleAdd = () => {
        if (newSkill.trim()) {
            actions.addSectionItem('skills', { id: Date.now(), name: newSkill.trim() });
            setNewSkill('');
        }
    };

    const handleRemove = (id) => {
        actions.removeSectionItem('skills', id);
    };

    return (
        <div className="section-content">
            <h3 className="section-title">Skills</h3>
            <div className="skills-input-container">
                <input
                    type="text"
                    className="skill-input"
                    placeholder="Add a skill (e.g. JavaScript)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleAddKey}
                />
                <button className="btn-add-skill" onClick={handleAdd}>
                    <Plus size={18} />
                </button>
            </div>

            <div className="skills-list">
                {skills.map(skill => {
                    const skillName = typeof skill === 'string' ? skill : skill.name;
                    const skillId = typeof skill === 'string' ? skill : skill.id;
                    return (
                        <div key={skillId} className="skill-tag">
                            <span>{skillName}</span>
                            <button onClick={() => handleRemove(skillId)} className="skill-remove">
                                <X size={14} />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Skills;
