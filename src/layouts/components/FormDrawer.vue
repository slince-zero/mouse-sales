<template>
  <el-drawer
    v-model="showDrawer"
    title="修改密码"
    size="30%"
    :close-on-click-modal="false"
  >
    <div class="formDrawer">
      <div class="body">
        <div style="height: 1000000px; background-color: yellow"></div>

        <slot></slot>
      </div>
    </div>
    <div class="a">
      <el-button type="primary">提交</el-button>
      <el-button type="primary" @click="close">取消</el-button>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
const showDrawer = ref();

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
</script>

<style>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  /* @apply flex flex-col; */
  display: flex;
}

.formDrawer .body {
  flex: 1;
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px; */
  background-color: red;
  overflow-y: auto;
  /* overflow: scroll; */
}
/* .formDrawer .actions {
  height: 50px;
  @apply mt-auto  items-center;
} */
</style>
