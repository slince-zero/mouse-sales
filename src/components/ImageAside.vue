<!-- 抽离图库模块aside -->
<template>
  <el-aside style="width: 220px" class="image-aside" v-loading="loading">
    <!-- Aside -->
    <div class="top">
      <AsideList
        :actived="activeId == item.id"
        v-for="(item, index) in list"
        :key="index"
        >{{ item.name }}</AsideList
      >
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev,  next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-aside>
</template>
<script setup>
import { ref } from "vue";
import AsideList from "~/components/AsideList.vue";
import { getImageClassList } from "~/api/image_class.js";

// 加载动画
const loading = ref(false);
// 数据列表
const list = ref([]);
const activeId = ref(0);

// 分页--当前页
const currentPage = ref(1);
// 分页--总页
const total = ref(0);
// 分页--每页显示多少条数据
const limit = ref(10);

// 获取列表数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getImageClassList(currentPage.value)
    .then((res) => {
      total.value = res.totalCount;
      list.value = res.list;
      let item = list.value[0];
      if (item) {
        activeId.value = item.id;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
getData();
</script>
<style>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}
.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>
