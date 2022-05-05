import { DATE_FORMAT } from '@/constants/fields';
import dayjs from 'dayjs'

export function dateFormat(key: Date | string | number | dayjs.Dayjs, formatType: string) {
  try {
    const day = dayjs(key)
    return day.format(formatType || DATE_FORMAT)
  } catch (err) {
    console.error(err);
  } finally {
    return key
  }
}
export default {
  dateFormat
}