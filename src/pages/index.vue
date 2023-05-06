<template>
  <div>后台首页</div>
  <el-button @click="set">设置token</el-button>
  <el-button @click="get">获取token</el-button>
</template>

<script setup>
let cookie;
function set() {
  cookie = window.localStorage.setItem("admin-cookie", "111111");
  console.log(cookie);
}
function get() {
  console.log(window.localStorage.getItem("admin-cookie"));
}
</script>

<style></style>
