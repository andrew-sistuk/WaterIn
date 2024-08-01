import './App.css';

import 'modern-normalize';

// add lazy
import { Suspense } from 'react';

import NotFound from './components/NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';

// example
// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        {/* Інші маршрути */}
      </Routes>
    </Suspense>
  );
}

export default App;
