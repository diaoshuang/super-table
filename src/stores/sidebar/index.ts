import { defineStore } from 'pinia';
import apis from '../../apis';

export const useStore = defineStore('sidebar', {
  state: () => {
    return {
      menuList: [] as sidebarItem[],
      collapsed: false,
      activeItem: null,
    };
  },
  actions: {
    initSidebar() {
      if (!this.menuList.length) {
        this.getList();
      }
    },
    refreshSidebar() {
      this.getList();
    },
    async getList() {
      const res = await apis.getSidebarInfo();
      if (res) {
        this.menuList = res.data;
      }
    },
  },
});
