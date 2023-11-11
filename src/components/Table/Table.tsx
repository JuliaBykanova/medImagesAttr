import React from 'react';
import styles from './table.css';
import { TableHead } from '../TableHead';
import { IRow, TableBody } from '../TableBody';
import { IItem } from '../TableRow';
import classNames from 'classnames';
import { IRootState } from '../../redux/redux-store';
import { useSelector } from 'react-redux';

interface ITable{
  rows: IRow[];
  items: IItem[];
}

export function Table({rows, items}: Readonly<ITable>) {

  const type = useSelector((state: IRootState) => state.table.type);

  const table = classNames(
    { 
      [styles['table']]: true,
      [styles['moderationTable']]: type==='moderation',
      [styles['answerTable']]: type==='answer',
      [styles['questionTable']]: type==='question',
    }
  );

  return (
    <div className={styles.tableBlock}>
      <table className={table}>
        <TableHead items={items} />
        <TableBody rows={rows}/>
      </table>
    </div>
    
  );
}
