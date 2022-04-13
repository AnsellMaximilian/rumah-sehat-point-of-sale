import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <aside className="w-52">
        <div
          className={`fixed h-full w-52 transition-all duration-100 ${
            isSidebarOpen ? '' : '-translate-x-52'
          }`}
        >
          <Sidebar />
        </div>
      </aside>
      <main className={`bg-green-200 grow ${isSidebarOpen ? '' : '-ml-52'}`}>
        <header className="bg-yellow-200">
          <div className="">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((state) => !state)}
              className="bg-white"
            >
              Toggle
            </button>
          </div>
        </header>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
