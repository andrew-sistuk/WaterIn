import 'modern-normalize';

// add lazy
import { lazy, Suspense } from 'react';

import NotFound from './components/NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute.jsx';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectIsRefreshing } from './redux/auth/selectors.js';
import { refreshUser } from './redux/auth/operations.js';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage'));

function App() {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signin"
          element={<RestrictedRoute component={<SignInPage />} redirectTo="/tracker" />}
        />
        <Route
          path="/signup"
          element={<RestrictedRoute component={<SignUpPage />} redirectTo="/tracker" />}
        />
        <Route
          path="/tracker"
          element={<PrivateRoute component={<TrackerPage />} redirectTo="/signin" />}
        />
        <Route
          path="/verify-email"
          element={<RestrictedRoute component={<VerifyEmail />} redirectTo="/tracker" />}
        />
        <Route path="/loader" element={<Loader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
