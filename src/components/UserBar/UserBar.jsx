import { useState } from 'react';
//import { useAuth } from '../../../hooks/useAuth';
import { UserBarPopover } from '../UserBarPopover/UserBarPopover';
import UserPanelAvatar from '../UserPanelAvatar/UserPanelAvatar';
import SVG from '../../img/icons/sprite.svg';
import css from './UserBar.module.css';

export const UserBar = ({ setIsActiveSettings, setIsActiveLogout }) => {
  const { user } = useAuth();
  const [isActive, setIsActive] = useState(false);

  const croppName = str => {
    if (str.length > 8) {
      str = str.slice(0, 8) + '...';
    }
    return str;
  };

  return (
    <div className={css.dropdown}>
      <div data-tour="UserBar" className={css.button} onClick={() => setIsActive(!isActive)}>
        <span className={css.userName}>{user ? croppName(user.name) : 'Anonymous'}</span>

        <UserPanelAvatar user={user} />

        {isActive ? (
          <SVG className={css.iconChevron} width={16} height={16} svgId="icon-chevron-down" />
        ) : (
          <SVG className={css.iconChevron} width={16} height={16} svgId="icon-chevron-up" />
        )}
      </div>

      {isActive && (
        <UserBarPopover
          isActive={isActive}
          setIsActive={setIsActive}
          setIsActiveSettings={setIsActiveSettings}
          setIsActiveLogout={setIsActiveLogout}
        />
      )}
    </div>
  );
};
