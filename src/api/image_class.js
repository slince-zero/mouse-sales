// 图库分类列表分页接口
import axios from "~/axios";

export function getImageClassList(page) {
  return axios.get("/admin/image_class/" + page);
}
