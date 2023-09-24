<template>
  <MdPreview :modelValue="content"></MdPreview>
</template>

<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import { ref, withDefaults, defineProps } from "vue";

interface Props {
  content: string;
}

const props = withDefaults(defineProps<Props>(), {
  content: () => "",
});
</script>
