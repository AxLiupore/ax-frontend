import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";

import "@/plugins/axios";

import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";

// 引入所有语言包
import hljs from "highlight.js";

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App);

app.use(ArcoVue);
app.use(VueMarkdownEditor);
app.use(VMdPreview);
app.use(store);
app.use(router);
app.use(ArcoVueIcon);
app.mount("#app");
