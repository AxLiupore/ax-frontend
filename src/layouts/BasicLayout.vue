<template>
  <el-container>
    <el-header class="header">
      <GlobalHeader />
    </el-header>
    <el-main class="main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
import useUserStore from "@/store/user";
import CodeEditor from "@/components/CodeEditor.vue";

const userStore = useUserStore();
</script>
<style>
.header {
  margin-bottom: 10px;
  box-shadow: #9f9b9b 1px 1px 1px;
  padding: 0px;
}

el-main main {
  padding: 0px;
}
</style>
