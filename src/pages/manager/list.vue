<template>
  <el-card shadow="never" class="border-0">
    <!-- 搜索 -->
    <el-form :model="searchForm" label-width="80px" class="mb-3">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="关键词">
            <el-input
              v-model="searchForm.keyword"
              placeholder="管理员昵称"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <el-form-item>
            <el-button type="primary" @click="getData">搜索</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 新增、刷新 -->
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" size="small" @click="handleCreate"
        >新增</el-button
      >
      <el-tooltip effect="dark" content="刷新数据" placement="top-start">
        <el-button text @click="getData">
          <el-icon :size="20">
            <Refresh />
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="管理员" width="200">
        <template #default="{ row }">
          <div class="flex items-center">
            <el-avatar :size="40" :src="row.avator">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <div class="ml-3">
              <h6>{{ row.username }}</h6>
              <small>ID:{{ row.id }}</small>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属管理员" align="center">
        <template #default="{ row }">
          {{ row.role?.name || "-" }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-switch
            :modelValue="row.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            text
            @click="handleEdit(scope.row)"
            >修改</el-button
          >
          <el-popconfirm
            title="是否要删除该管理员?"
            confirmButtonText="确认"
            cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" text>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="flex justify-center items-center mt-5">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>

    <!-- 新增数据的框框 -->
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            v-model="form.content"
            placeholder="公告内容"
            type="textarea"
            :rows="5"
          ></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  getNoticeList,
  createNotice,
  updateNotice,
  deleteNotice,
} from "~/api/notice.js";

import { getManagerList } from "~/api/manager";
import { toast } from "~/composables/util";
import FormDrawer from "~/layouts/components/FormDrawer.vue";
const searchForm = reactive({
  keyword: "",
});
const resetSearchForm = () => {
  searchForm.keyword = "";
  getData();
};
const tableData = ref([]);
const loading = ref(false);
const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));
// 分页--当前页
const currentPage = ref(1);
// 分页--总页
const total = ref(0);
// 分页--每页显示多少条数据
const limit = ref(10);

// 获取数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getManagerList(currentPage.value, searchForm)
    .then((res) => {
      tableData.value = res.list;
      total.value = res.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

getData();

// 重置表单
function restForm(row = false) {
  if (formRef.value) formRef.value.clearValidate();
  if (row) {
    for (const key in form) {
      form[key] = row[key];
    }
  }
}

// 删除一条数据
const handleDelete = (id) => {
  console.log(id);
  deleteNotice(id).then((res) => {
    toast("删除成功");
    getData();
  });
};

// 新增
const formRef = ref();
const form = reactive({
  title: "",
  content: "",
});
const rules = {
  title: [{ required: true, message: "公告名称不能为空", trigger: "blur" }],
  content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
};
const formDrawerRef = ref();
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;
    const fun = editId.value
      ? updateNotice(editId.value, form)
      : createNotice(form);
    fun.then((res) => {
      toast(drawerTitle.value + "成功");
      // 修改刷新当前页，新增刷新第一页
      getData(editId.value ? false : 1);
      formDrawerRef.value.close();
    });
  });
};

const handleCreate = () => {
  editId.value = 0;
  restForm({
    title: "",
    content: "",
  });
  formDrawerRef.value.open();
};

// 更新数据
const handleEdit = (row) => {
  editId.value = row.id;
  restForm(row);
  formDrawerRef.value.open();
};
</script>
