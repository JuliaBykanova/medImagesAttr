/*table*/

export interface IItem{
  text: string; 
  id?: string;
  isButton?: boolean;
  isMonoShrift?: boolean;
  isRed?: boolean;
  isGreen?: boolean;
  isBlue?: boolean;
  sortName?: string;
}

export interface IRow{
  rowItem: IItem[];
}

export interface IInitialStateTable{
  type: string;
  bodyRows: IRow[];
  headItems: IItem[];
  pagination: {size: number, totalNb: number};
  page: string;
  pageSize: number;
  offset: number;
  isLink: boolean;
}

/*templates*/

export interface IInitialStateTemplates{
  templates: ITemplate[];
  template: ITemplate;
  attribute: string[];
  openAttr: string[];
  filter: string
}

export interface ITemplate{
  name: string;
  url: string;
  attribute: string[];
}
