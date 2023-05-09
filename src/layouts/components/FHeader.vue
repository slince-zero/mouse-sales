<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-2"><eleme-filled></eleme-filled></el-icon>
      小鼠销售
    </span>
    <el-icon class="icon-btn">
      <fold></fold>
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

  <el-drawer
    v-model="showDrawer"
    title="修改密码"
    size="30%"
    :close-on-click-modal="false"
  >
    <span>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="oldpassword" label="旧密码">
          <el-input
            v-model="form.oldpassword"
            placeholder="请输入旧密码"
            type="password"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input
            v-model="form.password"
            placeholder="请输入新密码"
            type="password"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码">
          <el-input
            v-model="form.repassword"
            placeholder="请再次输入新密码"
            type="password"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading"
            >提 交</el-button
          >
        </el-form-item>
      </el-form>
    </span>
  </el-drawer>
</template>

<script setup>
import { showModal, toast } from "~/composables/util";
import { logout, updatepassword } from "~/api/manager";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useFullscreen } from "@vueuse/core";
import { ref, reactive } from "vue";

const { isFullscreen, toggle } = useFullscreen();
const router = useRouter();
const store = useStore();
//退出功能
const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handleLogout();
      break;
    case "rePassword":
      showDrawer.value = true;
    default:
      break;
  }
};

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

// 刷新页面功能
function handleRefresh() {
  location.reload();
}

// 修改密码抽屉
const showDrawer = ref(false);
const form = reactive({
  oldpassword: "",
  password: "",
  repassword: "",
});

const loading = ref(false);
//定义用户名和密码的规则验证
const rules = {
  oldpassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
  password: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
  repassword: [
    { required: true, message: "确认密码不能为空", trigger: "blur" },
  ],
};

const formRef = ref();
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return;
    }
    loading.value = true;
    updatepassword(form)
      .then((res) => {
        toast("修改密码成功，请重新登录");
        store.dispatch("logout");
        // 跳转回登录页面
        router.push("/login");
      })
      .finally(() => {
        loading.value = false;
      });
  });
};
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
  height: 60px;
}

.f-header .dropdown:hover {
  @apply bg-indigo-500;
  background: none;
}
</style>
