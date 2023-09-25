<template>
  <div id="UserSpace">
    <el-avatar :size="60" :src="loginUser.avatar" class="avatar" />
    <el-row :gutter="12" style="margin-top: 10px">
      <el-col :span="7">
        <el-card shadow="always"></el-card>
      </el-col>
      <el-col :span="17">
        <el-card shadow="always">{{ loginUser.profile }}</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { LoginUserVO } from "../../../generated";
import { computed } from "vue";
import useUserStore from "@/store/user";

const userStore = useUserStore();

const loginUser: LoginUserVO = computed(
  () => userStore.loginUser
) as LoginUserVO;
</script>

<style scoped>
#UserSpace {
  margin: 0 17vw;
  padding: 0;
}
</style>
