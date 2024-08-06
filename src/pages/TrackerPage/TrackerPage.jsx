import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WelcomeContainer from '../../components/WelcomeContainer/WelcomeContainer';
import Message from '../../components/Message/Message';

import css from './TrackerPage.module.css';

const TrackerPage = () => {
  return (
    <section className="container">
      <>
        <WelcomeContainer>
          <WaterMainInfo />
          <WaterDetailedInfo />
          <Message />
        </WelcomeContainer>
      </>
    </section>

    // <div className={css.wrapper}>
    //   <WaterMainInfo />
    //   <WaterDetailedInfo />
    //   <Message />
    // </div>
  );
};

export default TrackerPage;
