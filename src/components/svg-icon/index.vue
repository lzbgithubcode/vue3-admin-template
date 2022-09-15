<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon"/>
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
import { defineComponent,computed } from "vue";
import {isExternal} from "../../utils/helper/ValidateHelper.js";
export default defineComponent({
  name: "SvgIcon",
  props:{
       iconClass: {
          type: String,
          required: true
      },
      className: {
          type: String,
          default: ""
      }
  },
  setup(props){

    return {
      ...props,
      isExternal: computed(()=>isExternal(props.iconClass)),
       styleExternalIcon: computed(()=>{
         return {
                    "mask": `url(${props.iconClass}) no-repeat 50% 50%`,
                  "-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`
                  }
       }),
       svgClass:computed(()=>{
        if (props.className) {
                return `svg-icon ${props.className}`;
            }
            return "svg-icon";
        }),
        iconName:computed(()=>`#icon-${props.iconClass}`)
    }
  }
});
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
}
</style>

