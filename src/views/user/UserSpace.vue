<template>
  <div id="UserSpace">
    <el-row>
      <el-avatar
        :size="60"
        :src="loginUser.avatar"
        class="avatar"
        style="margin-bottom: 10px"
      />
    </el-row>
    <el-row :gutter="12" style="margin-top: 10px">
      <el-col :span="7">
        <el-card shadow="always"></el-card>
      </el-col>
      <el-col :span="17">
        <el-row :gutter="14" style="margin-top: 0px">
          <el-col :span="12">
            <el-card shadow="always"> Hover</el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always"> Hover</el-card>
          </el-col>
        </el-row>
        <el-row :gutter="14" style="margin-top: 12px; margin-left: 0px">
          <el-card shadow="always"> Hover</el-card>
        </el-row>
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
