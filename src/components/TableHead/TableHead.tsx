import React from 'react';
import styles from './tablehead.css';
import { IItem, TableRow } from '../TableRow';

interface ITableHead{
  items?: IItem[];
}

export function TableHead({items}: Readonly<ITableHead>) {

  return (
    <thead className={styles.tableHead}>
      {items && (<TableRow cells={items}/>)}    
    </thead>
    
  );
}
