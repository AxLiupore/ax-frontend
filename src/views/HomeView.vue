<template>
  <el-row>
    <el-col :span="7">
      <div class="grid-content ep-bg-purple-dark" />
    </el-col>
    <el-col :span="10">
      <el-card style="margin-top: 10px">
        <el-row>
          <el-col :span="1"></el-col>
          <el-col :span="20">
            <el-button
              type="info"
              :icon="Message"
              plain
              style="width: 100%; margin: 6px"
              @click="dialogVisible = true"
              ><span
                >{{ userLogin.username }} 请输入你想发表的评论</span
              ></el-button
            >
          </el-col>
          <el-dialog
            v-model="dialogVisible"
            width="60%"
            center
            style="
              border-radius: 10px; /* 设置弹出框的边角为圆角，使其看起来像卡片 */
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 添加阴影效果，增加立体感 */
              padding: 10px; /* 设置内边距，使内容与边框有一定间隔 */
              background-color: #fff; /* 设置背景颜色为白色 */
            "
          >
            <template #title>
              <h4>创建帖子</h4>
            </template>
            <template #default>
              <el-row>
                <el-input v-model="form.title" placeholder="请输入标题" />
                <MarkdownEditor :handle-change="onChange" />
              </el-row>
              <el-row style="margin-top: 20px">
                <el-button type="success" style="width: 100%" @click="onPublish"
                  >发表
                </el-button>
              </el-row>
            </template>
          </el-dialog>
        </el-row>
      </el-card>
      <el-card
        shadow=" always
            "
        style="margin-top: 10px"
        v-for="(item, index) in items"
        :key="index"
      >
        {{ item }}
      </el-card>
    </el-col>
    <el-col :span="7">
      <div class="grid-content ep-bg-purple-dark" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import {
  DiscussionAddRequest,
  DiscussionControllerService,
  DiscussionVO,
} from "../../generated";
import Message from "@arco-design/web-vue/es/message";
import useUserStore from "@/store/user";
import MarkdownEditor from "@/components/MarkdownEditor.vue";

const route = useRoute();

const discussion = ref<DiscussionVO>({});

const discussionId = ref(route.params.id as string);

const userStore = useUserStore();

const userLogin = userStore.loginUser;

const form = reactive<DiscussionAddRequest>({
  title: "",
  content: "",
  tags: [],
});

const onChange = (value: string) => {
  form.content = value;
};

const dialogVisible = ref(false);

const onPublish = async () => {
  const res = await DiscussionControllerService.addDiscussionUsingPost(form);
  if (res.code === 0) {
    Message.success("发表成功");
    dialogVisible.value = false;
  } else {
    Message.error(res.message);
  }
};
</script>

<style scoped>
strong {
  font-size: 17px;
  font-family: "Lora", serif;
  padding: 0 0;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
  font-size: 18px;
  font-family: "Lora", serif;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.titleButton {
  margin-left: 2px;
}
</style>
