import { defineComponent, reactive, toRefs } from "vue";
import { loadFull } from "tsparticles";
import { login } from "../../utils/user/UserUtils";
import { BaseRoute } from "../../utils/constants/RoutePathConstants";

export default defineComponent({
  name: "Login",
  setup(props, context) {
    const particlesOptions = {
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: {
            // 开启鼠标点击的效果
            enable: false,
            mode: "push",
          },
          onHover: {
            // 开启鼠标悬浮的效果(线条跟着鼠标移动)
            enable: false,
            mode: "grab",
          },
          resize: true,
        },
        modes: {
          // 配置动画效果
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          push: {
            quantity: 4,
          },
          grab: {
            distance: 200,
            duration: 0.4,
          },
          attract: {
            // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
            distance: 200,
            duration: 0.4,
            factor: 5,
          },
        },
      },
      particles: {
        color: {
          value: "#6AECFF", // 粒子点的颜色
        },
        links: {
          color: "#6AECFF", // 线条颜色
          distance: 150,
          enable: true,
          opacity: 0.5, // 不透明度
          width: 2, // 线条宽度
        },
        collisions: {
          enable: true,
        },
        move: {
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
          bounce: false,
          direction: "none",
          enable: true,
          out_mode: "out",
          random: false,
          speed: 1, // 移动速度
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          random: true,
          value: 5,
        },
      },
      detectRetina: true,
    };

    const formObject = reactive({
      useName: "admin",
      pwd: "123456",
    });
    return {
      particlesOptions,
      formObject,
    };
  },
  methods: {
    /**
     * 初始化粒子效果
     */
    async particlesInit(engine) {
      await loadFull(engine);
    },
    /**
     * 点击登录
     */
    onClickLoginEvent() {
      console.log("点击登录", this.formObject);
      const param = this.formObject;
      login(param).then((res) => {
        this.$router.push(BaseRoute.FIX_PATH);
      });
    },
  },
});
