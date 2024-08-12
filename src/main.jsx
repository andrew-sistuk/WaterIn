import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18next/config.js';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import { TourProviderWrapper } from './components/TourProviderWrapper/TourProviderWrapper.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <TourProviderWrapper>
            <App />
          </TourProviderWrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
