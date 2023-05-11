// 单独抽离修改密码
import { ref, reactive } from "vue";
import { logout, updatepassword } from "~/api/manager";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { showModal, toast } from "~/composables/util";

export function useRePassword() {
  const router = useRouter();
  const store = useStore();
  // 修改密码抽屉
  const formDrawerRef = ref();
  const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  });

  const loading = ref(false);
  //定义用户名和密码的规则验证
  const rules = {
    oldpassword: [
      { required: true, message: "旧密码不能为空", trigger: "blur" },
    ],
    password: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
    repassword: [
      { required: true, message: "确认密码不能为空", trigger: "blur" },
    ],
  };

  const formRef = ref();
  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;
      updatepassword(form)
        .then((res) => {
          toast("修改密码成功，请重新登录");
          store.dispatch("logout");
          // 跳转回登录页面
          router.push("/login");
        })
        .finally(() => {
          loading.value = false;
        });
    });
  };
  const openRePasswordFom = () => formDrawerRef.value.open();
  return {
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmit,
    openRePasswordFom,
  };
}

export function useLogout() {
  //退出功能
  const router = useRouter();
  const store = useStore();
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
  return {
    handleLogout,
  };
}
