<template>
  <MdEditor v-model="content" />
</template>
<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import { ref, watch, defineProps } from "vue";

const content = ref("");

// 监听content的变化
watch(content, () => {
  sendContentToParent();
});

const props = defineProps(["handleChange"]);

const sendContentToParent = () => {
  props.handleChange(content.value);
};
</script>

<style>
.md-editor-toolbar-right > .md-editor-toolbar-item:last-child {
  display: none;
}
</style>
