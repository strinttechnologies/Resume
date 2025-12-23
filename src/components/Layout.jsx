import React from 'react';
// styled-components import removed
// Plan said Vanilla CSS. I will use standard CSS classes.

import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            {children}
        </div>
    );
};

export default Layout;
