import { useEffect, useState, useCallback } from 'react';
import { useStore } from '../store';
import { Wifi, WifiOff } from 'lucide-react';

interface FeedItem {
  text: string;
  reference?: string;
  timestamp: string;
  type: 'verse' | 'lyrics';
}

interface ConnectionStatus {
  status: 'connecting' | 'connected' | 'disconnected';
  message: string;
}

function LiveFeed() {
  const { preferences, setCurrentVerse, setCurrentLyrics } = useStore();
  const [verseHistory, setVerseHistory] = useState<FeedItem[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    status: 'connecting',
    message: 'Discovering Holyrics server...'
  });

  const testHolyricsServer = useCallback(async () => {
    const { holyricsServerIp, holyricsServerPort, holyricsToken } = preferences;
  
    try {
      // Primeira requisição para obter a apresentação atual
      const presResponse = await fetch(
        `http://${holyricsServerIp}:${holyricsServerPort}/api/GetCurrentPresentation?token=${holyricsToken}`
      );
  
      console.log('Resposta bruta:', presResponse); // Debug
  
      if (!presResponse.ok) throw new Error("Erro na requisição: " + presResponse.status);
  
      const presData = await presResponse.json();
      console.log('Dados da apresentação:', presData); // Debug crucial
  
      // Segunda requisição para obter o slide atual
      const slideResponse = await fetch(
        `http://${holyricsServerIp}:${holyricsServerPort}/api/GetCurrentPresentation?token=${holyricsToken}`
      );
  
      const slideData = await slideResponse.json();
      console.log('Dados do slide:', slideData); // Debug
  
      // Processar os dados combinados
      const newItem: FeedItem = {
        text: slideData.text || 'Texto não disponível',
        reference: presData.reference || presData.title,
        timestamp: new Date().toISOString(),
        type: presData.type === 'bible' ? 'verse' : 'lyrics'
      };
  
      // Atualizar estados
      setConnectionStatus({ status: 'connected', message: 'Conectado ao Holyrics' });
      setVerseHistory(prev => [newItem, ...prev].slice(0, 5));
  
    } catch (error) {
      console.error('Erro completo:', error);
      setConnectionStatus({
        status: 'disconnected',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }, [preferences, setCurrentVerse, setCurrentLyrics]);

  useEffect(() => {
    if (preferences.holyricsServerIp && preferences.holyricsServerPort) {
      testHolyricsServer();
      const interval = setInterval(testHolyricsServer, 30000);
      return () => clearInterval(interval);
    }
  }, [preferences, testHolyricsServer]);

  const renderConnectionStatus = () => {
    const statusIcons = {
      'connecting': <Wifi className="w-6 h-6 text-yellow-500" />,
      'connected': <Wifi className="w-6 h-6 text-green-500" />,
      'disconnected': <WifiOff className="w-6 h-6 text-red-500" />
    };

    return (
      <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
        <div className="flex items-center gap-3">
          {statusIcons[connectionStatus.status]}
          <span>{connectionStatus.message}</span>
        </div>
        {connectionStatus.status === 'disconnected' && (
          <button 
            onClick={testHolyricsServer}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="space-y-2">
        {verseHistory.map((item, index) => (
          <div 
            key={item.timestamp}
            className={`
              bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md
              ${index === 0 ? 'text-xl font-bold' : 'text-base'}
            `}
          >
            <div>{item.text}</div>
            {item.reference && (
              <div className="text-sm text-gray-500 mt-2">
                {item.reference}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      {renderConnectionStatus()}
      {renderContent()}
    </div>
  );
}

export default LiveFeed;
