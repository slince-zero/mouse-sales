<template>
    <div class="f-header">
        <span class="logo">
            <el-icon class="mr-2"><eleme-filled></eleme-filled></el-icon>
            小鼠销售
        </span>
        <el-icon class="icon-btn">
            <fold></fold>
        </el-icon>
        <el-icon class="icon-btn">
            <refresh></refresh>
        </el-icon>
        <div class="ml-auto flex items-center">
            <el-icon class="icon-btn"><full-screen></full-screen></el-icon>
            <el-dropdown class="dropdown">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar"></el-avatar>
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
</script>

<style >
.f-header {
    @apply flex items-center bg-indigo-600 text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
}

.logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;

}

.icon-btn:hover {
    @apply bg-indigo-500;
}

.f-header .dropdown {
    height: 62px;
    cursor: pointer;
    @apply flex justify-center ieems-center mx-5;
}
</style>