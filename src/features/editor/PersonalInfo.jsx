import React from 'react';
import { useResume } from '../../context/ResumeContext';
import Input from '../../components/ui/Input';

const PersonalInfo = () => {
    const { resumeData, actions } = useResume();
    const { personalInfo } = resumeData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        actions.updatePersonalInfo({ [name]: value });
    };

    return (
        <div className="section-content">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
                <Input
                    label="Full Name"
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                />
                <Input
                    label="Job Title"
                    name="jobTitle"
                    value={personalInfo.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                />
                <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={personalInfo.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 234 567 890"
                />
                <Input
                    label="Location"
                    name="location"
                    value={personalInfo.location}
                    onChange={handleChange}
                    placeholder="e.g. New York, NY"
                />
                <Input
                    label="LinkedIn"
                    name="linkedin"
                    value={personalInfo.linkedin}
                    onChange={handleChange}
                    placeholder="linkedin.com/in/johndoe"
                />
                <Input
                    label="Website/Portfolio"
                    name="website"
                    value={personalInfo.website}
                    onChange={handleChange}
                    placeholder="johndoe.com"
                />
            </div>
        </div>
    );
};

export default PersonalInfo;
