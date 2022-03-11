import { AxiosRequestConfig } from 'axios'
import request from '../axios'

export const adjustParams = (url: string, method: string, params: {[key: string]: any}) => {
  let adjustUrl = url
  if (params && params.keys) {
    for (const [k, v] of Object.entries(params.keys)) {
      adjustUrl = adjustUrl.replace(`:${k}`, `${v}`)
    }
    delete params.keys
  }
  return {
    url: adjustUrl,
    method,
    ...params
  } as AxiosRequestConfig
}

async function getTableHeader(params: TableHeaderParams = {}) {
  return request(adjustParams('/api/table-header', 'get', params))
}
// 获取Total数据
async function getTableData(params: TableDataParams = {pageNumber: 0, pageSize: 10}) {
  return request(adjustParams('/api/reportAll', 'get', {params}))
}
// 获取Sub Table数据
async function getSubTableData(params: SubTableDataParams = {pageNumber: 0, pageSize: 10, dateString: ''}) {
  return request(adjustParams('/api/reportSub', 'get', {params}))
}
// 获取Wdt Total数据
async function getWdtTableData(params: TableDataParams = {pageNumber: 0, pageSize: 10}) {
  return request(adjustParams('/api/reportWdtAll', 'get', {params}))
}
// 获取Wdt Sub Table数据
async function getWdtSubTableData(params: SubTableDataParams = {pageNumber: 0, pageSize: 10, dateString: ''}) {
  return request(adjustParams('/api/reportWdtSub', 'get', {params}))
}
// 导入文件
async function importFile(params: any = {}) {
  return request(adjustParams('/api/saveWdtData', 'post', {params}))
}

const apis = {
  getTableHeader,
  getTableData,
  getSubTableData,
  getWdtTableData,
  getWdtSubTableData,
  importFile,
}
export default apis