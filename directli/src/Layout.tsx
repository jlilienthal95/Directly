// components/Layout.js
import React, { ReactNode } from 'react';
// import Header from './Header';
import NavBar from './features/UI/navBar/NavBar';
// import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <NavBar />
    </div>
  );
};

export default Layout;
