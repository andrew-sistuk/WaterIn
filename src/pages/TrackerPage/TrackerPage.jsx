import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WelcomeContainer from '../../components/WelcomeContainer/WelcomeContainer';
import Message from '../../components/Message/Message';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../redux/auth/operations.js';
import { selectLoading, selectUser } from '../../redux/auth/selectors.js';
import { selectLoading as selectLoadingDay } from '../../redux/day/selectors.js';
import { useTour } from '@reactour/tour';

// import css from './TrackerPage.module.css';
import Loader from '../../components/Loader/Loader.jsx';

const TrackerPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const loadingDay = useSelector(selectLoadingDay);
  const { setIsOpen } = useTour();
  setIsOpen(true);

  useEffect(() => {
    dispatch(getUser(user.id));
  }, [dispatch, user.id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="container">
          <>
            <WelcomeContainer>
              <WaterMainInfo />
              <WaterDetailedInfo />
            </WelcomeContainer>
            <Message />
            {loadingDay && <Loader />}
          </>
        </section>
      )}
    </>
  );
};

export default TrackerPage;
