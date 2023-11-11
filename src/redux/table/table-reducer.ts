import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IInitialStateTable, IItem, IRow } from '../types';

const searchParams = new URLSearchParams(window.location.search);

const initialState: IInitialStateTable = {
  type: 'templates',
  headItems: [],
  bodyRows: [],
  pagination: {size: 0, totalNb: 0},
  page: searchParams.get('page') || '1',
  pageSize: Number(searchParams.get('pageSize')) || Number(localStorage.getItem('pageSize')) || 10,
  offset: 0,
  isLink: false,
}

export const tableReducer = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => ({
      ...state,
      type: action.payload,
    }),
    setHeadItems: (state, action: PayloadAction<IItem[]>) => ({
      ...state,
      headItems: action.payload,
    }),
    setBodyRows: (state, action: PayloadAction<IRow[]>) => ({
      ...state,
      bodyRows: action.payload,
    }),
    setPagination: (state, action: PayloadAction<{size: number, totalNb: number}>) => ({
      ...state,
      pagination: action.payload,
    }),
    setPage: (state, action: PayloadAction<string>) => ({
      ...state,
      page: action.payload,
    }),
    setPageSize: (state, action: PayloadAction<number>) => ({
      ...state,
      pageSize: action.payload,
    }),
    setOffset: (state, action: PayloadAction<number>) => ({
      ...state,
      offset: action.payload,
    }),
    setIsLink: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLink: action.payload,
    }),
    setNavigation: (state) => ({
      ...state,
      page: '1',
    }),
  },
});

export const {
  setType,
  setHeadItems,
  setBodyRows,
  setPagination,
  setPage,
  setPageSize,
  setOffset,
  setIsLink,
  setNavigation,
} = tableReducer.actions;

export default tableReducer.reducer;
