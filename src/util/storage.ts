type Expire = Date | string | number;
interface StorageExpireValue {
  value?: string;
  expire?: Expire;
}
export const isExpire = (d: Date | string | number) => {
  if (d instanceof Date) {
    return d.getTime() > Date.now();
  }
  const date = new Date(d);
  return date.getTime() > Date.now();
};

export const setStorage = (
  key: string,
  value: string,
  expire: Expire | null = ''
) => {
  try {
    const saveObj: StorageExpireValue = {
      value,
      expire: expire || Date.now() + 86400_000,
    };
    const v = localStorage.setItem(key, JSON.stringify(saveObj));
    return true;
  } catch {
    return false;
  }
};

export const getStorage = (key: string) => {
  try {
    const sv = localStorage.getItem(key);
    const getObj: StorageExpireValue = JSON.parse(sv || '{}');
    if (getObj.expire) {
      if (isExpire(getObj.expire)) {
        return getObj.value;
      }
      return undefined;
    }
    return sv;
  } catch {
    return undefined;
  }
};

export const removeStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {}
};

export default {
  isExpire,
  setStorage,
  getStorage,
  removeStorage,
};
