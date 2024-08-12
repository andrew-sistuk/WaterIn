import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18next/config.js';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import { TourProvider } from '@reactour/tour';
import { steps } from './assets/data/steps.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TourProvider steps={steps}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TourProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
