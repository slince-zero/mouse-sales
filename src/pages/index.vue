<template>
  <div>后台首页</div>
  <div>{{ $store.state.user.username }}</div>
  <el-button @click="handleLogout">退出登录</el-button>
</template>

<script setup>
import { showModal, toast } from "~/composables/util";
import { logout } from "~/api/manager";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
function handleLogout() {
  showModal("是否要退出登录").then((res) => {
    logout().finally(() => {
      store.dispatch("logout");
      // 跳转回登录页面
      router.push("/login");
      // 提示退出成功
      toast("退出成功");
    });
  });
}
</script>

<style></style>
