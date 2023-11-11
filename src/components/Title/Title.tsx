import React from 'react';
import styles from './title.css';

interface ITitle{
  title: string
}

export function Title({title}: Readonly<ITitle>) {
  return (
    <h1 className={styles.title}>
      {title}
    </h1>
  );
}
