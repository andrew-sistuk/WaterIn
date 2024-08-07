import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import Message from '../../components/Message/Message';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../redux/auth/operations.js';
import { selectLoading, selectUser } from '../../redux/auth/selectors.js';

import css from './TrackerPage.module.css';
import Loader from '../../components/Loader/Loader.jsx';

const TrackerPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getUser(user.id));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={css.wrapper}>
          <WaterMainInfo />
          <WaterDetailedInfo />
          <Message />
        </div>
      )}
    </>
  );
};

export default TrackerPage;
