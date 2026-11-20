import React from 'react';
import { useStore } from '../store';

function History() {
  const { history } = useStore();

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">History</h2>
      <div className="space-y-4">
        {history.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No history yet</p>
          </div>
        ) : (
          history.map((entry) => (
            <div
              key={entry.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg"
            >
              <div className="flex flex-col gap-2 mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(entry.date).toLocaleString()}
                </span>
                <span className="self-start px-3 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                  {entry.type}
                </span>
              </div>
              <div className="prose dark:prose-invert">
                {entry.type === 'verse' ? (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <p className="text-lg">{(entry.content as any).text}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {(entry.content as any).reference}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <h3 className="text-lg font-medium mb-2">{(entry.content as any).title}</h3>
                    <p>{(entry.content as any).content}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;