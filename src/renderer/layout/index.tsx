import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <aside className="w-52">
        <div
          className={`fixed h-full w-52 transition-all duration-100 bg-white ${
            isSidebarOpen ? '' : '-translate-x-52'
          }`}
        >
          <Sidebar />
        </div>
      </aside>
      <main className={`grow ${isSidebarOpen ? '' : '-ml-52'}`}>
        <header className="p-2 border-b border-gray-200 bg-white">
          <div className="">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((state) => !state)}
              className="text-primary p-1"
            >
              <FaBars size={24} />
            </button>
          </div>
        </header>
        <div className="m-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
