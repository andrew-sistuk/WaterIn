import styles from './MainButton.module.css';

export default function MainButton({
  text,
  onClick,
  disabled = false,
  icon = null,
  iconOnly = false,
}) {
  return (
    <button
      className={`${styles.button} ${styles[text.replace(' ', '').toLowerCase()]} ${
        iconOnly ? styles.iconOnly : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
    </button>
  );
}
