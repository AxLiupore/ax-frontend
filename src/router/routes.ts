import { RouteRecordRaw } from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";
import NotFound from "@/components/NotFound.vue";
import UserSpace from "@/views/user/UserSpace.vue";
import UserProfile from "@/views/user/UserProfile.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import ProblemBank from "@/views/problem/ProblemBank.vue";
import ProblemContent from "@/views/problem/ProblemContent.vue";
import DiscussionVIew from "@/views/discussion/DiscussionView.vue";
import DiscussionView from "@/views/discussion/DiscussionView.vue";
import DiscussionContent from "@/views/discussion/DiscussionContent.vue";
import HomeView from "@/views/HomeView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    redirect: "/home/",
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/home/",
    name: "首页",
    component: HomeView,
  },
  {
    path: "/problem/",
    name: "题库",
    component: ProblemBank,
  },
  {
    path: "/problem/content/:id",
    name: "刷题",
    component: ProblemContent,
    props: true,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/contest/",
    name: "竞赛",
    component: BasicLayout,
  },
  {
    path: "/discussion/content/:id",
    name: "讨论",
    component: DiscussionContent,
    props: true,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/discussion/",
    name: "分享",
    component: DiscussionView,
  },
  {
    path: "/user/",
    name: "user",
    component: BasicLayout,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/user/myspace/",
    name: "个人空间",
    component: UserSpace,
    meta: {
      requestAuth: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/user/profile/",
    name: "个人信息",
    component: UserProfile,
    meta: {
      requestAuth: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
    meta: {
      requestAuth: true,
    },
  },
];
