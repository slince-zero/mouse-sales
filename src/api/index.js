// 后台首页接口
import axios from "~/axios";

export function getStatistics1() {
  return axios.get("/admin/statistics1");
}

// 请求首页echarts图表接口
export function getStatistics3(type) {
  return axios.get("/admin/statistics3?type=" + type);
}
