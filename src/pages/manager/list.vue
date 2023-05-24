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
      <el-table-column label="所属角色" align="center">
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
            :disabled="row.super == 1"
            @change="handleStatusChange($event, row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <small v-if="scope.row.super == 1" class="text-sm text-gray-500"
            >暂无操作</small
          >
          <div v-else>
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
          </div>
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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item label="头像" prop="avator">
          <el-input v-model="form.avator" placeholder="头像"></el-input>
        </el-form-item>

        <el-form-item label="所属角色" prop="role_id">
          <el-select v-model="form.role_id" palceholder="选择所属角色">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

import {
  getManagerList,
  updateManagerStatus,
  createManager,
  updateManager,
  deleteManager,
} from "~/api/manager";
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

// 新增一条信息时候拿到列表下拉菜单的数据
const roles = ref([]);

// 获取数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getManagerList(currentPage.value, searchForm)
    .then((res) => {
      console.log(res);
      tableData.value = res.list;
      total.value = res.totalCount;
      roles.value = res.roles;
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
  deleteManager(id).then((res) => {
    toast("删除成功");
    getData();
  });
};

// 新增
const formRef = ref();
const form = reactive({
  username: "",
  password: "",
  role_id: null,
  status: 1,
  avator: "",
});
const rules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
};
const formDrawerRef = ref();
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;
    const fun = editId.value
      ? updateManager(editId.value, form)
      : createManager(form);
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
    username: "",
    password: "",
    role_id: null,
    status: 1,
    avator: "",
  });
  formDrawerRef.value.open();
};

// 更新数据
const handleEdit = (row) => {
  editId.value = row.id;
  restForm(row);
  formDrawerRef.value.open();
};

// 修改状态
const handleStatusChange = (status, row) => {
  updateManagerStatus(row.id, status).then((res) => {
    toast("修改状态成功");
    row.status = status;
  });
};
</script>
