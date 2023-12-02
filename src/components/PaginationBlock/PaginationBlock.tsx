import React, { ChangeEvent } from 'react';
import styles from './paginationblock.css';
import { ActBtn } from '../ActBtn';
import { Select } from '../Select';
import { FilterInput } from '../FilterInput';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IRootState, useAppDispatch } from '../../redux/redux-store';
import { useSelector } from 'react-redux';
import { setOffset, setPage, setPageSize } from '../../redux/table/table-reducer';
import { setFilter } from '../../redux/templates/templates-reducer';

export function PaginationBlock() {

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const pagination = useSelector((state: IRootState) => state.table.pagination);
  const page = useSelector((state: IRootState) => state.table.page);
  const pageSize = useSelector((state: IRootState) => state.table.pageSize);
  const offset = useSelector((state: IRootState) => state.table.offset);
  const pageAmount = pagination.totalNb ? Math.ceil(pagination.totalNb / Number(pageSize)) : 1;

  const selectItems = [
    {value: '10', name: '10'},
    {value: '25', name: '25'},
    {value: '50', name: '50'},
  ];

  function handleClickNext(){
    dispatch(setOffset(offset+pageSize));
    dispatch(setPage(`${Number(page)+1}`));
    searchParams.set(`page`, `${Number(page)+1}`);
    setSearchParams(searchParams);
  };

  function handleClickBack(){
    dispatch(setOffset(offset-pageSize));
    dispatch(setPage(`${Number(page)-1}`));
    searchParams.set(`page`, `${Number(page)-1}`);
    setSearchParams(searchParams);
  };

  function handleChangePage(event: ChangeEvent<HTMLInputElement>){
    dispatch(setPage(event.target.value));
    searchParams.set(`page`, `${event.target.value}`);
    setSearchParams(searchParams);
    if(Number(event.target.value)<1 && event.target.value){
      dispatch(setPage('1'));
      dispatch(setOffset(0));
      searchParams.set(`page`, `1`);
      setSearchParams(searchParams);
    }else if(Number(event.target.value)>pageAmount){
      dispatch(setPage(`${pageAmount}`));
      dispatch(setOffset((pageAmount-1) * pageSize));
      searchParams.set(`page`, `${pageAmount}`);
      setSearchParams(searchParams);
    }else if(event.target.value){
      dispatch(setOffset((Number(event.target.value)-1) * pageSize));
    }
  };

  function handlePageSize(event: React.MouseEvent<HTMLButtonElement>) {
    dispatch(setPageSize(Number(event.currentTarget.value)));
    localStorage.setItem('pageSize', event.currentTarget.value);
    dispatch(setPage('1'));
    dispatch(setOffset(0));
    dispatch(setFilter(''));
  };

  return (
    <div className={styles.paginationBlock}>
      <Select currentValue={`${pageSize}`} name='pageSize' onClick={handlePageSize} items={selectItems} label=' Page size:' isRow/>
      <span className={styles.pageDescr}>
        {pagination.totalNb ? offset+1 : 0} - {Number(pageSize)+offset>=pagination.totalNb ? pagination.totalNb : Number(pageSize)+offset} из {pagination.totalNb} элементов
      </span>
      <div className={styles.pageBlock}>
        <ActBtn text='<' type='pagBack' handlePagination={handleClickBack} isDisabled={page==='1'}/>
        <FilterInput type='number' value={page} onChange={handleChangePage} max={pageAmount} min={1}/>
        <span className={styles.pageDescr}>
          /   {pageAmount}
        </span>
        <ActBtn text='>' type='pagNext' handlePagination={handleClickNext} isDisabled={page===`${pageAmount}`}/>
      </div> 
    </div> 
  );
}
