import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WelcomeContainer from '../../components/WelcomeContainer/WelcomeContainer';
import Message from '../../components/Message/Message';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../redux/auth/operations.js';





import { selectUser } from '../../redux/auth/selectors.js';

// import css from './TrackerPage.module.css';
import TourButton from '../../components/ButtonTour/ButtonTour.jsx';

const TrackerPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(user.id));
  }, [dispatch, user.id]);

  return (
    <>
      <section className="container">
        <TourButton />

        <WelcomeContainer>
          <WaterMainInfo />
          <WaterDetailedInfo />
          <Message />
        </WelcomeContainer>
      </section>
    </>
  );
};

export default TrackerPage;
