<template>
  <BasicLayout />
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const doInit = async () => {
  await store.dispatch("user/getLoginUser");
};

onMounted(() => {
  doInit();
});
</script>

<style></style>
