import React from 'react';
import styles from './header.css';
import { Link } from 'react-router-dom';
import { Title } from '../Title';

interface IHeader{
  title: string;
  linkText?: string;
  path?: string;
  btnId?: string;
  onClick?: () => void;
}

export function Header({title, linkText, path, btnId, onClick}: Readonly<IHeader>) {

  return (
    <div className={styles.header}>
      <Title title={title}/>
      {path && <Link className={styles.link} to={path} id={btnId} onClick={onClick}>{linkText}</Link>}
    </div>
  );
}
