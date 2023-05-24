import axios from "~/axios";

// export const login = (username, password) => {
//   return axios.post("/admin/login", {
//     username,
//     password,
//   });
// };

// 登录
export function login(username, password) {
  return axios.post("/admin/login", {
    username,
    password,
  });
}

// 获取登录用户信息--实际是获取登录的token
export function getInfo() {
  return axios.post("/admin/getinfo");
}

// 退出
export function logout() {
  return axios.post("/admin/logout");
}

// 修改密码
export function updatepassword(data) {
  return axios.post("/admin/updatepassword", data);
}

// 获取管理员信息列表
export function getManagerList(page, query = {}) {
  let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`);
    }
  }
  let r = q.join("&");
  r = r ? "?" + r : "";
  return axios.get(`/admin/manager/${page}${r}`);
}
