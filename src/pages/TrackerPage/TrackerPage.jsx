import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import UserSettingsModal from '../../components/UserSettingsModal/UserSettingsModal';

import css from './TrackerPage.module.css';

const TrackerPage = () => {
  return (
    <div className={css.wrapper}>
      <WaterMainInfo />
      <WaterDetailedInfo />
      <UserSettingsModal />
    </div>
  );
};

export default TrackerPage;
