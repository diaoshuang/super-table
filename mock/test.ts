// test.ts

import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/table-header',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: [
          {
            label: '日期',
            prop: 'date',
            width: '120',
          },
          {
            label: '配送信息',
            children: [
              {
                label: '姓名',
                prop: 'name',
              },
              {
                label: '地址',
                prop: '',
                children: [
                  {
                    label: '省份',
                    prop: 'province',
                  },
                  {
                    label: '市区',
                    prop: 'city',
                  },
                  {
                    label: '地址',
                    prop: 'address',
                  },
                  {
                    label: '邮编',
                    prop: 'zip',
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  },
  {
    url: '/api/table-data',
    method: 'get',
    response: ({ query = {} }) => {
      return {
        code: 0,
        data: [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
        ],
      }
    },
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben',
      },
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    },
  },
] as MockMethod[]