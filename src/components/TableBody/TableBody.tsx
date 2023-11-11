import React from 'react';
import styles from './tablebody.css';
import { IItem, TableRow } from '../TableRow';
import { generateKey } from '../../utils/generateRandomIndex';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/redux-store';


 export interface IRow{
  rowItem: IItem[];
}

interface ITableBody{
  rows: IRow[];
}

export function TableBody({rows}: Readonly<ITableBody>) {

  const isLink = useSelector((state: IRootState) => state.table.isLink);

  return (
    <tbody className={styles.tableBody}>
      { rows.map(generateKey).map((row) => {
        return <TableRow cells={ row.rowItem } key={row.key} id={isLink ? row.rowItem[0].text : ''}/>
      }) }
    </tbody>
  );
}
