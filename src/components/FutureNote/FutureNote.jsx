import css from './FutureNote.module.css'
import Cap from '../../assets/icons/water-glass.svg?react';
import { CgAdd } from "react-icons/cg";

const FutureNote = () => {

    return (
        <>
        <div className={css.wrapper}>
            <Cap className={css.iconMain}/>
            <button>
                <CgAdd className={css.addIcon}/>
            </button>
            <p>Add note remind</p>
        </div>
        </>
    )
}
export default FutureNote