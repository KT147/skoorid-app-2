import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PlayerProvider } from './store/PlayerContext';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <PlayerProvider>
      <BrowserRouter>
      <App />
     </BrowserRouter>
    </PlayerProvider>
  </React.StrictMode>
);