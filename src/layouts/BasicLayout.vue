<template>
  <a-layout style="height: 400px">
    <a-layout-header class="header">
      <GlobalHeader />
      <!--      <MdEditor />-->
      <!--      <MdView />-->
    </a-layout-header>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
import MdEditor from "@/components/MdEditor.vue";
import MdView from "@/components/MdView.vue";
</script>
<style>
.header {
  margin-bottom: 10px;
  box-shadow: #9f9b9b 1px 1px 5px;
}
</style>
