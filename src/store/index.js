import { createStore } from "vuex";
import { getInfo } from "../api/manager";
import { removeToken } from "~/composables/auth";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      // 用户信息
      user: {},

      // 侧边宽度
      asideWidth: "250px",

      // 侧边菜单数据
      menus: [],
      ruleNames: [],
    };
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
    // 展开或者收缩侧边
    handleAsideWidth(state) {
      state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px";
    },

    SET_MENUS(state, menus) {
      state.menus = menus;
    },

    SET_RULENAMES(state, rulesNames) {
      state.ruleNames = rulesNames;
    },
  },
  actions: {
    //获取当前用户信息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            commit("SET_USERINFO", res);
            commit("SET_MENUS", res.menus);
            commit("SET_RULENAMES", res.ruleNames);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },

    // 退出登录
    logout({ commit }) {
      // 移除token
      removeToken();
      // 清楚当前用户状态 vuex
      commit("SET_USERINFO", {});
    },
  },
});

export default store;
