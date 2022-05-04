import { defineStore } from 'pinia';
import apis from '../../apis';

type TreeMap = {
  [key: number | string]: sidebarItem;
};

export const useStore = defineStore('sidebar', {
  state: () => {
    const data: {
      menuList: sidebarItem[];
      menuMap: { [key: number]: sidebarItem };
      collapsed: boolean;
      activeItem: sidebarItem | null;
    } = {
      menuList: [] as sidebarItem[],
      menuMap: {} as TreeMap,
      collapsed: false,
      activeItem: null,
    };
    return data;
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
    setTreeList(list: sidebarItem[]) {
      const arr: sidebarItem[] = [];
      let len = list.length;
      list.forEach((item) => (this.menuMap[item.id] = item));
      for (let i = 0; i < len; i++) {
        const item = list[i];
        if (item.pid) {
          const parent = this.menuMap[item.pid];
          parent.children = [...(parent.children || []), item];
          list.splice(i, 1);
          --i;
          --len;
        } else {
          arr.push(item);
        }
      }
      this.menuList = arr;
    },
    setActiveSidebar(item: sidebarItem) {
      this.activeItem = item;
    },
    async getList() {
      const res = await apis.getSidebarInfo();
      if (res && res.data) {
        this.setTreeList(res.data);
      }
    },
  },
});
