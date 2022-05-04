import { AxiosRequestConfig, AxiosResponse } from 'axios';
import request from '../axios';

export const adjustParams = (
  url: string,
  method: string,
  params: { [key: string]: any }
) => {
  let adjustUrl = url;
  if (params && params.keys) {
    for (const [k, v] of Object.entries(params.keys)) {
      adjustUrl = adjustUrl.replace(`:${k}`, `${v}`);
    }
    delete params.keys;
  }
  return {
    url: adjustUrl,
    method,
    ...params,
  } as AxiosRequestConfig;
};

async function getTableHeader(params: TableHeaderParams = {}) {
  return request(adjustParams('/api/table-header', 'get', params));
}
// 获取Total数据
async function getTableData(
  params: TableDataParams = { page: 0, perPage: 10 }
) {
  return request(adjustParams('/api/reportAll', 'get', { params }));
}
// 获取Sub Table数据
async function getSubTableData(
  params: SubTableDataParams = { pageNumber: 0, pageSize: 10, dateString: '' }
) {
  return request(adjustParams('/api/reportSub', 'get', { params }));
}
// 获取Wdt Total数据
async function getWdtTableData(
  params: TableDataParams = { page: 0, perPage: 10 }
) {
  return request(adjustParams('/api/reportWdtAll', 'get', { params }));
}
// 获取Wdt Sub Table数据
async function getWdtSubTableData(
  params: SubTableDataParams = { pageNumber: 0, pageSize: 10, dateString: '' }
) {
  return request(adjustParams('/api/reportWdtSub', 'get', { params }));
}
// 导入文件
async function importFile(params: any = {}) {
  return request(adjustParams('/api/saveWdtData', 'post', { params }));
}

// login
async function login(params: loginParams) {
  return request.post<loginRes>(
    `/erupt-api/login?account=${params.account}&pwd=${params.pwd}&verifyCode=${
      params.verifyCode || 'null'
    }`
  );
}
// getUserInfo
async function getUserInfo() {
  return request.post<userInfoRes>(`/erupt-api/getUserInfo`);
}

// sidebar list
async function getSidebarInfo() {
  return request.get<Array<sidebarItem>>(`/erupt-api/menu`);
}

// 数据接口
async function getDataInfo(params: DataInfoParams) {
  const res = await request.post<DataResponse<(string | number)[][]>>(
    `/api/web/home/findData`,
    params
  );
  return res.data;
}
// 用户店铺信息
async function getUserShopList() {
  const res = await request.post<DataResponse<UserShopItem[]>>(
    '/api/web/home/findUserShop'
  );
  return res.data;
}

const apis = {
  getTableHeader,
  getTableData,
  getSubTableData,
  getWdtTableData,
  getWdtSubTableData,
  importFile,
  login,
  getUserInfo,
  getSidebarInfo,
  getDataInfo,
  getUserShopList,
};
export default apis;
