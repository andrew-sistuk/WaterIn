import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import LogOutModal from '../../components/LogOutModal/LogOutModal';

const TrackerPage = () => {
  return (
    <div>
      <WaterMainInfo />
      <WaterDetailedInfo />
      <LogOutModal />
    </div>
  );
};

export default TrackerPage;
