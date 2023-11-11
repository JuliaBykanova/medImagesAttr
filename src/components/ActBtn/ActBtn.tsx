import React from 'react';
import styles from './actbtn.css';
import classNames from 'classnames';

interface IActBtn{
  text: string;
  type: string;
  handlePagination?: () => void;
  isDisabled?: boolean;
}

export function ActBtn({text, type, handlePagination, isDisabled}: Readonly<IActBtn>) {

  const classes = classNames(
    { 
      [styles['btn']]: true,
      [styles['save-btn']]: type==='save',
      [styles['next-btn']]: type==='pagNext',
      [styles['back-btn']]: type==='pagBack',
      [styles['disabled']]: isDisabled,
    }
  );

  function handleClickLoad(){
    location.reload(); 
  };


  const fool = () => {/* this arrow function is empty */};

  const isPagination = type==='pagNext' || type==='pagBack' ? handlePagination : fool;

  const isLoad = type==='load' ? handleClickLoad : isPagination;

  return (
    <button className={classes} onClick={isLoad} disabled={isDisabled}>
      {text}
    </button>
  );
}
