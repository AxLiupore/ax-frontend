<template>
  <div id="UserProfile">
    <el-row :gutter="12" style="margin-top: 10px">
      <el-col :span="7">
        <el-row type="flex" justify="center">
          <el-avatar
            :size="60"
            :src="loginUser.avatar"
            style="margin-bottom: 10px"
          />
        </el-row>
        <el-card shadow="always"></el-card>
      </el-col>
      <el-col :span="17">
        <el-card shadow="always">
          <el-row type="flex" justify="center">
            <el-avatar
              :size="100"
              :src="loginUser.avatar"
              style="margin-bottom: 20px"
            />
          </el-row>
          <el-form :model="form" :label-position="'top'">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="昵称">
                  <el-input v-model="form.username" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别">
                  <el-row>
                    <el-radio-group v-model="radio">
                      <el-radio label="1" @change="changeMan" border
                        >男
                      </el-radio>
                      <el-radio label="2" @change="changeWoman" border
                        >女
                      </el-radio>
                    </el-radio-group>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="电话">
                  <el-input v-model="form.phone" placeholder="请输入电话" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱">
                  <el-input v-model="form.email" placeholder="请输入邮箱" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-form :model="form" :label-position="'top'">
            <el-form-item label="个人简介">
              <el-input
                v-model="form.profile"
                :rows="3"
                type="textarea"
                placeholder="关于你的个性、爱好、兴趣等等..."
              />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-button type="primary" class="primary" @click="updateLoginUser"
      >保存
    </el-button>
  </div>
</template>
<script setup lang="ts">
import {
  LoginUserVO,
  UserInfoControllerService,
  UserUpdateRequest,
} from "../../../generated";
import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
import Message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import useUserStore from "@/store/user";

const userStore = useUserStore();

const radio = ref("");

const loginUser: LoginUserVO = computed(
  () => userStore.loginUser
) as LoginUserVO;

const form = reactive({
  username: "",
  avatar: "",
  email: "",
  gender: "",
  phone: "",
  profile: "",
} as UserUpdateRequest);

const loadData = async () => {
  const res = await UserInfoControllerService.getLoginUserUsingGet();
  if (res.code === 0) {
    form.username = userStore.loginUser.username;
    form.avatar = userStore.loginUser.avatar;
    form.email = userStore.loginUser.email;
    form.gender = userStore.loginUser.gender;
    form.phone = userStore.loginUser.phone;
    form.profile = userStore.loginUser.profile;
    radio.value = userStore.loginUser.gender === "男" ? "1" : "2";
  } else {
    Message.error("获取数据失败");
  }
};

watchEffect(() => {
  loadData();
});

/**
 * 页面加载时请求数据
 */
onMounted(() => {
  loadData();
});

watch(loginUser, (newLoginUser) => {
  if (newLoginUser.gender === "男") {
    radio.value = "1";
  } else {
    radio.value = "2";
  }
});

const updateLoginUser = async () => {
  const res = await UserInfoControllerService.updateLoginUserUsingPost(form);
  if (res.code === 0) {
    await userStore.getLoginUser();
    await userStore.getLoginUser();
    Message.success("更新成功");
  } else {
    Message.error(res.message);
  }
};

const changeMan = () => {
  form.gender = "男";
};

const changeWoman = () => {
  form.gender = "女";
};
</script>

<style scoped>
#UserProfile {
  margin: 0 17vw;
  padding: 0;
}

.primary {
  float: right;
  margin-top: 10px;
}
</style>
