<template>
  <el-row>
    <el-col :span="4">
      <div class="grid-content ep-bg-purple-dark" />
    </el-col>
    <el-col :span="16">
      <el-card shadow="always">
        <el-row>
          <el-col :span="24">
            <h1 class="CodeNow">CodeNow题库</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="12">
            <el-row :gutter="5">
              <el-col :span="22">
                <el-input
                  v-model="searchParams.searchText"
                  placeholder="搜索题号、标题、内容、题目来源、标签"
                  @change="onSearch"
                />
              </el-col>
              <el-col :span="2">
                <el-button class="setting">
                  <el-icon size="22" class="icon">
                    <Search @click="onSearch" />
                  </el-icon>
                </el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-table :data="problemList" stripe style="width: 100%">
            <el-table-column label="" width="100"></el-table-column>
            <el-table-column prop="problemId" label="题号" width="180" />
            <el-table-column prop="title" label="标题" width="500">
              <template v-slot="scope">
                <router-link
                  :to="{ name: '刷题', params: { id: scope.row.problemId } }"
                >
                  <el-link type="primary">{{ scope.row.title }}</el-link>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column label="通过率" width="200">
              <template v-slot="scope">
                {{ getPassRate(scope.row.submitNum, scope.row.acceptNum) }}
              </template>
            </el-table-column>
            <el-table-column prop="difficulty" label="难度" width="">
              <template v-slot="scope">
                <template v-if="scope.row.difficulty === 0">
                  <el-tag class="tag" type="success" effect="light" round
                    >简单
                  </el-tag>
                </template>
                <template v-else-if="scope.row.difficulty === 1">
                  <el-tag class="tag" effect="light" round>中等</el-tag>
                </template>
                <template v-else>
                  <el-tag class="tag" type="danger" effect="light" round
                    >困难
                  </el-tag>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="margin-top: 20px" type="flex" justify="end">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :default-page-size="searchParams.pageSize"
            pager-count="5"
            @current-change="onCurrentChange"
          />
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="4">
      <div class="grid-content ep-bg-purple-dark" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { Search, Setting } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import Message from "@arco-design/web-vue/es/message";
import { ProblemControllerService } from "../../../generated";

const problemList = ref([]);

const total = ref<number>(0);

const searchParams = ref({
  current: 1,
  pageSize: 50,
  searchText: "",
});

/**
 * 获取全部的题目
 */
const loadData = async () => {
  const res = await ProblemControllerService.getPageProblemUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    problemList.value = res.data?.records ?? [];
    total.value = parseInt(res.data?.total ?? "0", 10);
  } else {
    Message.error("加载失败" + res.message);
  }
};

/**
 * 页面加载时请求数据
 */
onMounted(() => {
  loadData();
});

/**
 * 计算通过率
 * @param submitNum
 * @param acceptNum
 */
const getPassRate = (submitNum: any, acceptNum: any) => {
  if (submitNum === "0") {
    return "100.00%";
  }
  const rate = (acceptNum / submitNum) * 100;
  return rate.toFixed(2) + "%"; // 保留两位小数并转换为百分比
};

/**
 * 修改页数
 * @param value 页数
 */
const onCurrentChange = (value: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: value,
  };
  loadData();
};

/**
 * 监听 searchParams 变量的修改触发事件
 */

/**
 * 搜索题目
 * @param value 搜索词
 */
const onSearch = async (value: string) => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
  const res = await ProblemControllerService.getPageBySearchProblemUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    problemList.value = res.data?.records ?? problemList.value;
    total.value = parseInt(res.data?.total ?? total.value, 10);
  } else {
    Message.error("搜索失败" + res.message);
  }
};
</script>

<style scoped>
.CodeNow {
  text-align: center;
  font-size: 38px;
  font-weight: normal;
  font-family: "Lora", serif;
  //font-family: "Playfair Display", serif;
}

.icon {
  display: inline-block;
  margin: 0 auto;
}

.tag {
  margin: 0 auto;
}

.setting {
  margin-left: 8px;
  padding: 5px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
}
</style>
