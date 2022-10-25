import ElSvgItem from "./ElSvgItem.vue";
import svgIcon from "@/components/svg-icon/index.vue";

import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    meta:{
       type: Object,
       default: ()=> {}
    }
  },
  setup(props) {
    const nodes = [];
    const renderItem = ()=>{
         if(props.meta?.elIcon){
          nodes.push(<ElSvgItem elSvgName={props.meta?.elIcon} class="item-svg-icon"></ElSvgItem>);
         } else if(props.meta?.icon){
          nodes.push(<svgIcon iconClass={props.meta?.icon} className="item-svg-icon"></svgIcon>);
         }

         // 判断标题
         if(!!props.meta?.title){
            nodes.push(<span class="item-title" slot="title">{props.meta.title}</span>);
         }
         return nodes;
    }


    // 返回渲染函数
    return () => renderItem();
  },
});

