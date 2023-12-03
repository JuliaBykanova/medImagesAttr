import React from 'react';
import styles from './actbtn.css';
import classNames from 'classnames';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '../../redux/redux-store';
import { setClearAttr } from '../../redux/templates/templates-reducer';
import { useNavigate } from 'react-router';
import { templatesAPI } from '../../api/attributeAPI';

interface IActBtn{
  text: string;
  type: string;
  handlePagination?: () => void;
  isDisabled?: boolean;
}

export function ActBtn({text, type, handlePagination, isDisabled}: Readonly<IActBtn>) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const attribute = useSelector((state: IRootState) => state.templates.attribute);
  const name = useSelector((state: IRootState) => state.templates.template.name);
  const token = localStorage.getItem("accessToken");

  const classes = classNames(
    { 
      [styles['btn']]: true,
      [styles['save-btn']]: type==='save',
      [styles['next-btn']]: type==='pagNext',
      [styles['back-btn']]: type==='pagBack',
      [styles['disabled']]: isDisabled,
    }
  );

  const config = {
    headers: {
      "accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "ngrok-skip-browser-warning": "69420", 
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    "attributes": attribute,
    "email": "string",
  }

  function handleClickLoad(){
    location.reload(); 
  };

  async function handleClickSave(){
    await templatesAPI.postTemplatesData(name, body)
    .then(() => {
      dispatch(setClearAttr());
      navigate('/templates');
    })
    .catch((err) => console.log(err));
  }

  const fool = () => {/* this arrow function is empty */};

  const isSave = type==='save' ? handleClickSave : fool;

  const isPagination = type==='pagNext' || type==='pagBack' ? handlePagination : isSave;

  const isLoad = type==='load' ? handleClickLoad : isPagination;

  return (
    <button className={classes} onClick={isLoad} disabled={isDisabled}>
      {text}
    </button>
  );
}
