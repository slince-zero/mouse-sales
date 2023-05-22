import { ElNotification, ElMessageBox } from "element-plus";
import nProgress from "nprogress";
// 成功提示
export function toast(
  message,
  type = "success",
  dangerouslyUserHTMLString = true
) {
  ElNotification({
    message,
    type,
    duration: 3000,
    dangerouslyUserHTMLString,
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

// 显示全屏loading
export function showFullLoading() {
  nProgress.start();
}
// 隐藏全屏loading
export function hiddenFullLoading() {
  nProgress.done();
}

// 图库列表里面用于重命名的弹出框
export function showPropt(tip, value = "") {
  return ElMessageBox.prompt(tip, "", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    inputValue: value,
  });
}
