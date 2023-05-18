<script setup></script>

<template>
  <RouterView></RouterView>
</template>

<style>
body {
  @apply bg-gray-100;
}
#nprogress .bar {
  background-color: #29d !important;
  height: 3px !important;
}

/* 全局修改滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-corner {
  display: block;
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
