import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WelcomeContainer from '../../components/WelcomeContainer/WelcomeContainer';
import Message from '../../components/Message/Message';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/auth/operations.js';
import { selectLoading, selectUser } from '../../redux/auth/selectors.js';
import Loader from '../../components/Loader/Loader.jsx';

const TrackerPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

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
          </>
        </section>
      )}
    </>
  );
};

export default TrackerPage;
