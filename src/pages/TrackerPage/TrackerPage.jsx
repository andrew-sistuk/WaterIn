import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';

import css from './TrackerPage.module.css';
import Message from '../../components/Message/Message';

const TrackerPage = () => {
  return (
    <div className={css.wrapper}>
      <WaterMainInfo />
      <WaterDetailedInfo />
      <Message />
    </div>
  );
};

export default TrackerPage;
