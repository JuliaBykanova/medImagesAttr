import { Dispatch } from '@reduxjs/toolkit';
import { IRow, ITemplate } from '../types';
import { setBodyRows, setHeadItems, setPagination } from '../table/table-reducer';
import { templatesAPI } from '../../api/attributeAPI';
import { setTemplates } from './templates-reducer';

export const getTemplates = (limit: number, offset: number, filter?: string) => async (dispatch: Dispatch) => {
  try {
    const res = await templatesAPI.getTemplatesData(limit, offset, filter);
    const result: ITemplate[] = [];
    const bodyRows: IRow[] = [];
    for (let temlate of res.data){

      result.push({name: temlate.file_name, url: temlate.url, attribute: temlate.attributes});
      
      bodyRows.push({
        rowItem : [
          {
            text: temlate.file_name,
          },
          {
            text: temlate.attributes ? temlate.attributes.join(' ') : '',
          },
        ],
      });
    };
    dispatch(setTemplates(result));
    dispatch(setBodyRows(bodyRows));
    dispatch(setHeadItems([
      {
        text: 'Имя'
      },
      {
        text: 'Аттрибут'
      },
    ]));
    dispatch(setPagination({size: res.pagination.size, totalNb: res.pagination.totalNb}));
  } catch (e: any) {
    console.error(e);
  };
};