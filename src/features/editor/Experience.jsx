import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const ExperienceItem = ({ item, onChange, onRemove }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(item.id, { [name]: value });
    };

    return (
        <div className="list-item-card">
            <div className="list-item-header" onClick={() => setIsOpen(!isOpen)}>
                <span className="list-item-title">{item.role || '(No Role)'} at {item.company || '(No Company)'}</span>
                <div className="list-item-actions">
                    <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(item.id); }} className="btn-icon danger">
                        <Trash2 size={16} />
                    </button>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </div>

            {isOpen && (
                <div className="list-item-body">
                    <Input label="Job Title" name="role" value={item.role} onChange={handleChange} placeholder="e.g. Senior Developer" />
                    <Input label="Company" name="company" value={item.company} onChange={handleChange} placeholder="e.g. Google" />
                    <div className="flex gap-4">
                        <div style={{ flex: 1 }}><Input label="Start Date" name="startDate" value={item.startDate} onChange={handleChange} placeholder="MM/YYYY" /></div>
                        <div style={{ flex: 1 }}><Input label="End Date" name="endDate" value={item.endDate} onChange={handleChange} placeholder="Present" /></div>
                    </div>
                    <TextArea label="Description" name="description" value={item.description} onChange={handleChange} placeholder="Describe your responsibilities and achievements..." />
                </div>
            )}
        </div>
    );
};

const Experience = () => {
    const { resumeData, actions } = useResume();
    const { experience } = resumeData;

    const handleAdd = () => {
        actions.addSectionItem('experience', {
            id: Date.now(),
            role: '',
            company: '',
            startDate: '',
            endDate: '',
            description: ''
        });
    };

    const handleUpdate = (id, data) => {
        actions.updateSectionItem('experience', id, data);
    };

    const handleRemove = (id) => {
        actions.removeSectionItem('experience', id);
    };

    return (
        <div className="section-content">
            <h3 className="section-title">Experience</h3>
            <div className="list-container">
                {experience.map(item => (
                    <ExperienceItem
                        key={item.id}
                        item={item}
                        onChange={handleUpdate}
                        onRemove={handleRemove}
                    />
                ))}
            </div>
            <button className="btn-secondary full-width" onClick={handleAdd}>
                <Plus size={16} /> Add Experience
            </button>
        </div>
    );
};

export default Experience;
