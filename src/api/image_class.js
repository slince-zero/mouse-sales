// 图库分类列表分页接口
import axios from "~/axios";

// 获取图片分类列表
export function getImageClassList(page) {
  return axios.get("/admin/image_class/" + page);
}

// 新增图片分类
export function createImageClass(data) {
  return axios.post("/admin/image_class", data);
}

// 更新
export function updateImageClass(id, data) {
  return axios.post("/admin/image_class/" + id, data);
}
// 删除
export function deleteImageClass(id) {
  return axios.post(`/admin/image_class/${id}/delete`);
}
