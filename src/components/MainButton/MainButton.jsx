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

  const textFormat = text.replace(' ', '').toLowerCase();

  return (
    <button
      className={`${styles.button} ${styles[textFormat]} ${iconOnly ? styles.iconOnly : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>
        {t('modals.addEdit.' + (textFormat === 'save' ? textFormat : 'add'))}
      </span>
    </button>
  );
}
