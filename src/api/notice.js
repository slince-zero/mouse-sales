// 公告相关的接口方法
import axios from "~/axios";

// 获取公告列表数据
export function getNoticeList(page) {
  return axios.get(`/admin/notice/${page}`);
}

// 新增数据
export function createNotice(data) {
  return axios.post("/admin/notice", data);
}
