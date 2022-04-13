import { FaTachometerAlt } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
  return (
    <div className="">
      <nav>
        <ul className="p-2 flex flex-col gap-1">
          <li>
            <SidebarLink to="/">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </SidebarLink>
          </li>
          <li>
            <SidebarLink to="/settings">
              <BsGearFill />
              <span>Settings</span>
            </SidebarLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
