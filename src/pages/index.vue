<template>
  <div>后台首页</div>
  <div>{{ $store.state.user.username }}</div>
  <div>
    <el-dropdown class="dropdown">
      <span class="el-dropdown-link">
        Dropdown List
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>

</script>

<style>
/* 怎么把外层的那个框框给去掉，猜想：套了一层div */
.dropdown:hover {
  background-color: aquamarine;

}
</style>
