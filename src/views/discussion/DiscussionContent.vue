<template>
  <el-row>
    <el-col :span="7">
      <div class="grid-content ep-bg-purple-dark" />
    </el-col>
    <el-col :span="10">
      <el-card shadow="always">
        <el-row
          style="font-family: 'Lora', serif; font-size: 12px; margin-bottom: 0"
          align="middle"
          justify="start"
        >
          <el-col :span="2">
            <el-avatar :src="discussion.avatar" />
          </el-col>
          <el-col :span="2">
            <h6 style="margin: 0 auto">{{ discussion.author }}</h6>
          </el-col>
          <el-col :span="11"
            ><h4 style="margin: 0 auto">{{ discussion.title }}</h4></el-col
          >
          <el-col :span="5">
            <el-icon size="24px" class="titleButton">
              <Star />
            </el-icon>
            <el-icon size="24px" class="titleButton">
              <Edit />
            </el-icon>
            <el-icon size="24px" class="titleButton">
              <StarFilled />
            </el-icon>
            <el-icon size="24px" class="titleButton">
              <Check />
            </el-icon>
          </el-col>
          <el-col :span="4">
            <el-button style="margin-right: 20px" type="success" plain>
              <el-icon size="20px">
                <CircleCheck />
              </el-icon>
              <span> 关注 TA </span>
            </el-button>
          </el-col>
        </el-row>
        <el-divider style="margin: 14px auto" />
        <el-row>
          <MarkdownView :content="discussion.content" />
        </el-row>
      </el-card>
      <el-card style="margin-top: 10px">
        <el-row>
          <el-col :span="2">
            <el-avatar :src="discussion.avatar" />
          </el-col>
          <el-col :span="21">
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
} from "../../../generated";
import Message from "@arco-design/web-vue/es/message";
import {
  Check,
  CircleCheck,
  Edit,
  Star,
  StarFilled,
} from "@element-plus/icons-vue";
import MarkdownView from "@/components/MarkdownView.vue";
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

const loadData = async () => {
  const res = await DiscussionControllerService.queryOneDiscussionUsingPost({
    discussionId: parseInt(discussionId.value),
  });
  if (res.code === 0) {
    discussion.value = res.data;
  } else {
    Message.error("获取讨论失败");
  }
};
onMounted(() => {
  loadData();
});

const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

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
