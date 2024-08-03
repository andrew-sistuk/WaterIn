import 'modern-normalize';

// add lazy
import { lazy, Suspense } from 'react';

import NotFound from './components/NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import PrivateRoute from './components/PrivateRoute';
import SignInForm from './components/SignForms/SignInForm';
import SignUpForm from './components/SignForms/SignUpForm';

// example
// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage'));
// const Calendar = lazy(() => import('./components/Calendar/Calendar'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
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
