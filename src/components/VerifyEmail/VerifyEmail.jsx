import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setToken } from '../../redux/auth/slice';
import { getRefreshToken, setAuthHeader } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import Loader from '../Loader/Loader';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (token && refreshToken) {
      dispatch(setToken({ token, refreshToken }));
      setAuthHeader(token);
      getRefreshToken(dispatch, token, refreshToken);
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
