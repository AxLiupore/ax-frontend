<template>
  <div id="GlobalHeader">
    <a-row align="center" :wrap="false" style="padding: 0">
      <a-col flex="300px"></a-col>
      <a-col flex="20px">
        <router-link class="title" :to="{ name: '首页' }"> AxCode</router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="350px" v-if="loginUser.role !== ACCESS_ENUM.NOT_LOGIN">
        <a-dropdown position="bottom" trigger="hover">
          <a-avatar :size="35">
            <img :src="loginUser.avatar" />
          </a-avatar>
          <template #content>
            <a-doption>
              <template #icon>
                <icon-home />
              </template>
              <a-anchor-link @click="accessSpace">我的空间</a-anchor-link>
            </a-doption>
            <a-doption>
              <template #icon>
                <icon-idcard />
              </template>
              <a-anchor-link @click="userProfile">个人信息</a-anchor-link>
            </a-doption>
            <a-doption>
              <template #icon>
                <icon-poweroff />
              </template>
              <a-anchor-link @click="logout">退出登录</a-anchor-link>
            </a-doption>
          </template>
        </a-dropdown>
      </a-col>
      <a-col v-else flex="470px">
        <a-button @click="handleClickRegister" style="box-shadow: none"
          >注册
        </a-button>
        <a-modal
          v-model:visible="visibleRegister"
          title="注册"
          @cancel="handleCancelRegister"
          @ok="handleBeforeOkRegister"
          ok-text="注册"
          cancel-text="取消"
          hide-cancel="true"
          width="27%"
          :onKeydown="onMountRegister"
        >
          <a-form :model="formRegister">
            <a-form-item field="account" label="用户名">
              <a-input v-model="formRegister.account" />
            </a-form-item>
            <a-form-item field="password" label="密码">
              <a-input-password v-model="formRegister.password" />
            </a-form-item>
            <a-form-item field="checkPassword" label="确认密码">
              <a-input-password v-model="formRegister.checkPassword" />
            </a-form-item>
          </a-form>
        </a-modal>
        <a-button
          @click="handleClickLogin"
          style="box-shadow: none; margin-left: 20px"
          >登录
        </a-button>
        <a-modal
          v-model:visible="visibleLogin"
          title="登录"
          @cancel="handleCancelLogin"
          @ok="handleBeforeOkLogin"
          hide-cancel="true"
          ok-text="登录"
          :onkeydown="onMountLogin"
          width="27%"
        >
          <a-form :model="formLogin">
            <a-form-item field="account" label="用户名">
              <a-input v-model="formLogin.account" />
            </a-form-item>
            <a-form-item field="password" label="密码">
              <a-input-password v-model="formLogin.password" />
            </a-form-item>
          </a-form>
        </a-modal>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, reactive, ref } from "vue";
import { routes } from "@/router/routes";
import ACCESS_ENUM from "@/access/accessEnum";
import {
  LoginUserVO,
  UserInfoControllerService,
  UserLoginRequest,
  UserRegisterRequest,
} from "../../generated";
import Message from "@arco-design/web-vue/es/message";
import useUserStore from "@/store/user";

// 获取当前路由对象实例，用于执行编程式导航
const router = useRouter();

const userStore = useUserStore();

// 这个是用于高亮显示菜单栏的下划线
const selectedKeys = ref(["/home"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from) => {
  selectedKeys.value = [to.path];
});

// 点击菜单做的处理
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const loginUser: LoginUserVO = computed(
  () => userStore.loginUser
) as LoginUserVO;

// 是否显示模态框
const visibleRegister = ref(false);
const visibleLogin = ref(false);

const handleClickRegister = () => {
  visibleRegister.value = true;
};

const handleClickLogin = () => {
  visibleLogin.value = true;
};

const handleCancelRegister = () => {
  visibleRegister.value = false;
};

const handleCancelLogin = () => {
  visibleLogin.value = false;
};

const onMountRegister = (event: any) => {
  if (event === "Enter" || event.keyCode === 13) {
    handleBeforeOkRegister();
  }
};

const onMountLogin = (event: any) => {
  if (event === "Enter" || event.keyCode === 13) {
    handleBeforeOkLogin();
  }
};

const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.requestAuth) {
      return false;
    }
    return true;
  });
});

// 登录用到的表单
const formLogin = reactive({
  account: "axliu",
  password: "12345678",
} as UserLoginRequest);

// 按下登录后的提交函数
const handleBeforeOkLogin = async () => {
  if ((formLogin.account?.length ?? 0) < 4) {
    Message.error("账号不能小于4位");
    return;
  }
  if ((formLogin.password?.length ?? 0) < 8) {
    Message.error("密码不能小于8位");
    return;
  }
  const res = await UserInfoControllerService.userLoginUsingPost(formLogin);
  if (res.code === 0) {
    await userStore.getLoginUser();
    await router.push({
      path: "/home",
      replace: true,
    });
  } else {
    Message.error(res.message);
  }
};

// 注册用到的表单
const formRegister = reactive({
  account: "",
  password: "",
  checkPassword: "",
} as UserRegisterRequest);

// 按下注册后的提交函数
const handleBeforeOkRegister = async () => {
  if ((formRegister.account?.length ?? 0) < 4) {
    Message.error("账号不能小于4位");
    return;
  }
  if (
    (formRegister.password?.length ?? 0) < 8 ||
    (formRegister.checkPassword?.length ?? 0) < 8
  ) {
    Message.error("密码不能小于8位");
    return;
  }
  if (!(formRegister.password === formRegister.checkPassword)) {
    Message.error("两次密码不一致");
    return;
  }
  // 拿到后端的响应
  const res = await UserInfoControllerService.userRegisterUsingPost(
    formRegister
  );
  // 注册成功后跳转到主页
  if (res.code === 0) {
    // 获取到用户信息再跳转到主页
    await userStore.getLoginUser();
    Message.success("注册成功");
    await router.push({
      path: "/home",
      replace: true,
    });
    router.go(0);
  } else {
    Message.error("注册失败：", res.message);
  }
};

const logout = async () => {
  UserInfoControllerService.userLogoutUsingPost();
  await router.push({
    path: "/",
    replace: true,
  });
  location.reload();
};

const accessSpace = async () => {
  await router.push({
    path: "/user/myspace/",
    replace: false,
  });
};

const userProfile = async () => {
  await router.push({
    path: "/user/profile",
    replace: false,
  });
};
</script>
<style>
#GlobalHeader {
}

.title {
  margin-left: 16px;
  text-decoration: none;
  color: black;
}
</style>
