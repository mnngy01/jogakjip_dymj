import React from 'react';
import './Layout.css';
import logo from '../assets/logo.svg';

function Layout({ children }) {
    return (
        <div className="layout">
            <header className="header">
                <img src={logo} alt="조각집 로고" className="logo" />
            </header>
            <main className="content">
                {children}
            </main>
        </div>
    );
}

export default Layout;
