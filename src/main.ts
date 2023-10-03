import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";

import "@/plugins/axios";

import { MdEditor, MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import "md-editor-v3/lib/preview.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { createPinia } from "pinia";

const app = createApp(App);

app.use(ArcoVue);
app.use(router);
app.use(ArcoVueIcon);
app.use(MdEditor);
app.use(MdPreview);
app.use(ElementPlus);
app.use(createPinia());
app.mount("#app");
