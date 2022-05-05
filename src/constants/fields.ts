export const DATA_HOME = {
  pay_order_amount: {
    name: 'pay_order_amount',
    describe: '总体收入',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  stat_cost: {
    name: 'stat_cost',
    describe: '总体支出',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  stat_cost2: {
    name: 'stat_cost',
    describe: '账户总消耗',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  pay_order_amount2: {
    name: 'pay_order_amount',
    describe: '总收入情况',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  create_order_amount: {
    name: 'create_order_amount',
    describe: '账户订单金额',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  convert_rate: {
    name: 'convert_rate',
    describe: '订单转化率情况',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  pay_order_amount3: {
    name: 'pay_order_amount',
    describe: '账户成交金额',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  pay_order_rate: {
    name: 'pay_order_count ) / sum(create_order_count',
    describe: '订单成交率情况',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  show_cnt: {
    name: 'show_cnt',
    describe: '账户展示数',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  ctr: {
    name: 'ctr',
    describe: '点击率情况',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
};

export const AD_DATA = {
  pay_order_amount: {
    name: 'pay_order_amount',
    describe: '成交订单金额',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  pay_order_count: {
    name: 'pay_order_count',
    describe: '成交订单数情况',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  stat_cost: {
    name: 'stat_cost',
    describe: '消耗情况',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  show_cnt: {
    name: 'show_cnt',
    describe: '展示次数',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  click_cnt: {
    name: 'click_cnt',
    describe: '点击次数',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  ctr: {
    name: 'ctr',
    describe: '点率情况',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  cpm_platform: {
    name: 'cpm_platform',
    describe: '平均千次展示费用',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  create_order_roi: {
    name: 'create_order_roi',
    describe: '下单ROI',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  prepay_and_pay_order_roi: {
    name: 'prepay_and_pay_order_roi',
    describe: '支付ROI',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  dy_follow: {
    name: 'dy_follow',
    describe: '新增粉丝数',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  play_25_feed_break: {
    name: 'play_25_feed_break',
    describe: '25%播放数',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  play_50_feed_break: {
    name: 'play_50_feed_break',
    describe: '50%播放数',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  play_75_feed_break: {
    name: 'play_75_feed_break',
    describe: '75%播放数',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  play_over: {
    name: 'play_over',
    describe: '播放完成数',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
  play_duration_3s: {
    name: 'play_duration_3s',
    describe: '3S播放情况',
    source: 'kq_report_advertiser_all',
    type: 'SUM',
  },
};
export const DATE_FORMAT = 'YYYYMMDD';
