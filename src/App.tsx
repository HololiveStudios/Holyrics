import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useStore } from './store';
import Navigation from './components/Navigation.tsx';
import LiveFeed from './components/LiveFeed';
import History from './components/History';
import Settings from './components/Settings';

function App() {
  const { preferences, updatePreferences } = useStore();

  const toggleTheme = () => {
    updatePreferences({ theme: preferences.theme === 'light' ? 'dark' : 'light' });
  };

  return (
    <Router>
      <div className={preferences.theme === 'dark' ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="flex flex-col h-screen">
            <header className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h1 className="text-xl font-bold">Holirics Live</h1>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {preferences.theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            </header>
            
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<LiveFeed />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>

            <Navigation />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;