import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialResumeState } from '../utils/initialState';

const ResumeContext = createContext();

const resumeReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_PERSONAL_INFO':
            return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };

        case 'UPDATE_SUMMARY':
            return { ...state, summary: action.payload };

        case 'ADD_ITEM':
            // payload: { section: 'experience' | 'education' | ..., item: { ... } }
            return {
                ...state,
                [action.payload.section]: [...state[action.payload.section], action.payload.item]
            };

        case 'REMOVE_ITEM':
            // payload: { section: 'experience', id: 123 }
            return {
                ...state,
                [action.payload.section]: state[action.payload.section].filter(item => item.id !== action.payload.id)
            };

        case 'UPDATE_ITEM':
            // payload: { section: 'experience', id: 123, item: { ... } }
            return {
                ...state,
                [action.payload.section]: state[action.payload.section].map(item =>
                    item.id === action.payload.id ? { ...item, ...action.payload.item } : item
                )
            };

        case 'LOAD_STATE':
            return action.payload;

        case 'RESET':
            return initialResumeState;

        default:
            return state;
    }
};

const USER_EMAIL = 'user@example.com';
import { saveResume, fetchResume } from '../api/resumeApi';

export const ResumeProvider = ({ children }) => {
    const [resumeData, dispatch] = useReducer(resumeReducer, initialResumeState);

    // Load from DB on mount
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchResume(USER_EMAIL);
            if (data && data.data) {
                // Safely parse if it's a string, otherwise use object
                const parsed = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
                dispatch({ type: 'LOAD_STATE', payload: parsed });
            }
        };
        loadData();
    }, []);

    // Save to DB on change (debounced)
    useEffect(() => {
        if (resumeData !== initialResumeState) {
            const timeoutId = setTimeout(() => {
                saveResume(USER_EMAIL, resumeData);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [resumeData]);

    // Helper actions
    const updatePersonalInfo = (data) => dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data });
    const updateSummary = (text) => dispatch({ type: 'UPDATE_SUMMARY', payload: text });

    const addSectionItem = (section, item) => dispatch({ type: 'ADD_ITEM', payload: { section, item } });
    const removeSectionItem = (section, id) => dispatch({ type: 'REMOVE_ITEM', payload: { section, id } });
    const updateSectionItem = (section, id, item) => dispatch({ type: 'UPDATE_ITEM', payload: { section, id, item } });


    return (
        <ResumeContext.Provider value={{
            resumeData,
            dispatch,
            actions: {
                updatePersonalInfo,
                updateSummary,
                addSectionItem,
                removeSectionItem,
                updateSectionItem
            }
        }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
