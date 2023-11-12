import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IInitialStateTemplates, ITemplate } from '../types';

const initialState: IInitialStateTemplates = {
  templates: [],
  template: {url: '', name: '', attribute: []},
  attribute: [],
  openAttr: [],
  filter: '',
}

export const templatesReducer = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplates: (state, action: PayloadAction<ITemplate[]>) => ({
      ...state,
      templates: action.payload,
    }),
    setTemplate: (state, action: PayloadAction<ITemplate>) => ({
      ...state,
      template: action.payload,
    }),
    setAttribute: (state, action: PayloadAction<string[]>) => ({
      ...state,
      attribute: action.payload,
    }),
    setOpenAttr: (state, action: PayloadAction<string[]>) => ({
      ...state,
      openAttr: action.payload,
    }),
    setFilter: (state, action: PayloadAction<string>) => ({
      ...state,
      filter: action.payload,
    }),
    setClearAttr: (state,) => ({
      ...state,
      openAttr: [],
      attribute: [],
    }),
  },
});

export const {
  setTemplate,
  setTemplates,
  setAttribute,
  setOpenAttr,
  setClearAttr,
  setFilter,
} = templatesReducer.actions;

export default templatesReducer.reducer;