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
  pageSize: number
  pageNumber: number
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
