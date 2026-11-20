import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, History as HistoryIcon, Settings as SettingsIcon } from 'lucide-react';

function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center py-3 px-5 ${
              isActive 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Live</span>
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex flex-col items-center py-3 px-5 ${
              isActive 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`
          }
        >
          <HistoryIcon className="w-6 h-6" />
          <span className="text-xs mt-1">History</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center py-3 px-5 ${
              isActive 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`
          }
        >
          <SettingsIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;