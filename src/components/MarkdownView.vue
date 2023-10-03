<template>
  <MdPreview
    :modelValue="content"
    class="markdownView"
    :preview-theme="state.theme"
  />
</template>

<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import { withDefaults, defineProps, reactive } from "vue";

interface Props {
  content: string;
}

const state = reactive({
  content: "",
  theme: "vuepress",
});

const props = withDefaults(defineProps<Props>(), {
  content: () => "",
});
</script>
<style>
#md-editor-v3-preview-wrapper {
  padding: 0px 2px;
  margin-bottom: 3px;
  margin-top: -15px;
}

#md-editor-v3-preview {
  margin-top: 0;
}
</style>
