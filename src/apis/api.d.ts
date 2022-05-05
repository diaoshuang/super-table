interface SubTableDataParams {
  pageSize: number;
  pageNumber: number;
  dateString: string;
  query?: string;
  sort?: {
    key: string;
    type: 'asc' | 'desc';
  };
  [key: string]: any;
}
interface TableDataParams {
  page: number;
  perPage: number;
  query?: string;
  sort?: {
    key: string;
    type: 'asc' | 'desc';
  };
  [key: string]: any;
}

interface TableHeaderParams {
  list?: Array<string>;
}
interface TableDataItem {
  [key: string]: string | number;
}

interface loginParams {
  account: string;
  pwd: string;
  verifyCode?: string;
}
interface loginRes {
  expire: string | null;
  indexMenu: string | null;
  pass: boolean;
  reason: string | null;
  token: string;
  useVerifyCode: boolean;
  userName: string | null;
}
interface userInfoRes {
  icon: string;
  name: string;
}

interface sidebarParams {}
interface sidebarItem {
  code: string;
  icon: string;
  id: number;
  name: string;
  pid: number;
  type: string;
  value: string;
  children?: sidebarItem[];
}
interface Field {
  name: string;
  describe: string;
  source: string;
  type: string;
}
interface ChartField extends Field {
  chartType?: string;
  yAxisIndex?: number;
}
interface DataInfoParams {
  startTime: string;
  endTime: string;
  marketingGoal: string;
  type: string;
  advertiserId?: string;
  field: Field[];
}
interface Top10DataInfoParams {
  startTime: string;
  endTime: string;
}
interface DataResponse<T> {
  status: number;
  msg: string;
  data: T;
}

interface UserShopItem {
  account: string;
  brandId: sring;
  id: number;
  shopId: string;
  shopName: string;
  [key: string]: string;
}
