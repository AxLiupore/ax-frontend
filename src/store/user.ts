import { StoreOptions } from "vuex";
import { UserInfoControllerService } from "../../generated";
import ACCESS_ENUM from "@/access/accessEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      account: "",
      username: "",
      avatar: "",
      role: ACCESS_ENUM.NOT_LOGIN,
      email: "",
      phone: "",
      profile: "",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await UserInfoControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          role: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
