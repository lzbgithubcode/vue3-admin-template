import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";

export default () => {
  const pinia = createPinia();
  pinia.use(piniaPersist);
  return pinia;
};
