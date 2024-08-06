import 'modern-normalize';

// add lazy
import { lazy, Suspense } from 'react';

import NotFound from './components/NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import PrivateRoute from './components/PrivateRoute';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/tracker"
          element={<PrivateRoute component={TrackerPage} redirectTo="/tracker" />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        {/* Інші маршрути */}
      </Routes>
    </Suspense>
  );
}

export default App;
