import React from 'react';
import styles from './spinner.css';

const Loading = ({ isWhite }) => (
    <div className={styles.container}>
        <div className={`${styles.spinner} ${isWhite ? styles['spinner-white'] : ''}`} />
    </div>
);

export default Loading;