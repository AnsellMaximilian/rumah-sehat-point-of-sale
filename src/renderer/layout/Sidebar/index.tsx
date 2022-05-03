import { FaTachometerAlt } from 'react-icons/fa';
import { BsGearFill, BsPersonFill } from 'react-icons/bs';
import { GiMedicinePills } from 'react-icons/gi';
import SidebarLink from './SidebarLink';
import SidebarDropdown from './SidebarDropdown';

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
            <SidebarLink to="/customers">
              <BsPersonFill />
              <span>Customers</span>
            </SidebarLink>
          </li>
          <li>
            <SidebarDropdown
              trigger={
                <div className="flex items-center gap-2">
                  <GiMedicinePills />
                  <span>Dr. Secret</span>
                </div>
              }
            >
              <SidebarLink to="/dr-secret/sg-products">SG Products</SidebarLink>
            </SidebarDropdown>
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
