<template>
  <el-row>
    <el-col :span="7">
      <div class="grid-content ep-bg-purple-dark" />
    </el-col>
    <el-col :span="10">
      <el-card
        v-if="loginUser.role !== ACCESS_ENUM.NOT_LOGIN"
        style="margin-top: 10px"
      >
        <el-row>
          <el-col :span="1"></el-col>
          <el-col :span="2">
            <el-avatar :src="loginUser.avatar" />
          </el-col>
          <el-col :span="20">
            <el-button
              type="info"
              :icon="Message"
              plain
              style="width: 100%; margin: 6px"
              @click="dialogVisible = true"
              ><span
                >{{ loginUser.username }} 请输入你想发表的评论
              </span></el-button
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
        v-for="(discussion, index) in discussionList"
        :key="index"
        style="margin-top: 10px"
      >
        <el-row style="display: flex; justify-content: space-between">
          <div style="display: flex; margin-right: auto">
            <el-col>
              <span>讨论</span>
            </el-col>
          </div>
          <div style="display: flex; margin-left: auto">
            <el-col>
              <span>{{ discussion.title }}</span>
            </el-col>
          </div>
        </el-row>
        <el-divider style="margin-bottom: 8px; margin-top: 8px" />
        <el-row>
          <el-col :span="2">
            <el-avatar :src="discussion.avatar" />
          </el-col>
          <el-col :span="19" style="padding-top: 8px"
            ><span>{{ discussion.author }}</span></el-col
          >
          <el-col :span="3" style="padding-top: 6px"
            ><span>{{ moment(discussion.createTime).fromNow() }} </span></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="1"></el-col>
          <el-col :span="22">
            <markdown-view
              :content="
                discussion.showPartContent
                  ? discussion.content
                  : discussion.truncatedContent
              "
              style="margin-bottom: 0"
            />
          </el-col>
          <el-col :span="1"></el-col>
          <el-button
            v-if="discussion.shouldShowButton"
            @click="toggleContentVisibility(discussion)"
            style="background-color: rgba(0, 0, 0, 0); border: 0"
          >
            <span> {{ discussion.showPartContent ? "收起" : "展开" }}</span>
            <el-icon>
              <ArrowUp v-if="discussion.showPartContent" />
              <ArrowDown v-else />
            </el-icon>
          </el-button>
        </el-row>
        <el-divider style="margin-top: 4px; margin-bottom: 2px" />
        <el-row>
          <el-col :span="3"></el-col>
          <el-col :span="3">
            <el-button style="background-color: rgba(0, 0, 0, 0); border: 0">
              <el-icon size="18">
                <Check />
              </el-icon>
              <span>点赞</span>
            </el-button>
          </el-col>
          <el-col :span="4"></el-col>
          <el-col :span="4">
            <el-button style="background-color: rgba(0, 0, 0, 0); border: 0">
              <el-icon size="18">
                <ChatRound />
              </el-icon>
              <span>评论</span>
            </el-button>
          </el-col>
          <el-col :span="3"></el-col>
          <el-col :span="4">
            <el-button style="background-color: rgba(0, 0, 0, 0); border: 0">
              <el-icon size="18">
                <Star />
              </el-icon>
              <span>收藏</span>
            </el-button>
          </el-col>
          <el-col :span="3"></el-col>
        </el-row>
        <el-divider style="margin-top: 2px; margin-bottom: 0" />
      </el-card>
      <el-card style="margin-top: 10px" v-if="loading"></el-card>
    </el-col>
    <el-col :span="7">
      <div class="grid-content ep-bg-purple-dark" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import {
  DiscussionAddRequest,
  DiscussionControllerService,
  DiscussionQueryRequest,
  DiscussionVO,
} from "../../generated";
import Message from "@arco-design/web-vue/es/message";
import useUserStore from "@/store/user";
import MarkdownEditor from "@/components/MarkdownEditor.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import MarkdownView from "@/components/MarkdownView.vue";
import {
  ArrowDown,
  ArrowUp,
  ChatRound,
  Check,
  Star,
  VideoPlay,
} from "@element-plus/icons-vue";
import moment from "moment";
import "moment/locale/zh-cn";

// 设置 Moment.js 的本地化语言为中文
moment.locale("zh-cn");

// 最大行数
const MAX_LINES = 10;

interface DiscussionVOWithShowPartContent extends DiscussionVO {
  showPartContent: boolean;
  truncatedContent: string;
  shouldShowButton: boolean;
}

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

/**
 * 用户信息相关的
 */
const userStore = useUserStore();

let loginUser = ref({});

const loadData = async () => {
  await userStore.getLoginUser();
  loginUser.value = userStore.loginUser;
};

/**
 * 获取帖子相关
 */
// 存储帖子相关的
const discussionList = ref<DiscussionVOWithShowPartContent[]>([]);

const toggleContentVisibility = (
  discussion: DiscussionVOWithShowPartContent
) => {
  discussion.showPartContent = !discussion.showPartContent;
};

const loading = ref(false);

const downloadData = reactive<DiscussionQueryRequest>({
  current: 1,
  pageSize: 10,
  searchText: "",
});

/**
 * 向后端请求数据
 */
const loadDownload = async () => {
  const res = await DiscussionControllerService.queryAllDiscussionUsingPost(
    downloadData
  );
  if (res.code === 0) {
    discussionList.value = discussionList.value.concat(res.data.records);
    loading.value = false;
    // 每次执行完之后加一
    if (downloadData.current !== undefined) {
      downloadData.current++;
    }
    discussionList.value.forEach((discussion) => {
      const lines = discussion.content.split("\n");
      discussion.truncatedContent = lines.slice(0, MAX_LINES).join("\n");
      discussion.showPartContent = lines.length <= MAX_LINES;
      discussion.shouldShowButton = lines.length > MAX_LINES;
    });
  } else {
    Message.error(res.message);
  }
};

/**
 * 页面加载时执行的函数
 */
onMounted(() => {
  loadData();
  loadDownload();
});
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
</style>
