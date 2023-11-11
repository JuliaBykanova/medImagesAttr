import React from 'react';
import styles from './tableitem.css';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/redux-store';

interface ITableItem{
  text: string;
  id?: string;
  isMonoShrift?: boolean;
  isRed?: boolean;
  isGreen?: boolean;
  isBlue?: boolean;
  sortName?: string;
}

export function TableItem({text, id, isMonoShrift, isGreen, isRed, isBlue, sortName}: Readonly<ITableItem>) {

  const isLink = useSelector((state: IRootState) => state.table.isLink);

  const classes = classNames(
    { 
      [styles['tableItem']]: true,
      [styles['monoshrift']]: isMonoShrift,
      [styles['green']]: isGreen,
      [styles['red']]: isRed,
      [styles['blue']]: isBlue,
      [styles['sortItem']]: sortName,
    }
  );

  return (
    <th className={classes}>
      {id && isLink ? <Link className={styles.tableItemLink} to={`/templates/${id}`}>
                {text}
            </Link> : text
      }
    </th>
  );
}
