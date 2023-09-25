<template>
  <div id="UserProfile">
    <el-row :gutter="12" style="margin-top: 10px">
      <el-col :span="7">
        <el-avatar
          :size="60"
          :src="loginUser.avatar"
          style="margin-bottom: 10px"
        />
        <el-card shadow="always"></el-card>
      </el-col>

      <el-col :span="17">
        <el-card shadow="always">
          <el-avatar
            :size="100"
            :src="loginUser.avatar"
            style="margin-bottom: 20px"
          />
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
import { computed, onMounted, reactive, ref, watch } from "vue";
import Message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import useUserStore from "@/store/user";

const userStore = useUserStore();

const router = useRouter();

const radio = ref("");

const loginUser: LoginUserVO = computed(
  () => userStore.loginUser
) as LoginUserVO;

const form = reactive({
  username: userStore.loginUser.username,
  avatar: userStore.loginUser.avatar,
  email: userStore.loginUser.email,
  gender: userStore.loginUser.gender,
  phone: userStore.loginUser.phone,
  profile: userStore.loginUser.profile,
} as UserUpdateRequest);

watch(loginUser, (newLoginUser) => {
  form.username = newLoginUser.username as string;
  form.avatar = newLoginUser.avatar as string;
  form.email = newLoginUser.email as string;
  form.phone = newLoginUser.phone as string;
  form.gender = newLoginUser.gender as string;
  form.profile = newLoginUser.profile as string;
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
    Message.success("更新成功");
    location.reload();
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
