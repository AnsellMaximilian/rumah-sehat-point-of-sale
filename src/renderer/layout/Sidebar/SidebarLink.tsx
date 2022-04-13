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
      className={({ isActive }) =>
        `block px-3 py-1 rounded-sm hover:text-primary hover:bg-primary-light ${
          isActive ? 'bg-primary-light font-semibold text-primary' : ''
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default SidebarLink;
