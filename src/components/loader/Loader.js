import React from 'react';
import style from '../../../styles/Loader.module.css';

export default function Loader() {
    return (
        <div className={style.wave}>
            <span className={style.dot}></span>
            <span className={style.dot}></span>
            <span className={style.dot}></span>
        </div>
    );
}