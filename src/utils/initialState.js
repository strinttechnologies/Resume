export const initialResumeState = {
    personalInfo: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        website: '',
        linkedin: '',
        location: '',
    },
    summary: '',
    experience: [], // Array of objects: { id, company, role, startDate, endDate, description }
    education: [],  // Array of objects: { id, school, degree, graduationDate, score }
    skills: [],     // Array of strings or objects { id, name, level }
    projects: [],   // Array of objects: { id, name, link, description }
    certifications: []
};
