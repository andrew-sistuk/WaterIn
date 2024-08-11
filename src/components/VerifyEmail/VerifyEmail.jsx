import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../../redux/auth/slice';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import Loader from '../Loader/Loader';
import { setAuthHeader } from '../../redux/auth/operations';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('accessToken').replace(/ /g, '+');
    const refreshToken = params.get('refreshToken').replace(/ /g, '+');
    const user = params.get('data').replace('_id', 'id');
    const parsedUser = JSON.parse(decodeURIComponent(user));

    if (token && refreshToken) {
      setAuthHeader(token);
      dispatch(setToken({ token, refreshToken }));

      if (parsedUser) {
        dispatch(setUser(parsedUser));
      }
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/tracker');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Loader />
    </>
  );
};

export default VerifyEmail;
