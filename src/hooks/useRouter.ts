import { getCurrentInstance } from "vue";
import { router } from "../router";

export function useRouter() {
  return getCurrentInstance()?.appContext.config.globalProperties.$Router as typeof router;
}
