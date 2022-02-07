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

async function getTableData(params: TableDataParams = {cn: 1, sn: 10}) {
  return request(adjustParams('/api/table-data', 'get', params))
}

const apis = {
  getTableHeader,
  getTableData,
}
export default apis