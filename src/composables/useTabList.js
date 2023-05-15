import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import { router } from "~/router";

export function useTabList() {
  const route = useRoute();
  const cookie = useCookies();

  const activeTab = ref(route.path);

  const tabList = ref([
    {
      title: "后台首页",
      path: "/",
    },
  ]);

  // 添加标签导航
  function addTab(tab) {
    let noTab = tabList.value.findIndex((t) => t.path == tab.path) == -1;
    if (noTab) {
      tabList.value.push(tab);
    }
    cookie.set("tabList", tabList.value);
  }
  // 初始化标签导航列表，刷新后，已经添加的导航列表不会消失
  function initTablist() {
    let tbs = cookie.get("tabList");
    if (tbs) {
      tabList.value = tbs;
    }
  }
  initTablist();

  onBeforeRouteUpdate((to, from) => {
    activeTab.value = to.path;
    addTab({
      title: to.meta.title,
      path: to.path,
    });
  });

  const changeTab = (t) => {
    activeTab.value = t;
    router.push(t);
  };

  // 关闭标签导航列表
  const removeTab = (t) => {
    // 接收导航列表数组
    let tabs = tabList.value;

    // 判断关闭的是不是激活的，或者是被选中的
    let a = activeTab.value;
    if (a == t) {
      tabs.forEach((tab, index) => {
        if (tab.path == t) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            a = nextTab.path;
          }
        }
      });
    }
    activeTab.value = a;
    tabList.value = tabList.value.filter((tab) => tab.path != t);
    cookie.set("tabList", tabList.value);
  };

  // 关闭其他导航栏列表和关闭所有导航栏列表
  const handleClose = (c) => {
    if (c == "clearAll") {
      // 切换回首页
      activeTab.value = "/";
      tabList.value = [
        {
          title: "后台首页",
          path: "/",
        },
      ];
    } else if (c == "clearOther") {
      // 过滤只剩下首页和当前导航栏标签
      tabList.value = tabList.value.filter(
        (tab) => tab.path == "/" || tab.path == activeTab.value
      );
    }
    cookie.set("tabList", tabList.value);
  };

  return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose,
  };
}
