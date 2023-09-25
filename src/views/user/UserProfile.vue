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
                  <el-radio-group>
                    <el-radio v-if="form.gender === '男'" border>男</el-radio>
                    <el-radio v-else border>女</el-radio>
                  </el-radio-group>
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
import { useStore } from "vuex";
import { LoginUserVO, UserInfoControllerService } from "../../../generated";
import { computed, onMounted, reactive, ref } from "vue";
import Message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const store = useStore();

const router = useRouter();

const loginUser: LoginUserVO = computed(
  () => store.state.user?.loginUser
) as LoginUserVO;
console.log(loginUser.username);
console.log(loginUser.avatar);
const form = reactive({
  username: "",
  avatar: "",
  email: "",
  phone: "",
  profile: "",
  gender: "",
});

onMounted(async () => {
  form.username = loginUser.username as string;
  form.avatar = loginUser.avatar as string;
  form.email = loginUser.email as string;
  form.phone = loginUser.phone as string;
  form.profile = loginUser.profile as string;
  form.gender = loginUser.gender as string;
});

const updateLoginUser = async () => {
  console.log(form);
  const res = await UserInfoControllerService.updateLoginUserUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    Message.success("更新成功");
    router.go(0);
  } else {
    Message.error(res.message);
  }
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
