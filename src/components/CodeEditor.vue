<template>
  <VAceEditor
    style="height: 300px"
    :lang="aceConfig.lang"
    :theme="aceConfig.theme"
    :options="aceConfig.options"
  ></VAceEditor>
</template>

<script setup lang="ts">
import { VAceEditor } from "vue3-ace-editor";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";
import { reactive } from "vue";

const aceConfig = reactive({
  theme: "ambiance",
  readOnly: false,
  lang: "c_cpp",
  options: {
    enableBasicAutocompletion: true, //启用基本自动完成
    enableSnippets: true, // 启用代码段
    enableLiveAutocompletion: true, // 启用实时自动完成
    fontSize: 16, //设置字号
    tabSize: 4, // 标签大小
    showPrintMargin: false, //去除编辑器里的竖线
    highlightActiveLine: true,
  },
});
</script>
