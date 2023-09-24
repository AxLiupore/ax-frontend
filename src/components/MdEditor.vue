<template>
  <v-md-editor v-model="value" :autofocus="true" height="300px"></v-md-editor>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from "vue";

const value = ref("");

// 监听value是否发生变化
watch(value, (newValue, oldValue) => {
  sendDataToParent();
});

// handleChange表明父组件通过传递到哪里进行数据的传递
const props = defineProps(["handleChange"]);

const sendDataToParent = () => {
  props.handleChange(value.value);
};
</script>

<style scoped></style>
