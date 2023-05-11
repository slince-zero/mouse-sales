<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-2"><eleme-filled></eleme-filled></el-icon>
      小鼠销售
    </span>
    <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
      <fold v-if="$store.state.asideWidth == '250px'"></fold>
      <expand v-else></expand>
    </el-icon>
    <el-icon class="icon-btn">
      <refresh @click="handleRefresh"></refresh>
    </el-icon>

    <div class="ml-auto flex items-center">
      <el-icon class="icon-btn">
        <full-screen @click="toggle" v-if="!isFullscreen"></full-screen>
        <SwitchFilled v-else />
      </el-icon>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar
            class="mr-2"
            :size="25"
            :src="$store.state.user.avatar"
          ></el-avatar>
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <form-drawer
    ref="formDrawerRef"
    title="修改密码"
    destoryOnClose
    @submit="onSubmit"
  >
    <el-form
      ref="formRef"
      :rules="rules"
      :model="form"
      label-width="80px"
      size="small"
    >
      <el-form-item prop="oldPassword" label="旧密码">
        <el-input
          v-model="form.oldpassword"
          placeholder="请输入旧密码"
          showPassword
        ></el-input>
      </el-form-item>
      <el-form-item prop="Password" label="新密码">
        <el-input
          v-model="form.password"
          placeholder="请输入新密码"
          showPassword
        ></el-input>
      </el-form-item>
      <el-form-item prop="rePassword" label="确认密码">
        <el-input
          v-model="form.repassword"
          placeholder="请输入确认密码"
          showPassword
        ></el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
import FormDrawer from "./FormDrawer.vue";
import { useRePassword, useLogout } from "~/composables/useManager";

const { isFullscreen, toggle } = useFullscreen();
const { formDrawerRef, form, rules, formRef, onSubmit, openRePasswordFom } =
  useRePassword();

const { handleLogout } = useLogout();

// 选择修改密码还是退出登录
const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handleLogout();
      break;
    case "rePassword":
      openRePasswordFom();
    default:
      break;
  }
};

// 刷新页面功能
function handleRefresh() {
  location.reload();
}
</script>

<style>
.f-header {
  @apply flex items-center bg-indigo-600 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-500;
}

.f-header .dropdown {
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
  height: 64px;
}

/* .f-header .dropdown:hover {
  @apply bg-indigo-500;
  background: none;
} */
</style>
