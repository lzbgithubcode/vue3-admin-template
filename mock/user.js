export default [
  // user login
  {
    url: '/api/login',
    type: 'post',
    response: (config) => {
      const { useName, pwd } = config.body;
      console.log(`登录用户${useName}, 密码${pwd}`);

      return {
        code: 0,
        description: '用户登录2',
        success: true,
        data: {
          userName: 'admin',
          realName: 'admin',
          nickName: 'admin',
          token: "@string('lower', 32)",
          avatar: "@image('200x200','red','#fff','Name')",
          roles: ['system_role_admin'],
          permissions: ['super_admin']
        }
      };
    }
  },

  // user logout
  {
    url: '/api/logout',
    type: 'post',
    response: () => {
      return {
        code: 0,
        description: '退出成功',
        success: true,
        data: 'success'
      };
    }
  }
];
