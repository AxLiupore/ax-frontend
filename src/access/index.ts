import router from "@/router";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import useUserStore from "@/store/user";

router.beforeResolve(async (to, from, next) => {
  const userStore = useUserStore();
  let loginUser = userStore.loginUser;

  // 如果之前没有登录，自动登录
  if (!loginUser || !loginUser.role) {
    // 加await是为了获取用户登录态之后再执行代码
    await userStore.getLoginUser();
    loginUser = userStore.loginUser;
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面需要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没有登录，跳转到登录页面
    if (
      !loginUser ||
      !loginUser.role ||
      loginUser.role === ACCESS_ENUM.NOT_LOGIN
    ) {
      next("/noAuth/");
      return false;
    }
    // 如果已经登录了，但是权限不足，那么跳转到无权限的页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth/");
      return false;
    }
  } else {
    next();
  }
});
