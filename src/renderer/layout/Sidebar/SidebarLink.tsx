import { NavLink } from 'react-router-dom';
import React from 'react';

interface Props {
  children: React.ReactNode;
  to: string;
  className?: string;
}

const SidebarLink = ({ children, to, className }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${className} block px-3 py-1 rounded-sm hover:text-primary hover:bg-primary-light ${
          isActive ? 'bg-primary-light font-semibold text-primary' : ''
        }`
      }
    >
      {children}
    </NavLink>
  );
};

SidebarLink.defaultProps = {
  className: 'flex items-center gap-2',
};

export default SidebarLink;
