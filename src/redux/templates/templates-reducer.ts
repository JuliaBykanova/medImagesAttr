import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IInitialStateTemplates, ITemplate } from '../types';

const initialState: IInitialStateTemplates = {
  templates: [
    {name: 'pictureName', url: 'https://oir.mobi/uploads/posts/2021-04/thumbs/1619796037_38-oir_mobi-p-samie-krasivie-kotyata-zhivotnie-krasivo-f-40.jpg', attribute: ['Один', 'признак', 'Линии', 'Ретикулярные']},
    {name: 'pictureName2', url: 'https://celes.club/uploads/posts/2022-10/1666880419_14-celes-club-p-samie-milie-koshki-na-svete-vkontakte-14.jpg', attribute: []},
    {name: 'pictureName3', url: 'https://oir.mobi/uploads/posts/2021-04/thumbs/1619796037_38-oir_mobi-p-samie-krasivie-kotyata-zhivotnie-krasivo-f-40.jpg', attribute: []},
    {name: 'pictureName4', url: 'https://celes.club/uploads/posts/2022-10/1666880419_14-celes-club-p-samie-milie-koshki-na-svete-vkontakte-14.jpg', attribute: []},
  ],
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