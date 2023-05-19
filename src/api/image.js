// 获取图片列表接口

import axios from "~/axios";

export function getImageList(id, page = 1) {
  return axios.get(`/admin/image_class/${id}/image/${page}`);
}
