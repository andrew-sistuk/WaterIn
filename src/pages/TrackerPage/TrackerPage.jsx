import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import LogOutModal from '../../components/LogOutModal/LogOutModal';
import DeleteEntryModal from '../../components/DeleteEntryModal/DeleteEntryModal';

const TrackerPage = () => {
  return (
    <div>
      <WaterMainInfo />
      <WaterDetailedInfo />
      <LogOutModal />
      <DeleteEntryModal />
    </div>
  );
};

export default TrackerPage;
