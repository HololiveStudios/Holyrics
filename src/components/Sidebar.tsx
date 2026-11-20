import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, History as HistoryIcon, Settings as SettingsIcon, Music } from 'lucide-react';

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Music className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-bold">Holirics Live</h1>
        </div>
      </div>
      <nav className="mt-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Live Feed</span>
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`
          }
        >
          <HistoryIcon className="w-5 h-5" />
          <span>History</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`
          }
        >
          <SettingsIcon className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;