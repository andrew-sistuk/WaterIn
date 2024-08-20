import css from './FutureNote.module.css'
import Cap from '../../assets/icons/water-glass.svg?react';
import { CgAdd } from "react-icons/cg";

const FutureNote = () => {

    return (
        <>
        <div className={css.wrapper}>
            <Cap className={css.iconMain}/>
            <button className={css.addButton}>
                <CgAdd className={css.addIcon}/>
            </button>
            <p className={css.p}>Add remind</p>
        </div>
        </>
    )
}
export default FutureNote