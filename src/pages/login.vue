<template>
  <el-row style="min-height: 100vh" class="bg-indigo-500">
    <el-col :lg="16" :md="12" class="flex items-center justify-center">
      <div>
        <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
        <div class="text-gray-200 text-sm">这里是《Vue3 + Vite 小鼠销售》</div>
      </div>
    </el-col>
    <el-col
      :lg="8"
      :md="12"
      class="bg-light-50 flex items-center justify-center flex-col"
    >
      <h2 class="font-bold text-3xl text-true-gray-800">欢迎回来</h2>

      <div class="flex items-center justify-center my-5 text-gray-300">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
          >
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            color="#626aef"
            type="primary"
            @click="onSubmit"
            class="w-[250px]"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";

import { login } from "~/api/manager";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { toast } from "~/composables/util";
import { setToken } from "~/composables/auth";

// import { User, Lock } from "@element-plus/icons-vue";
// do not use same name with ref
const form = reactive({
  username: "",
  password: "",
});
const store = useStore();
const router = useRouter();

const loading = ref(false);
//定义用户名和密码的规则验证
const rules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
};

const formRef = ref();
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return;
    }
    loading.value = true;
    login(form.username, form.password)
      .then((res) => {
        console.log(res);
        // 提示成功
        toast("登录成功");
        // 存储token
        // cookie.set("admin-cookie", res.token);
        // window.localStorage.setItem("admin-token", res.token);
        setToken(res.token);
        // console.log(localStorage.getItem("admin-token"));

        // 跳转到后台首页
        router.push("/");
      })
      .finally(() => {
        loading.value = false;
      });
  });
};

// 监听回车事件
function onKeyUp(e) {
  if (e.key == "Enter") {
    onSubmit();
  }
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});
//移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp);
});
</script>

<style></style>
