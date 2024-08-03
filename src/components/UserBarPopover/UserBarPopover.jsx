import Button from '../UserPanel/Button.jsx';
import css from './UserBarPopover.module.css';
import SVG from '../../img/icons/sprite.svg';

export const UserBarPopover = ({
  isActive,
  setIsActive,
  setIsActiveSettings,
  setIsActiveLogout,
}) => {
  const handleSetting = () => {
    setIsActiveSettings(true);
    setIsActive(false);
  };

  const handleLogout = () => {
    setIsActiveLogout(true);
    setIsActive(false);
  };

  return (
    <div className={`${css.wrapper} ${isActive ? css.active : ''}`}>
      <Button onClick={handleSetting} className={css.settingBtn}>
        <SVG width="16" height="16" className={css.icon} svgId="settings" />
        Settings
      </Button>

      <Button onClick={handleLogout} className={css.logoutBtn}>
        <SVG width="16" height="16" className={css.icon} svgId="log-out" />
        Log out
      </Button>
    </div>
  );
};
