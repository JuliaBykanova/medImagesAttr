import React, { ChangeEvent } from 'react';
import styles from './filterinput.css';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

interface IFilterInput{
  type: string;
  name?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  text?: string;
  min?: number;
  max?: number;
  isSmall?: boolean;
}

export function FilterInput({type, name, value, onChange, text, max, min, isSmall}: Readonly<IFilterInput>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const label = classNames(
    { 
      [styles['label']]: true,
      [styles['paginationLabel']]: min && max,
      [styles['labelSmall']]: isSmall,
    }
  );

  const input = classNames(
    { 
      [styles['input']]: true,
      [styles['paginationInput']]: min && max,
      [styles['disabled']]: min && max && min===max,
    }
  );

  function setQueryParams(event: ChangeEvent<HTMLInputElement>) {    
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    if(name){
      searchParams.set(`${name}`, `${value}`);
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  };

  return (
    <label className={label}>
      {!min && <span className={styles.text}>
        {text}:
      </span>}
      <input className={input} type={type} name={name} value={value} onChange={event => { onChange(event); setQueryParams(event)}} max={max} min={min} disabled={min===max && min!==undefined}/>
    </label>
    
  );
}
