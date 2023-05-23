// 公告相关的接口方法
import axios from "~/axios";

export function getNoticeList(page) {
  return axios.get(`/admin/notice/${page}`);
}
