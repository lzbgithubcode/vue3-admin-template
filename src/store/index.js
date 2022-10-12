import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
export default () => {
  const pinia = createPinia();
  // 增加插件
  pinia.use(piniaPersist);
  return pinia;
};
