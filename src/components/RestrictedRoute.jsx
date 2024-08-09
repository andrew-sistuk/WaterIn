import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors.js';
import { Navigate } from 'react-router-dom';

export default function RestrictedRoute({ component, redirectTo }) {
  const isLogIn = useSelector(selectIsLoggedIn);

  return isLogIn ? <Navigate to={redirectTo} /> : component;
}
