// import { UserInfoControllerService } from "../../generated";
// import ACCESS_ENUM from "@/access/accessEnum";
// import { defineStore } from "pinia";
//
// export default {
//   state: () => ({
//   }),
//   actions: {
//     async getLoginUser({ commit, state }, payload) {
//       const res = await UserInfoControllerService.getLoginUserUsingGet();
//       if (res.code === 0) {
//         commit("updateUser", res.data);
//       } else {
//         commit("updateUser", {
//           ...state.loginUser,
//           role: ACCESS_ENUM.NOT_LOGIN,
//         });
//       }
//     },
//   },
//   mutations: {
//     updateUser(state, payload) {
//       state.loginUser = payload;
//     },
//   },
// } as StoreOptions<any>;

import { LoginUserVO, UserInfoControllerService } from "../../generated";
import ACCESS_ENUM from "@/access/accessEnum";
import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => ({
    loginUser: {
      account: "",
      avatar: "",
      email: "",
      gender: "",
      phone: "",
      profile: "",
      role: "",
      username: "",
      uuid: undefined,
    } as LoginUserVO,
  }),
  actions: {
    async getLoginUser() {
      const res = await UserInfoControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        if (res.data !== undefined) {
          this.loginUser = res.data;
        }
      } else {
        this.loginUser = { ...this.loginUser, role: ACCESS_ENUM.NOT_LOGIN };
      }
    },
  },
});

export default userStore;
