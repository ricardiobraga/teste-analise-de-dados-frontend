import React from 'react';
import styles from './Cards.module.css'

export default function Card(props){
    return (
        <div className={styles.cardMain}>
           <div className={styles.cardTitle}>
               {props.title}
           </div>
           <div className={styles.cardValue}>
               {props.value}
           </div>
        </div>
    )
}