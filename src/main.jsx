import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { EpisodeContextProvider } from './context/EpisodeContext';
import { UserContextProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ModalContextProvider } from './context/ModalContext';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <EpisodeContextProvider>
          <ModalContextProvider>
            <QueryClientProvider client={client}>
              <App />
            </QueryClientProvider>
          </ModalContextProvider>
        </EpisodeContextProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>
);
