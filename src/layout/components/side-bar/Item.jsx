import elSvgIcon from "@/components/el-svg-icon";

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
          nodes.push(<elSvgIcon elSvgName={props.meta?.elIcon}></elSvgIcon>);
         } else if(props.meta?.icon){
          nodes.push(<svg-icon iconClass={props.meta?.icon}></svg-icon>);
         }

         // 判断标题
         if(!!props.meta?.title){
            nodes.push(<span slot="title">{props.meta.title}</span>);
         }
         return nodes;
    }


    // 返回渲染函数
    return () => renderItem();
  },
});

