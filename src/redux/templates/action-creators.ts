import { Dispatch } from '@reduxjs/toolkit';
import { IRow, ITemplate } from '../types';
import { setBodyRows, setHeadItems, setPagination } from '../table/table-reducer';
import { templatesAPI } from '../../api/attributeAPI';
import { setTemplates } from './templates-reducer';

export const getTemplates = (limit: number, offset: number) => async (dispatch: Dispatch) => {
  try {
    const res = await templatesAPI.getTemplatesData(limit, offset);
    const result: ITemplate[] = [];
    const bodyRows: IRow[] = [];
    for (let temlate of res.templates){

      result.push({name: temlate.templateName, url: temlate.templateDescription, attribute: temlate.lifetime});
      
      bodyRows.push({
        rowItem : [
          {
            text: temlate.templateName,
          },
          {
            text: temlate.templateDescription,
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