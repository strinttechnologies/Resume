import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import Layout from './components/Layout';
import Header from './components/Header';
import './index.css';

import Editor from './features/editor/Editor';
import Preview from './features/preview/Preview';
import Login from './features/auth/Login';
import { generatePDF } from './utils/pdfExport';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleDownload = () => {
    generatePDF();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={setUser} />;
  }

  return (
    <ResumeProvider>
      <Layout>
        <Header onDownload={handleDownload} />
        <div className="main-container">
          <div className="editor-pane">
            <Editor />
          </div>
          <div className="preview-pane">
            <Preview />
          </div>
        </div>
      </Layout>
    </ResumeProvider>
  );
}

export default App;
