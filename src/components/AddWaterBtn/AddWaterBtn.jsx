import css from './AddWaterBtn.module.css';
import { useTranslation } from 'react-i18next';

const AddWaterBtn = () => {
  const { t } = useTranslation();

  return (
    <>
      <button className={css.btn}>{t('waterMainInfo.today')}</button>
    </>
  );
};

export default AddWaterBtn;
