<template>
  <el-row>
    <el-col :span="4">
      <div class="grid-content ep-bg-purple-dark" />
    </el-col>
    <el-col :span="16">
      <el-card shadow="always"></el-card>
    </el-col>
    <el-col :span="4">
      <div class="grid-content ep-bg-purple-dark" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { DiscussionControllerService, DiscussionVO } from "../../../generated";
import Message from "@arco-design/web-vue/es/message";

const route = useRoute();

const discussion = ref<DiscussionVO>({});

const discussionId = ref(route.params.id as string);

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

.box {
  border-radius: 0;
  padding: 6px;
  border: 1px solid #d5d7d9;
  background-color: #f8f9fa;
}

.code {
  border: 1px solid #d5d7d9;
}

.setting {
  margin-left: 25px;
  padding: 5px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
}

.table {
  font-family: "Lora", serif;
  font-size: 14px;
}
</style>
