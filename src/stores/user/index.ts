import { defineStore } from 'pinia';
import apis from '@/apis';
import { storage } from '@/util';

export const useUserStore = defineStore('user', {
  state: () => {
    const data: {
      name: string;
      icon: string;
      token?: string;
      company?: string;
    } = {
      name: '',
      icon: '',
    };
    return data;
  },
  actions: {
    setUserInfo(userInfo: any) {
      storage.setStorage('userInfo', JSON.stringify(userInfo));
      this.name = userInfo.name;
      this.icon = userInfo.icon;
    },
    async getUserInfo() {
      const saveUser = JSON.parse(storage.getStorage('userInfo') || '{}');
      if (saveUser.name) {
        this.setUserInfo(saveUser);
      } else {
        const res = await apis.getUserInfo();
        if (res && res.data) {
          this.setUserInfo(res.data);
        }
      }
    },
  },
});
