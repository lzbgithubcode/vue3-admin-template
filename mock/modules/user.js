module.exports = [
  // user login
  {
    url: "/login",
    type: "post",
    response: (config) => {
      const { userName, passwd } = config.body;
      console.log(`登录用户${userName}, 密码${passwd}`);

      return {
        code: 0,
        description: "用户登录2",
        success: true,
        data: {
          userName: "admin",
          realName: "admin",
          nickName: "admin",
          token: "@string('lower', 32)",
          avatar: "@image('200x200','red','#fff','Name')",
          roles: ["system_role_admin"],
          permissions: ["super_admin"],
        },
      };
    },
  },

  // user logout
  {
    url: "/logout",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: "success",
      };
    },
  },
];
