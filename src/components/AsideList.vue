<!-- 抽离图库列表组件 -->
<template>
  <div class="aside-list" :class="{ active: active }">
    <span class="truncate"><slot /></span>
    <el-button
      class="ml-auto px-0"
      text
      type="primary"
      size="small"
      @click="$emit('edit')"
    >
      <el-icon :size="12"><Edit></Edit> </el-icon>
    </el-button>
    <el-button
      class="px-0"
      text
      type="primary"
      size="small"
      @click="$emit('delete')"
    >
      <el-icon :size="12"><Close></Close> </el-icon>
    </el-button>
  </div>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["edit", "delete"]);
</script>
<style>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-600;
}
.aside-list:hover,
.active {
  @apply bg-blue-50;
}
</style>
