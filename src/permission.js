import router from "~/router";
import { toast } from "~/composables/util";
import store from "./store";

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 获取token
  const token = localStorage.getItem("admin-token");
  console.log(token);
  if (!token && to.path != "/login") {
    toast("请先登录", "error");
    return next({ path: "/login" });
  }

  //防止重复登录
  if (token && to.path == "/login") {
    toast("别重复登录阿", "error");
    return next({ path: from.path ? from.path : "/" });
  }

  //如果用户登录了，自动获取用户信息，存储在vuex中

  if (token) {
    await store.dispatch("getInfo");
  }

  next();
});
