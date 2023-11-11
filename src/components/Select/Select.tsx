import React, { useEffect, useRef, useState } from 'react';
import styles from './select.css';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

interface ISelect{
  currentValue: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  name: string;
  items: {value: string, name: string}[],
  label?: string,
  isRow?: boolean,
}

export function Select({currentValue, onClick, items, name, label, isRow}: Readonly<ISelect>) {
  const [isActive, setIsActive] = useState(false); 
  const [searchParams, setSearchParams] = useSearchParams();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickClose(event: MouseEvent){
      if (event.target instanceof Node && !ref.current?.contains(event.target)){
        setIsActive(false);
      };
    };

    document.addEventListener('click', handleClickClose);
    
    return () => {
      document.removeEventListener('click', handleClickClose);
    };
  }, []);

  function handleClick(){
    setIsActive(!isActive);
  }

  const body = classNames(
    { 
      [styles['selectBody']]: true,
      [styles['selectBodyActive']]: isActive,
    }
  );

  const descr = classNames(
    { 
      [styles['label']]: true,
      [styles['rowLabel']]: isRow,
    }
  );

  const selectBlock = classNames(
    { 
      [styles['selectBlock']]: true,
      [styles['rowSelectBlock']]: isRow,
    }
  );

  function setQueryParams(event: React.MouseEvent<HTMLButtonElement>) {    
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    searchParams.set(`${name}`, `${value}`);
    searchParams.set('page', '1');

    setSearchParams(searchParams);
  };

  return (
    <div ref={ref} className={selectBlock} id='select'>
      {label &&
        <label className={descr}>{label}</label>
      }
      <div className={styles.select} onClick={handleClick}>
        <button className={styles.selectBtn}>
          <span className={styles.selectCurrent}>{items.find(item => item.value===currentValue)?.name}</span>
          <span className={isActive ? styles.rotate : undefined}>
            <svg width="14" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.3417 8.91208C14.966 9.29821 14.3477 9.30437 13.9644 8.92579L8.14183 3.17475C8.06342 3.0973 7.93715 3.09788 7.85945 3.17603L2.15281 8.91591C1.76725 9.30371 1.14293 9.3137 0.745162 8.93845C0.335488 8.55196 0.321627 7.90488 0.714373 7.5012L7.28326 0.749487C7.67588 0.345934 8.32412 0.345934 8.71674 0.749487L15.3417 7.55884C15.7082 7.93549 15.7082 8.53542 15.3417 8.91208Z" fill="#241b48"/>
            </svg>
          </span>
        </button>
        <div className={body}>
          {items.map((item) => {
            return <button key={item.name} className={styles.selectOption} onClick={event => {onClick(event); setQueryParams(event)}} value={item.value} name={name}>{item.name}</button>
          })}
        </div>
      </div>
    </div>  
  );
};
