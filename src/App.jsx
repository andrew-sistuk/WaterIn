import './App.css';
import 'modern-normalize';

// add lazy
import { lazy, Suspense } from 'react';

import NotFound from './components/NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import PrivateRoute from './components/PrivateRoute';

// example
// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage'));
// const Calendar = lazy(() => import('./components/Calendar/Calendar'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* <Route path="/" element={<Calendar />} /> */}
        <Route
          path="/tracker"
          element={<PrivateRoute component={TrackerPage} redirectTo="/tracker" />}
        />
        <Route path="*" element={<NotFound />} />
        {/* Інші маршрути */}
      </Routes>
    </Suspense>
  );
}

export default App;
