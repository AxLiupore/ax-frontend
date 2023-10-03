<template>
  <el-row>
    <el-col :span="4">
      <div class="grid-content ep-bg-purple-dark" />
    </el-col>
    <el-col :span="16">
      <el-card shadow="always">
        <el-row style="font-family: 'Lora', serif; font-size: 18px">
          <h2>{{ problem.problemId }}. {{ problem.title }}</h2>
        </el-row>
        <el-tabs type="card" class="demo-tabs">
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <el-icon size="20px"><calendar /></el-icon>
                <span>题目</span>
              </span>
            </template>
            <el-row>
              <el-col :span="18">
                <el-row>
                  <MarkdownView :content="problem.content" />
                </el-row>
                <el-row>
                  <strong>输入格式</strong>
                  <MarkdownView :content="problem.input" />
                </el-row>
                <el-row>
                  <strong>输出格式</strong>
                  <MarkdownView :content="problem.output" />
                </el-row>
                <el-row>
                  <strong>数据范围</strong>
                  <MarkdownView :content="problem.scope" />
                </el-row>
                <el-row>
                  <strong>样例输入</strong>
                  <MarkdownView :content="problem.exampleInput" />
                </el-row>
                <el-row>
                  <strong>样例输出</strong>
                  <MarkdownView :content="problem.exampleOutput" />
                </el-row>
              </el-col>
              <el-col :span="6">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>
                        难度
                        <span style="float: right">
                          <template v-if="problem.difficulty === 0">
                            <el-tag
                              class="tag"
                              type="success"
                              effect="light"
                              round
                              >简单
                            </el-tag>
                          </template>
                          <template v-else-if="problem.difficulty === 1">
                            <el-tag class="tag" effect="light" round
                              >中等</el-tag
                            >
                          </template>
                          <template v-else>
                            <el-tag
                              class="tag"
                              type="danger"
                              effect="light"
                              round
                              >困难
                            </el-tag>
                          </template>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        时间/内存限制
                        <span style="float: right">
                          {{ problem.timeLimit }}s/{{
                            problem.memoryLimit
                          }}mb</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        总通过数
                        <span style="float: right">{{
                          problem.acceptNum
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        总尝试数
                        <span style="float: right">{{
                          problem.submitNum
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        来源
                        <span style="float: right">{{ problem.source }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        标签
                        <span style="float: right">
                          <el-tag
                            v-for="(tag, index) of problem.tags"
                            :key="index"
                            class="tag"
                            type="info"
                            effect="light"
                            round
                          >
                            {{ tag }}
                          </el-tag>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-col>
            </el-row>
            <el-divider />
            <div class="box">
              <el-row style="">
                <el-col :span="16"></el-col>
                <el-col :span="5" style="margin: 0">
                  <el-select class="m-2" placeholder="C++" size="large">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      style="font-size: 16px"
                    />
                  </el-select>
                </el-col>
                <el-col :span="3">
                  <el-button class="setting">
                    <el-icon size="24">
                      <RefreshLeft />
                    </el-icon>
                  </el-button>
                  <el-button class="setting">
                    <el-icon size="24">
                      <Setting />
                    </el-icon>
                  </el-button>
                </el-col>
              </el-row>
            </div>
            <div class="code">
              <CodeEditor :handleChange="onChangeCode" />
            </div>
            <el-row style="margin-top: 20px" type="flex" justify="end">
              <el-button style="margin-right: 10px" type="primary" plain>
                <el-icon size="20px">
                  <VideoPlay />
                </el-icon>
                <span>调试代码</span>
              </el-button>
              <el-button style="margin-right: 20px" type="success" plain>
                <el-icon size="20px">
                  <CircleCheck />
                </el-icon>
                <span> 提交代码 </span>
              </el-button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <el-icon size="20px"><DocumentCopy /></el-icon>
                <span>提交记录</span>
              </span>
            </template>
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <el-icon size="20px"><ChatSquare /></el-icon>
                <span>讨论</span>
              </span>
            </template>
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <el-icon size="20px"><Memo /></el-icon>
                <span>题解</span>
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
    <el-col :span="4">
      <div class="grid-content ep-bg-purple-dark" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { ProblemControllerService, ProblemVO } from "../../../generated";
import Message from "@arco-design/web-vue/es/message";
import MarkdownView from "@/components/MarkdownView.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import {
  Calendar,
  ChatSquare,
  CircleCheck,
  DocumentCopy,
  Memo,
  RefreshLeft,
  Setting,
  VideoPlay,
} from "@element-plus/icons-vue";

const route = useRoute();

const problem = ref<ProblemVO>({});

const problemId = ref(route.params.id as string);

const loadData = async () => {
  const res = await ProblemControllerService.getProblemUsingPost({
    problemId: parseInt(problemId.value),
  });
  if (res.code === 0) {
    problem.value = res.data;
  } else {
    Message.error("获取题目失败");
  }
};
onMounted(() => {
  loadData();
});

// 用于接受代码编辑器所传过来的代码
const code = reactive({
  text: "",
});

const onChangeCode = (value: string) => {
  code.text = value;
};

const options = [
  {
    value: "c_cpp",
    label: "C++",
  },
];
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
