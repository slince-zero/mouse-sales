// 封装首页数字滚动效果组件
<template>
  {{ d.num.toFixed(0) }}
</template>

<script setup>
import gsap from "gsap";
import { reactive, watch } from "vue";

// 父组件传过来的数值
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
});

const d = reactive({
  num: 0,
});

function AnimateToValue() {
  gsap.to(d, {
    duration: 0.5,
    num: props.value,
  });
}

AnimateToValue();

watch(
  () => props.value,
  () => AnimateToValue()
);
</script>
