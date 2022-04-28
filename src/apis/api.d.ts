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

interface sidebarParams {}
interface sidebarItem {
  code: string;
  icon: string;
  id: number;
  name: string;
  pid: number;
  type: string;
  value: string;
}
interface Field {
  name: string;
  describe: string;
  source: string;
  type: string;
}
interface DataInfoParams {
  startTime: string;
  endTime: string;
  marketingGoal: string;
  type: string;
  field: Field[];
}
interface DataInfoRes<T> {
  status: number;
  msg: string;
  data: T;
}