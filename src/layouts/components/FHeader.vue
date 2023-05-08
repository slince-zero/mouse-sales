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
            <refresh @click="handleRefresh"></refresh>
        </el-icon>

        <div class="ml-auto flex items-center">
            <el-icon class="icon-btn">
                <full-screen @click="toggle" v-if="!isFullscreen"></full-screen>
                <SwitchFilled v-else />
            </el-icon>
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar"></el-avatar>
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>

import { showModal, toast } from "~/composables/util";
import { logout } from "~/api/manager";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
const router = useRouter();
const store = useStore();
//退出功能
const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout();
            break;
        case "rePassword":
            console.log(12);
        default:
            break;
    }
}

function handleLogout() {
    showModal("是否要退出登录").then((res) => {
        logout().finally(() => {
            store.dispatch("logout");
            // 跳转回登录页面
            router.push("/login");
            // 提示退出成功
            toast("退出成功");
        });
    });
}


// 刷新页面功能
function handleRefresh() {
    location.reload()
}
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
    cursor: pointer;
    @apply flex justify-center ieems-center mx-5 border-style: none;
    height: 60px;
}

.f-header .dropdown:hover {
    @apply bg-indigo-500;
    background: none;
}
</style>