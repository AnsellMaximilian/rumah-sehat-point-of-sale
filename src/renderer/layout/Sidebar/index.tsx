import SidebarLink from './SidebarLink';

const Sidebar = () => {
  return (
    <div className="bg-red-200">
      <nav>
        <ul>
          <li>
            <SidebarLink to="/">Dashboard</SidebarLink>
          </li>
          <li>
            <SidebarLink to="/settings">Settings</SidebarLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
