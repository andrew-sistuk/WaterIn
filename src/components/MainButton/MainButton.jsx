import styles from './MainButton.module.css';

import { useTranslation } from 'react-i18next';

export default function MainButton({
  text,
  onClick,
  disabled = false,
  icon = null,
  iconOnly = false,
}) {
  const { t } = useTranslation();

  return (
    <button
      className={`${styles.button} ${styles[text.replace(' ', '').toLowerCase()]} ${
        iconOnly ? styles.iconOnly : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{t('waterMainInfo.btn')}</span>
    </button>
  );
}
