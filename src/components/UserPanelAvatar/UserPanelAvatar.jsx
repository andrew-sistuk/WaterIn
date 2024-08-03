import css from './UserPanelAvatar.module.css';
import defaultAvatar from '../../img/icons/default-avatar-profile.png';

const UserPanelAvatar = ({ user }) => {
  return (
    <div className={css.thumb}>
      <img src={user ? user.avatar : defaultAvatar} alt="User avatar" className={css.img} />
    </div>
  );
};

export default UserPanelAvatar;
