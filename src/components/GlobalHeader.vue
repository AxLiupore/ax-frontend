<template>
  <div id="GlobalHeader">
    <a-row align="center" :wrap="false" style="padding: 0">
      <a-col flex="300px"></a-col>
      <a-col flex="20px">
        <a-link class="title" :to="{ name: 'home' }"> AxCode</a-link>
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
      <a-col v-if="true" flex="450px">
        <a-button @click="handleClick" style="box-shadow: none">注册</a-button>
        <a-modal
          v-model:visible="visible"
          title="注册"
          @cancel="handleCancel"
          @before-ok="handleBeforeOk"
        >
          <a-form :model="form">
            <a-form-item field="account" label="用户名">
              <a-input v-model="form.account" />
            </a-form-item>
            <a-form-item field="password" label="密码">
              <a-input v-model="form.password" />
            </a-form-item>
            <a-form-item field="checkPassword" label="确认密码">
              <a-input v-model="form.checkPassword" />
            </a-form-item>
          </a-form>
        </a-modal>
      </a-col>
      <a-col v-else flex="450px">
        <a-dropdown position="bottom" trigger="hover">
          <a-avatar :size="35">
            <IconUser />
          </a-avatar>
          <template #content>
            <a-doption>
              <template #icon>
                <icon-home />
              </template>
              我的空间
            </a-doption>
            <a-doption>
              <template #icon>
                <icon-idcard />
              </template>
              个人信息
            </a-doption>
            <a-doption>
              <template #icon>
                <icon-poweroff />
              </template>
              退出
            </a-doption>
          </template>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, ref, reactive } from "vue";
import { routes } from "@/router/routes";

const visible = ref(false);
const form = reactive({
  account: "",
  password: "",
  checkPassword: "",
});

const handleClick = () => {
  visible.value = true;
};

const handleBeforeOk = () => {
  console.log(form);
  window.setTimeout(() => {
    // prevent close
    // done(false)
  }, 3000);
};
const handleCancel = () => {
  visible.value = false;
};

// 获取当前路由对象实例，用于执行编程式导航
const router = useRouter();

// 用于获取激活路由的路由信息对象：路由路径、查询参数、路由参数
const route = useRoute();

// 这个是用于高亮显示菜单栏的下划线
const selectedKeys = ref(["/"]);

const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.requestAuth) {
      return false;
    }
    return true;
  });
});

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
</script>
<style scoped>
#GlobalHeader {
}

.title {
  margin-left: 16px;
  text-decoration: none;
  color: black;
}
</style>
