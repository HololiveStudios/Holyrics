import { useState } from 'react';
import { useStore } from '../store';
import { Bell, BellOff, Clock, Server } from 'lucide-react';

function Settings() {
  const { preferences, updatePreferences } = useStore();
  const [tempServerConfig, setTempServerConfig] = useState({
    ip: preferences.holyricsServerIp || '',
    port: preferences.holyricsServerPort || '80',
    token: preferences.holyricsToken || '' // Novo campo para o token
  });

  const handleServerConfigChange = (field: 'ip' | 'port' | 'token', value: string) => {
    setTempServerConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveServerConfig = () => {
    updatePreferences({
      holyricsServerIp: tempServerConfig.ip,
      holyricsServerPort: tempServerConfig.port,
      holyricsToken: tempServerConfig.token // Salva o token
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      
      {/* Existing Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-4">
          <label className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {preferences.notifications ? (
                <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <BellOff className="w-5 h-5 text-gray-400" />
              )}
              <span>Notifications</span>
            </div>
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={(e) =>
                updatePreferences({ notifications: e.target.checked })
              }
              className="relative h-6 w-11 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 checked:bg-indigo-600"
            />
          </label>
        </div>

        <div className="p-4">
          <label className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Notification Time</span>
            </div>
            <input
              type="time"
              value={preferences.notificationTime}
              onChange={(e) =>
                updatePreferences({ notificationTime: e.target.value })
              }
              className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>

         {/* Holyrics Server Configuration */}
         <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Holyrics Server</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="server-ip" className="block text-sm mb-1">IP Address</label>
              <input
                id="server-ip"
                type="text"
                value={tempServerConfig.ip}
                onChange={(e) => handleServerConfigChange('ip', e.target.value)}
                placeholder="192.168.1.100"
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="server-port" className="block text-sm mb-1">Port</label>
              <input
                id="server-port"
                type="text"
                value={tempServerConfig.port}
                onChange={(e) => handleServerConfigChange('port', e.target.value)}
                placeholder="80"
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          {/* Novo campo para o token */}
          <div className="mt-3">
            <label htmlFor="server-token" className="block text-sm mb-1">API Token</label>
            <input
              id="server-token"
              type="password"
              value={tempServerConfig.token}
              onChange={(e) => handleServerConfigChange('token', e.target.value)}
              placeholder="Cole seu token aqui"
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={saveServerConfig}
            className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save Server Configuration
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;