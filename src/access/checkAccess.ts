import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限（判断当前登录用户是否具有某个权限）
 * @param loginUser
 * @param needAccess
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前用户具有的权限（如果没有loginUser,就表示未登录）
  const loginUserAccess = loginUser?.role ?? ACCESS_ENUM.NOT_LOGIN;

  // 如果这个页面不需要权限，直接返回true
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  // 如果需要用户登录才能呢个访问
  if (needAccess === ACCESS_ENUM.USER) {
    // 如果是未登录，直接返回false
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }

    // 如果需要管理员权限
    if (needAccess === ACCESS_ENUM.ADMIN) {
      // 如果不是管理员权限，和字节返回false
      if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
        return false;
      }
    }

    // 具有访问这个页面的权限
    return true;
  }
};

export default checkAccess;
