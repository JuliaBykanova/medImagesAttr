import React from 'react';
import styles from './layout.css';

interface ILayoutProps{
  children ?: React.ReactNode;
}

export function Layout({children}: Readonly<ILayoutProps>) {
  return (
    <main className={styles.layout}>
      {children}
    </main>
  );
}
