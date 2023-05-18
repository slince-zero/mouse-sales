// 后台首页接口
import axios from "~/axios";

// 请求首页那几个小卡片
export function getStatistics1() {
  return axios.get("/admin/statistics1");
}

// 请求首页店铺和交易提示组件接口
export function getStatistics2() {
  return axios.get("/admin/statistics2");
}

// 请求首页echarts图表接口
export function getStatistics3(type) {
  return axios.get("/admin/statistics3?type=" + type);
}
