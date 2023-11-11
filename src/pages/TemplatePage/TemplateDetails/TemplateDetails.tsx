import React from 'react';
import styles from './templatedetails.css';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../redux/redux-store';

interface ITemplateDetails{
  id: string;
}

export function TemplateDetails() {

  const template = useSelector((state: IRootState) => state.templates.template);

  return (
    <div className={styles.detailsBlock}>
      <img className={styles.img} src={template.url}></img>
    </div>
  );
}
