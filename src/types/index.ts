export interface Verse {
  id: string;
  text: string;
  reference: string;
  timestamp: string;
}

export interface Lyrics {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

export interface HistoryEntry {
  id: string;
  type: 'verse' | 'lyrics';
  content: Verse | Lyrics;
  date: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notificationTime: string;
  notifications: boolean;
  holyricsServerIp: string;
  holyricsServerPort: string;
  holyricsToken: string;
}
