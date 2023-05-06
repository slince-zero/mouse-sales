import { ElNotification, ElMessageBox } from "element-plus";

// 成功提示
export function toast(message, type = "success") {
  ElNotification({
    message,
    type,
    duration: 3000,
  });
}

// 消息反馈提示框
export function showModal(content = "提示内容", type = "warning", title = "") {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type,
  });
}
