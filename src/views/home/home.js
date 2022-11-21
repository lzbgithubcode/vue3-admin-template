import { defineComponent, reactive, toRefs } from 'vue'
import { useWindowSize } from '../../hooks/core/useWindowSize'
export default {
  name: 'Home',
  setup(props) {
    const { width, height } = useWindowSize()
    console.log('进入控制台')
    return {
      width,
      height
    }
  }
}
