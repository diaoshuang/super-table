interface TableDataParams {
  sn: number
  cn: number
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
