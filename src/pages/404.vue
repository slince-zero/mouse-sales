<template>
  <el-col :sm="12" :lg="6">
    <el-result icon="warning" title="404页面" sub-title="您的页面被妖怪吃掉啦">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')"
          >回到首页</el-button
        >
      </template>
    </el-result>
  </el-col>
</template>

<script setup lang="ts"></script>

<style></style>
