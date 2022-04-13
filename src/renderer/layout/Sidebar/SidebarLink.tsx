import { NavLink } from 'react-router-dom';
import React from 'react';

interface Props {
  children: React.ReactNode;
  to: string;
}

const SidebarLink = ({ children, to }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `block ${isActive ? 'btn-light' : 'btn'}`}
    >
      {children}
    </NavLink>
  );
};

export default SidebarLink;
