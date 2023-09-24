<template>
  <a-layout style="height: 400px">
    <a-layout-header class="header">
      <GlobalHeader />
    </a-layout-header>
    <a-layout-content class="content">
      <MdEditor :handleChange="onChange" />
      <!--      <CodeEditor />-->
      {{ markdownContent }}
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
import MdEditor from "@/components/MdEditor.vue";
import { ref } from "vue";

const markdownContent = ref("");

const onChange = (value: string) => {
  markdownContent.value = value;
};
</script>
<style>
.header {
  margin-bottom: 10px;
  box-shadow: #9f9b9b 1px 0px 1px;
}
</style>
