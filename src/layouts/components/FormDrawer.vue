<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destory-on-close="destoryOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
    </div>
    <div class="actions">
      <el-button type="primary" @click="submit">{{ confirmText }}</el-button>
      <el-button type="primary" @click="close">取消</el-button>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
const showDrawer = ref();

// 暴露抽屉框中的一些公用的
const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "30%",
  },
  // 提示按esc是否关闭抽屉
  destoryOnClose: {
    type: Boolean,
    default: false,
  },
  // 公共的确认按钮
  confirmText: {
    type: String,
    default: "提交",
  },
});

// 打开
const open = () => {
  showDrawer.value = true;
};

// 关闭
const close = () => {
  showDrawer.value = false;
};

// 向父组件暴露方法
defineExpose({
  open,
  close,
});

// 提交
const emit = defineEmits(["submit"]);
const submit = () => emit("submit");
</script>

<style>
.el-drawer__body {
  /* 让超出的部分滚动条消失，目的是凸显body里面的滚动条 */
  overflow: hidden;
}
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  /* @apply flex flex-col; */
  display: flex;
  /* overflow: hidden; */
}

.formDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
  /* overflow: scroll; */
}
.formDrawer .actions {
  height: 50px;
  @apply mt-auto  items-center;
}
</style>
