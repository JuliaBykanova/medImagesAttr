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
import { ISelectItem, MultilevelSelect } from '../../components/MultilevelSelect';
import { ActBtn } from '../../components/ActBtn';
import { FilterInput } from '../../components/FilterInput';
import { getTemplates } from '../../redux/templates/action-creators';

export function TemplatePage() {

  const {idParam} = useParams();
  const dispatch = useAppDispatch();

  const {page, pageSize, offset, headItems, bodyRows} = useSelector((state: IRootState) => state.table);

  const selectItems: ISelectItem[]=[
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
                        children: [
                          {
                            id: '5',
                            name: '1 цвет',
                            children: [
                              {
                                id: '6',
                                name: 'Коричневые, тонкие или толстые линии',
                                children: [
                                  {
                                    id: '8',
                                    name: 'Себарейный кератоз'
                                  },
                                  {
                                    id: '9',
                                    name: 'Меланоцитарный невус'
                                  }
                                ]
                              },
                              {
                                id: '7',
                                name: 'Черные',
                                children: [
                                  {
                                    id: '10',
                                    name: 'Простое лентиго'
                                  },
                                  {
                                    id: '11',
                                    name: 'Меланоцитарный невус'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            id: '12',
                            name: '>1 цвета',
                            children: [
                              {
                                id: '13',
                                name: 'Центральная гиперпегментация',
                                children: [
                                  {
                                    id: '14',
                                    name: 'Меланоцитарный невус'
                                  }
                                ]
                              },
                              {
                                id: '15',
                                name: 'Пестрый или краповый',
                                children: [
                                  {
                                    id: '16',
                                    name: 'Меланома'
                                  },
                                  {
                                    id: '17',
                                    name: 'Меланоцитарный невус'
                                  }
                                ]
                              },
                              {
                                id: '18',
                                name: 'Периферическая гиперпегментация',
                                children: [
                                  {
                                    id: '19',
                                    name: 'Меланома'
                                  },
                                  {
                                    id: '20',
                                    name: 'Меланоцитарный невус'
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                    },
                    {
                      id: '21',
                      name: 'Разветвлённые',
                      children: [
                        {
                          id: '22',
                          name: 'Коричневые',
                          children: [
                            {
                              id: '23',
                              name: 'Меланоцитарный невус'
                            }
                          ]
                        },
                        {
                          id: '24',
                          name: 'Чёрные',
                          children: [
                            {
                              id: '25',
                              name: 'Простое лентиго',
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: '26',
                      name: 'Параллельные',
                      children: [
                        {
                          id: '27',
                          name: 'Гребешки',
                          children: [
                            {
                              id: '28',
                              name: 'Меланин',
                              children: [
                                {
                                  id: '30',
                                  name: 'Меланома'
                                },
                                {
                                  id: '31',
                                  name: 'Меланоцитарный невус'
                                },
                              ]
                            },
                            {
                              id: '29',
                              name: 'Другой пигмент',
                              children: [
                                {
                                  id: '32',
                                  name: 'Кровотечение'
                                },
                                {
                                  id: '33',
                                  name: 'Экзогенный пигмент'
                                },
                              ]
                            },
                          ]
                        },
                        {
                          id: '34',
                          name: 'Борозды',
                          children: [
                            {
                              id: '35',
                              name: 'Меланоцитарный невус',
                            }
                          ]
                        },
                        {
                          id: '36',
                          name: 'Пересекающиеся гребешки и борозды',
                          children: [
                            {
                              id: '37',
                              name: 'Меланоцитарный невус',
                            }
                          ]
                        },
                      ]
                    },
                    {
                      id: '38',
                      name: 'Изогнутые',
                      children: [
                        {
                          id: '39',
                          name: 'Себорейный кератоз',
                        },
                      ]
                    },
              ]
            },
          {
            id: '40', 
            name: 'Круги',
            children: [
              {
                  id: '41', 
                  name: 'Только коричневые круги',
                  children: [
                    {
                      id: '42',
                      name: 'Себорейный кератоз',
                      
                    },
                    {
                      id: '43',
                      name: 'Меланоцитарный невус',
                  
                    }
                  ],
              },
              {
                id: '44',
                name: 'Некоторые круги серые или черные',
                children: [
                  {
                    id: '45',
                    name: 'Меланома',
                    
                  },
                  {
                    id: '46',
                    name: 'Себорейный кератоз',
                    
                  },
                  {
                    id: '47',
                    name: 'Актинический кератоз (предрак)',
                    
                  },
                ]
              },
          ]
          },
          {
            id: '48', 
            name: 'Псевдоподии',
            children: [
              {
                  id: '49', 
                  name: 'Периферические',
                  children: [
                    {
                      id: '50',
                      name: 'Меланоцитарный невус',
                  
                    }
                  ],
              },
              {
                id: '51',
                name: 'Сегментарный',
                children: [
                  {
                    id: '52',
                    name: 'Меланома',
                    
                  },
                ]
              },
          ]
          },
          {
            id: '53', 
            name: 'Глыбки',
            children: [
                {
                    id: '54', 
                    name: '1 цвет',
                    children: [
                      {
                        id: '55',
                        name: 'Красный или пурпурный',
                        children: [
                          {
                            id: '56',
                            name: 'Гемангиома. кровоизлияние (в том числе пурпура)',
                          },
                        ]
                      },
                      {
                        id: '57',
                        name: 'Ораньжевый',
                        children: [
                          {
                            id: '58',
                            name: 'Себорейный кератоз',
                            
                          },
                          {
                            id: '59',
                            name: 'Базальноклеточная карцинома',
                            
                          },
                        ]
                      },
                      {
                        id: '60',
                        name: 'Желтый/белый',
                        children: [
                          {
                            id: '61',
                            name: 'Себорейный кератоз',
                            
                          },
                          {
                            id: '62',
                            name: 'Гиперплазия сальных желез',
                            
                          },
                        ]
                      },
                      {
                        id: '63',
                        name: 'Телесный',
                        children: [
                          {
                            id: '64',
                            name: 'Себорейный кератоз',
                            
                          },
                          {
                            id: '65',
                            name: 'Меланоцитарный невус',
                            
                          },
                        ]
                      },
                      {
                        id: '66',
                        name: 'Коричневый',
                        children: [
                          {
                            id: '67',
                            name: 'Меланоцитарный невус',
                            
                          },
                        ]
                      },
                      {
                        id: '68',
                        name: 'Черный',
                        children: [
                          {
                            id: '69',
                            name: 'Гемангиома, тромбоз, геморрагия',
                            
                          },
                        ]
                      },
                      {
                        id: '70',
                        name: 'Голубой',
                        children: [
                          {
                            id: '71',
                            name: 'Базальноклеточная карциома',
                            
                          },
                        ]
                      },
                    ],
                },
                {
                  id: '72',
                  name: '>1 цвета',
                  children: [
                    {
                      id: '73',
                      name: 'Другой пигмент',
                      children: [
                        {
                          id: '74',
                          name: 'Преобладают белые, желтые или ораньжевые глыбки',
                          children: [
                            {
                              id: '75',
                              name: 'Себорейный кератоз',
                              
                            },
                            {
                              id: '76',
                              name: 'Меланоцитарный невус',
                              
                            },
                          ]
                        },
                        {
                          id: '77',
                          name: 'Преобладают красные или сине-красные глыбки',
                          children: [
                            {
                              id: '78',
                              name: 'Гемангиома',
                              
                            },
                          ]
                        },
                      ]
                    },
                    {
                      id: '79',
                      name: 'Меланин',
                      children: [
                        {
                          id: '80',
                          name: 'Цвета расположены симметрично',
                          children: [
                            {
                              id: '81',
                              name: 'Меланоцитарный невус',
                              
                            },
                          ]
                        },
                        {
                          id: '82',
                          name: 'Цвета расположены ассимметрично',
                          children: [
                            {
                              id: '83',
                              name: 'Меланоцитарный невус',
                              
                            },
                            {
                              id: '84',
                              name: 'Бальзаноклеточная карцинома',
                              
                            },
                            {
                              id: '85',
                              name: 'Меланома',
                              
                            },
                          ]
                        },
                      ]
                    }
                  ]
                },
            ]
          },
          {
            id: '86', 
            name: 'Бесструктурная область',
            children: [
                {
                    id: '87', 
                    name: '1 цвет',
                    children: [
                      {
                        id: '88',
                        name: 'Красный',
                        children: [
                          {
                            id: '89',
                            name: 'Кровоизлияние',
                          },
                        ]
                      },
                      {
                        id: '90',
                        name: 'Синий',
                        children: [
                          {
                            id: '91',
                            name: 'Меланоцитарный невус',
                            
                          },
                          {
                            id: '92',
                            name: 'Меланома',
                            
                          },
                        ]
                      },
                      {
                        id: '93',
                        name: 'Коричневый',
                        children: [
                          {
                            id: '94',
                            name: 'Меланоцитарный невус',
                            
                          },
                          {
                            id: '95',
                            name: 'Болезнь Боуэна (предрак)',
                            
                          },
                          {
                            id: '96',
                            name: 'Себорейный кератоз',
                            
                          },
                        ]
                      },
                      {
                        id: '97',
                        name: 'Черный',
                        children: [
                          {
                            id: '98',
                            name: 'Меланоцитарный невус',
                            
                          },
                          {
                            id: '99',
                            name: 'Меланома',
                            
                          },
                          {
                            id: '100',
                            name: 'Кровоизлияние',
                            
                          },
                          {
                            id: '101',
                            name: 'Тромбированная гемангиома',
                            
                          },
                        ]
                      },
                    ],
                },
                {
                  id: '102',
                  name: '>1 цвета',
                  children: [
                    {
                      id: '103',
                      name: 'Преимущественно желтый или ораньжевый',
                      children: [
                        {
                          id: '104',
                          name: 'Себорейный кератоз',
                        },
                        {
                          id: '105',
                          name: 'Бальзаноклеточная карцинома',
                        },
                      ]
                    },
                    {
                      id: '106',
                      name: 'Сочетание коричневого, синего, серого, черного',
                      children: [
                        {
                          id: '107',
                          name: 'Симметричная окраска',
                          children: [
                            {
                              id: '108',
                              name: 'Меланоцитарный невус',
                              
                            },
                          ]
                        },
                        {
                          id: '109',
                          name: 'Несиметричная окраска',
                          children: [
                            {
                              id: '110',
                              name: 'Болезнь Боуэна (предрак)',
                              
                            },
                            {
                              id: '111',
                              name: 'Бальзаноклеточная карцинома',
                              
                            },
                            {
                              id: '112',
                              name: 'Меланома',
                              
                            },
                            {
                              id: '113',
                              name: 'Себорейный кератоз',
                              
                            },
                            {
                              id: '114',
                              name: 'Дерматофиброма',
                              
                            },
                          ]
                        },
                      ]
                    },
                    {
                      id: '115',
                      name: 'Преимущественно красный или черный',
                      children: [
                        {
                          id: '116',
                          name: 'Кровоизлияние',
                        },
                      ]
                    }
                  ]
                },
            ]
          },
          {
            id: '117', 
            name: 'Точки',
            children: [
                {
                    id: '118', 
                    name: 'Серые точки',
                    children: [
                      {
                        id: '119',
                        name: 'Себорейный кератоз (в форме доброкачественного лихеноидного кератоза)',
                        
                      },
                      {
                        id: '120',
                        name: 'Актинический кератоз (предрак)',
                        
                      },
                      {
                        id: '121',
                        name: 'Болезнь Боуэна (предрак)',
                        
                      },
                      {
                        id: '122',
                        name: 'Меланома',
                        
                      },
                    ],
                },
                {
                  id: '123',
                  name: 'Коричневые точки',
                  children: [
                    {
                      id: '124',
                      name: 'Себорейный кератоз (в форме солнечного лентиго)',
                      
                    },
                    {
                      id: '125',
                      name: 'Меланоцитарный невус',
                      
                    },
                    {
                      id: '126',
                      name: 'Болезнь Боуэна (предрак)',
                      
                    },
                  ],
                },
            ]
          },
        ]
      },

      {
        id: '2', 
        name: 'Несколько признаков',
        children: [
          {
            id: '127', 
            name: 'Линии',
            children: [
                  {
                      id: '128', 
                      name: 'Ретикулярные или разветвлённые',
                      children: [
                        {
                          id: '129',
                          name: 'Симметричные',
                          children: [
                            {
                              id: '130',
                              name: 'Меланоцитарный невус',
                            },
                          ]
                        },
                        {
                          id: '131',
                          name: 'Ассиметрчные',
                          children: [
                            {
                              id: '132',
                              name: '1 цвет, коричневый',
                              children: [
                                {
                                  id: '134',
                                  name: 'Меланоцитарный невус'
                                }
                              ]
                            },
                            {
                              id: '135',
                              name: '>1 цвета',
                              children: [
                                {
                                  id: '136',
                                  name: 'Меланома'
                                },
                                {
                                  id: '137',
                                  name: 'Меланоцитарный невус'
                                }
                              ]
                            },
                          ]
                        }
                      ],
                  },
                  {
                    id: '138',
                    name: 'Параллельные',
                    children: [
                      {
                        id: '139',
                        name: 'Гребешки',
                        children: [
                          {
                            id: '140',
                            name: 'Меланин',
                            children: [
                              {
                                id: '141',
                                name: '1 цвет, коричневый',
                                children: [
                                  {
                                    id: '142',
                                    name: 'Меланома',
                                  },
                                  {
                                    id: '143',
                                    name: 'Меланоцитарный невус',
                                  },
                                  {
                                    id: '144',
                                    name: 'Простое лентиго',
                                  },
                                ]
                              },
                              {
                                id: '145',
                                name: '>1 цвета',
                                children: [
                                  {
                                    id: '146',
                                    name: 'Меланома',
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            id: '147',
                            name: 'Другой пигмент',
                            children: [
                              {
                                id: '148',
                                name: 'Кровотечение'
                              },
                              {
                                id: '149',
                                name: 'Экзогенный пигмент'
                              },
                            ]
                          },
                        ]
                      },
                      {
                        id: '150',
                        name: 'Борозды или пересекающиеся гребешки и борозды',
                        children: [
                          {
                            id: '151',
                            name: 'Симметричный',
                            children: [
                              {
                                id: '152',
                                name: 'Меланоцитарный невус',
                              }
                            ]
                          },
                          {
                            id: '153',
                            name: 'Асимметричный',
                            children: [
                              {
                                id: '154',
                                name: 'Меланоцитарный невус',
                              },
                              {
                                id: '155',
                                name: 'Меланома',
                              },
                            ]
                          }
                        ]
                      },
                    ]
                  },
                  {
                    id: '156',
                    name: 'Изогнутые',
                    children: [
                      {
                        id: '157',
                        name: 'Себорейный кератоз',
                      },
                      {
                        id: '158',
                        name: 'Меланоцитарный невус',
                      },
                      {
                        id: '159',
                        name: 'Меланома',
                      },
                    ]
                  },
                  {
                    id: '160',
                    name: 'Радиальные',
                    children: [
                      {
                        id: '161',
                        name: 'По краям',
                        children: [
                          {
                            id: '162',
                            name: 'Переферические',
                            children: [
                              {
                                id: '163',
                                name: 'Белый или светло-коричневый центр',
                                children: [
                                  {
                                    id: '164',
                                    name: 'Дерматофиброма',
                                  },
                                ]
                              },
                              {
                                id: '165',
                                name: 'Черный коричневый или синий центр',
                                children: [
                                  {
                                    id: '166',
                                    name: 'Меланоцентарный невус',
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            id: '167',
                            name: 'Сегментраные',
                            children: [
                              {
                                id: '169',
                                name: 'Меланома',
                              },
                              {
                                id: '169',
                                name: 'Базальноклеточная карцинома',
                              },
                            ]
                          },
                        ]
                      },
                      {
                        id: '170',
                        name: 'По центру',
                        children: [
                          {
                            id: '171',
                            name: 'Базальноклеточная карцинома',
                          },
                        ]
                      },
                    ]
                  },
            ]
          },
        {
          id: '172', 
          name: 'Круги',
          children: [
            {
                id: '172', 
                name: 'Коричневые',
                children: [
                  {
                    id: '173',
                    name: 'Себорейный кератоз',
                    
                  },
                  {
                    id: '174',
                    name: 'Меланоцитарный невус',
                
                  }
                ],
            },
            {
              id: '175',
              name: 'Частично серые или серные',
              children: [
                {
                  id: '176',
                  name: 'Меланома',
                  
                },
                {
                  id: '177',
                  name: 'Себорейный кератоз',
                  
                },
                {
                  id: '178',
                  name: 'Актинический кератоз (предрак)',
                  
                },
              ]
            },
        ]
        },
        {
          id: '179', 
          name: 'Псевдоподии',
          children: [
            {
                id: '180', 
                name: 'Периферические',
                children: [
                  {
                    id: '181',
                    name: 'Меланоцитарный невус',
                
                  }
                ],
            },
            {
              id: '182',
              name: 'Сегментарный',
              children: [
                {
                  id: '183',
                  name: 'Меланома',
                  
                },
              ]
            },
        ]
        },
        {
          id: '184', 
          name: 'Глыбки',
          children: [
              {
                  id: '185', 
                  name: 'Симметричные узоры',
                  children: [
                    {
                      id: '186',
                      name: 'Меланоцитраный невус',
                    },
                  ],
              },
              {
                id: '187',
                name: 'Асиметричные узоры',
                children: [
                  {
                    id: '188',
                    name: 'Другой пигмент',
                    children: [
                      {
                        id: '189',
                        name: 'Желтый или белый',
                        children: [
                          {
                            id: '190',
                            name: 'Себорейный кератоз',                         
                          },
                        ]
                      },
                      {
                        id: '191',
                        name: 'Ораньжевый',
                        children: [
                          {
                            id: '192',
                            name: 'Бальзаноклеточная карцинома',
                          },
                          {
                            id: '193',
                            name: 'Себорейный кератоз',
                          },
                        ]
                      },
                      {
                        id: '194',
                        name: 'Красный или пурпурный',
                        children: [
                          {
                            id: '195',
                            name: 'Гемангиома',
                          },
                          {
                            id: '196',
                            name: 'Меланома',
                          },
                        ]
                      },
                    ]
                  },
                  {
                    id: '197',
                    name: 'Меланин',
                    children: [
                      {
                        id: '198',
                        name: '1 цвет, коричневый',
                        children: [
                          {
                            id: '199',
                            name: 'Меланоцитарный невус',
                            
                          },
                        ]
                      },
                      {
                        id: '200',
                        name: '>1 цвета',
                        children: [
                          {
                            id: '201',
                            name: 'Себорейный кератоз',
                          },
                          {
                            id: '202',
                            name: 'Бальзаноклеточная карцинома',
                          },
                          {
                            id: '203',
                            name: 'Меланома',
                          },
                        ]
                      },
                    ]
                  }
                ]
              },
          ]
        },
        {
          id: '204', 
          name: 'Точки',
          children: [
              {
                  id: '205', 
                  name: 'Серые',
                  children: [
                    {
                      id: '206',
                      name: 'Себорейный кератоз',
                    },
                    {
                      id: '207',
                      name: 'Актинический кератоз (предрак)',
                    },
                    {
                      id: '208',
                      name: 'Болезнь Боуэна (предрак)',
                    },
                    {
                      id: '209',
                      name: 'Меланома',
                    },
                    {
                      id: '210',
                      name: 'Бальзаноклеточная карцинома',
                    },
                  ],
              },
              {
                id: '211',
                name: 'Коричневые',
                children: [
                  {
                    id: '212',
                    name: 'Себорейный кератоз',
                  },
                  {
                    id: '213',
                    name: 'Меланоцитарный невус',
                  },
                  {
                    id: '214',
                    name: 'Болезнь Боуэна (предрак)',
                  },
                ],
              },
              {
                id: '215', 
                name: 'Синие',
                children: [
                  {
                    id: '216',
                    name: 'Бальзаноклеточная карцинома',
                  },
                ],
              },
              {
                id: '217', 
                name: 'Черные',
                children: [
                  {
                    id: '218',
                    name: 'Меланома',
                  },
                  {
                    id: '219',
                    name: 'Меланоцитарный невус',
                  },
                ],
            },
          ]
        },
      ]
    }
  ];

  useEffect(() => {
    dispatch(setOffset((Number(page)-1) * pageSize));
    dispatch(setType('templates'));
    dispatch(setIsLink(true));
  }, []);

  const {templates, filter} = useSelector((state: IRootState) => state.templates);

  useEffect(() => {
    dispatch(getTemplates(pageSize, offset, filter));
  }, [pageSize, offset, filter])

  useEffect(() => {
    const template = templates.find(item => item.name===idParam);
    template && dispatch(setTemplate(template));
    dispatch(setClearAttr());
  }, [idParam]);

  function handleChangeFilter(event: ChangeEvent<HTMLInputElement>){
    dispatch(setFilter(event.currentTarget.value));
  };

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
