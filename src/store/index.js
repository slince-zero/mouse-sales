import { createStore } from "vuex";
import { getInfo } from "../api/manager";
import { removeToken } from "~/composables/auth";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      // 用户信息
      user: {},
    };
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
  },
  actions: {
    //获取当前用户信息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            commit("SET_USERINFO", res);
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
