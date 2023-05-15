// 后台首页接口
import axios from "~/axios";

export function getStatistics1() {
  return axios.get("/admin/statistics1");
}
