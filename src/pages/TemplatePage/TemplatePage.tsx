import React, { ChangeEvent, useEffect }  from 'react';
import styles from './templatepage.css';
import { useParams } from 'react-router-dom';
import { Table } from '../../components/Table';
import { Header } from '../../components/Header';
import { setBodyRows, setHeadItems, setIsLink, setOffset, setType } from '../../redux/table/table-reducer';
import { IRootState, useAppDispatch } from '../../redux/redux-store';
import { useSelector } from 'react-redux';
import { PaginationBlock } from '../../components/PaginationBlock';
import { IRow } from '../../redux/types';
import { TemplateDetails } from './TemplateDetails';
import { setClearAttr, setFilter, setTemplate } from '../../redux/templates/templates-reducer';
import { MultilevelSelect } from '../../components/MultilevelSelect';
import { ActBtn } from '../../components/ActBtn';
import { FilterInput } from '../../components/FilterInput';

export function TemplatePage() {

  const {idParam} = useParams();
  const dispatch = useAppDispatch();

  const {page, pageSize, offset, headItems, bodyRows} = useSelector((state: IRootState) => state.table);

  const selectItems=[
    {
        id: '1', 
        name: 'Один признак',
        children: [
            {
                id: '3', 
                name: 'Линии',
                children: [
                    {
                        id: '4', 
                        name: 'Ретикулярные',
                        attr: ['Один признак', 'Линии', 'Ретикулярные'],
                    }
                ]
            },
            {
              id: '5', 
              name: 'Круги',
              attr: ['Один признак', 'Круги'],
          }
        ]
    },

    {
      id: '2', 
      name: 'Два призника',
      children: [
          {
              id: '6', 
              name: 'Глыбки',
              children: [
                  {
                      id: '7', 
                      name: 'Один цвет',
                      children: [
                        {
                          id: '8', 
                          name: 'Меланин',
                          attr: ['Два призника', 'Глыбки', 'Один цвет', 'Меланин'],
                        }
                      ]
                  }
              ]
          }
      ]
  }
  ]

  useEffect(() => {
    dispatch(setOffset((Number(page)-1) * pageSize));
    dispatch(setType('templates'));
    dispatch(setIsLink(true));
  }, []);

  const rows: IRow[] = [
    {
      rowItem: [
        {
          text: 'pictureName'
        },
        {
          text: 'Один признак Линии Ретикулярные'
        },
      ]
    },
    {
      rowItem: [
        {
          text: 'pictureName2'
        },
        {
          text: ''
        },
      ]
    },
    {
      rowItem: [
        {
          text: 'pictureName3'
        },
        {
          text: ''
        },
      ]
    },
    {
      rowItem: [
        {
          text: 'pictureName4'
        },
        {
          text: ''
        },
      ]
    },
  ];

  const {templates, filter} = useSelector((state: IRootState) => state.templates);

  useEffect(() => {
    dispatch(setHeadItems([
      {
        text: 'Имя'
      },
      {
        text: 'Аттрибут'
      },
    ]));

    dispatch(setBodyRows(rows));

  }, [pageSize, offset])

  useEffect(() => {
    const template = templates.find(item => item.name===idParam);
    template && dispatch(setTemplate(template));
    dispatch(setClearAttr());
  }, [idParam]);

  function handleChangeFilter(event: ChangeEvent<HTMLInputElement>){
    dispatch(setFilter(event.currentTarget.value));
  }

  return (
      <div className={styles.container}>
        <Header title='Работа с изображениями'/>
        <div className={styles.flterBlock}>
          <FilterInput value={filter} onChange={handleChangeFilter} type='text' name='name' text='Введите название изображения' isSmall/>
        </div>
        <PaginationBlock/>
        <div className={styles.content}>
          <Table rows={bodyRows} items={headItems}/>
          {idParam && 
            <div className={styles.attrBlock}>
              <MultilevelSelect items={selectItems}/>
              <ActBtn text='Сохранить' type='save'/>
            </div>
          }
          {idParam && <TemplateDetails/>}
        </div>
        <PaginationBlock/>
      </div>
    
  );
}
