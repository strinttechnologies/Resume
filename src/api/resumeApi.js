const API_URL = 'http://localhost:5000/api/resume';

export const saveResume = async (email, data) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, data }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error saving resume:', error);
        throw error;
    }
};

export const fetchResume = async (email) => {
    try {
        const response = await fetch(`${API_URL}/${email}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Failed to fetch');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching resume:', error);
        return null;
    }
};
