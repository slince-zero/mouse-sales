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

// 修改数据
export function updateNotice(id, data) {
  return axios.post("/admin/notice/" + id, data);
}

// 删除数据
export function deleteNotice(id) {
  return axios.post(`/admin/notice/${id}/delete`);
}
