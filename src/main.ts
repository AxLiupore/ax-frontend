import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";

import "@/plugins/axios";

import { MdEditor, MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import "md-editor-v3/lib/preview.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(ArcoVue);
app.use(store);
app.use(router);
app.use(ArcoVueIcon);
app.use(MdEditor);
app.use(MdPreview);
app.use(ElementPlus);
app.mount("#app");
