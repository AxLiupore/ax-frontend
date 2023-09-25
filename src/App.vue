<template>
  <BasicLayout />
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import useUserStore from "@/store/user";

const userStore = useUserStore();

const doInit = async () => {
  await userStore.getLoginUser();
};

onMounted(() => {
  doInit();
});
</script>

<style></style>
