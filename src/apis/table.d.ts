interface SubTableDataParams {
  pageSize: number
  pageNumber: number
  dateString: string
  query?: string
  sort?: {
    key: string
    type: 'asc' | 'desc'
  }
  [key: string]: any
}
interface TableDataParams {
  page: number
  perPage: number
  query?: string
  sort?: {
    key: string
    type: 'asc' | 'desc'
  }
  [key: string]: any
}

interface TableHeaderParams {
  list?: Array<string>
}

interface loginParams {
  account: string
  pwd: string
}
