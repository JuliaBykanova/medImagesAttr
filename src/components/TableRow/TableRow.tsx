import React from 'react';
import styles from './tablerow.css';
import { TableItem } from '../TableItem';
import { generateKey } from '../../utils/generateRandomIndex';
import { useParams } from 'react-router';
import classNames from 'classnames';

export interface IItem{
  text: string; 
  id?: string;
  isMonoShrift?: boolean;
  isRed?: boolean;
  isGreen?: boolean;
  isBlue?: boolean;
  sortName?: string;
}

interface ITableRow{
  cells: IItem[];
  id?: string;
  key?: string;
}

export function TableRow({cells, id}: Readonly<ITableRow>) {
  const {idParam} = useParams();

  const classes = classNames(
    { 
      [styles['tableRow']]: true,
      [styles['highlighted']]: idParam===id && idParam!==undefined,
    }
  );

  return (
    <tr className={classes} id={id}>
      { cells.map(generateKey).map((cell) => {
        return <TableItem text={ cell.text } key={cell.key} id={id ?? cell.id} isMonoShrift={cell.isMonoShrift} isGreen={cell.isGreen} isRed={cell.isRed} isBlue={cell.isBlue} sortName={cell.sortName}/>
      }) }
    </tr>
  );
}
