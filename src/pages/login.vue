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
              <el-icon><User /></el-icon>
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
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            color="#626aef"
            type="primary"
            @click="onSubmit"
            class="w-[250px]"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref } from "vue";

import login from "~/api/manager";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
// import { User, Lock } from "@element-plus/icons-vue";
// do not use same name with ref
const form = reactive({
  username: "",
  password: "",
});
const router = useRouter();

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
    login(form.username, form.password)
      .then((res) => {
        console.log(res);
        // 提示成功
        ElNotification({
          message: "登录成功",
          type: "success",
          duration: 20,
        });
        // 存储token和用户信息

        // 跳转到后台首页
        router.push("/");
      })
      .catch((err) => {
        ElNotification({
          message: err.response.data || "请求失败",
          type: "error",
          duration: 20,
        });
      });
  });
};
</script>

<style></style>
