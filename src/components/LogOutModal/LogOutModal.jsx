import { useDispatch } from 'react-redux';
import SVG from '../../img/icons/sprite.svg';
import css from './LogOutModal.module.css';
import toast from 'react-hot-toast';
//import { useLogoutMutation } from '../../redux/authApi/authApi.js';
//import { logOut } from '../../redux/auth/authSlice.js';

export const LogOutModal = ({ active, setActive }) => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const onClickLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        toast.success('Successfully logged out');
        setActive(false);
      })
      .catch(() => {
        toast.error('Something went wrong');
        setActive(false);
      });

    dispatch(logOut());
  };

  return (
    <div
      className={active ? `${css.modal} ${css.active}` : `${css.modal}`}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? `${css.modalContent} ${css.active}` : `${css.modalContent}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={css.closeDiv}>
          <button type="button" onClick={() => setActive(false)} className={css.btn}>
            <SVG svgId="close" width={24} height={24} className={css.icon} />
          </button>
        </div>
        <div className={css.div}>
          <h2 className={css.title}>Log Out</h2>
          <p className={css.text}>Are you sure you want to log out?</p>
          <div className={css.divBtn}>
            <button type="button" className={css.btnLog} onClick={onClickLogout}>
              Log Out
            </button>
            <button type="button" onClick={() => setActive(false)} className={css.btnCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
