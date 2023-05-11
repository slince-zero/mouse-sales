<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      default-active="2"
      class="border-0"
      :collapse="isCollapse"
      @select="handleSelect"
      :collapse-transition="false"
      :unique-opened="false"
      :default-active="defaultActive"
    >
      <template v-for="(item, index) in asideMeus" :key="index">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon><component :is="item2.icon"></component></el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const route = useRoute();
const asideMeus = computed(() => store.state.menus);

// 实现侧边是否收缩和展开
const handleSelect = (e) => {
  router.push(e);
};

// 判断是否折叠
const isCollapse = computed(() => !(store.state.asideWidth == "250px"));
// console.log(route + "----" + route.path);
const defaultActive = ref(route.path);
</script>

<style>
.f-menu {
  /* width: 250px; */
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  @apply shadow-md fixed;
  transition: all 0.2s;
}

.f-menu::-webkit-scrollbar {
  width: 0px;
}
</style>
