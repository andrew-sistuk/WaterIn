import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

const PrivateRoute = ({ component, redirectTo }) => {
  const isLogIn = useSelector(selectIsLoggedIn);

  return isLogIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
