import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import Input from '../../components/ui/Input';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import './Experience.css'; // Reuse Experience styles

const EducationItem = ({ item, onChange, onRemove }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(item.id, { [name]: value });
    };

    return (
        <div className="list-item-card">
            <div className="list-item-header" onClick={() => setIsOpen(!isOpen)}>
                <span className="list-item-title">{item.degree || '(No Degree)'} at {item.school || '(No School)'}</span>
                <div className="list-item-actions">
                    <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(item.id); }} className="btn-icon danger">
                        <Trash2 size={16} />
                    </button>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </div>

            {isOpen && (
                <div className="list-item-body">
                    <Input label="School / University" name="school" value={item.school} onChange={handleChange} placeholder="e.g. Stanford University" />
                    <Input label="Degree / Major" name="degree" value={item.degree} onChange={handleChange} placeholder="e.g. B.S. Computer Science" />
                    <div className="flex gap-4">
                        <div style={{ flex: 1 }}><Input label="Graduation Date" name="graduationDate" value={item.graduationDate} onChange={handleChange} placeholder="YYYY" /></div>
                        <div style={{ flex: 1 }}><Input label="Score / GPA" name="score" value={item.score} onChange={handleChange} placeholder="e.g. 3.8/4.0" /></div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Education = () => {
    const { resumeData, actions } = useResume();
    const { education } = resumeData;

    const handleAdd = () => {
        actions.addSectionItem('education', {
            id: Date.now(),
            school: '',
            degree: '',
            graduationDate: '',
            score: ''
        });
    };

    const handleUpdate = (id, data) => {
        actions.updateSectionItem('education', id, data);
    };

    const handleRemove = (id) => {
        actions.removeSectionItem('education', id);
    };

    return (
        <div className="section-content">
            <h3 className="section-title">Education</h3>
            <div className="list-container">
                {education.map(item => (
                    <EducationItem
                        key={item.id}
                        item={item}
                        onChange={handleUpdate}
                        onRemove={handleRemove}
                    />
                ))}
            </div>
            <button className="btn-secondary full-width" onClick={handleAdd}>
                <Plus size={16} /> Add Education
            </button>
        </div>
    );
};

export default Education;
