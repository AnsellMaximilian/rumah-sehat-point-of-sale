import SidebarLink from './SidebarLink';

const Sidebar = () => {
  return (
    <div className="">
      <nav>
        <ul className="p-2 flex flex-col gap-1">
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
