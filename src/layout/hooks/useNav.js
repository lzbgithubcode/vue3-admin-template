import { useUserStore } from '@/store/modules/user.js';
import { useAppStore } from '@/store/modules/app.js';
import { logout } from '@/utils/user/UserUtils.js';
import { computed } from 'vue';
import emitter from '../../utils/emitter/emitter';

export const useNav = () => {
  const useUser = useUserStore();
  const useApp = useAppStore();
  const userName = computed(() => {
    return useUser.userData.userName;
  });
  const avatar = computed(() => {
    return useUser.userData.avatar;
  });

  const isMobile = computed(() => useApp.device == 'mobile');

  const loginOut = () => {
    logout().then(() => {});
  };

  const openSettingPanel = () => {
    emitter.emit('openPanel');
  };
  return {
    userName,
    avatar,
    isMobile,
    loginOut,
    openSettingPanel
  };
};
