import { router, addRoutes } from "~/router";
import { toast, showFullLoading, hiddenFullLoading } from "~/composables/util";
import store from "./store";

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  showFullLoading();

  // 获取token
  const token = localStorage.getItem("admin-token");
  // console.log(token);
  if (!token && to.path != "/login") {
    toast("请先登录", "error");
    return next({ path: "/login" });
  }

  // 防止重复登录
  if (token && to.path == "/login") {
    toast("别重复登录阿", "error");
    return next({ path: from.path ? from.path : "/" });
  }

  // 如果用户登录了，自动获取用户信息，存储在vuex中
  let hasNewRoutes = false;
  if (token) {
    let { menus } = await store.dispatch("getInfo");
    // 动态添加路由
    hasNewRoutes = addRoutes(menus);
  }

  // 设置页面标题
  let title = (to.meta.title ? to.meta.title : "") + "-小鼠销售平台";
  document.title = title;

  hasNewRoutes ? next(to.fullPath) : next();
});

// 全局后置守卫
router.afterEach((to, from) => hiddenFullLoading());
