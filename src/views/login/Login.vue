<template>
  <div class="p-login-wrapper">
    <Particles
     id="tsparticles"
      :options="particlesOptions"
      :particlesInit="particlesInit"
    />

    <div class="m-login-wrapper">
        我是登录的内容
    </div>
  </div>
</template>

<script src="./login.js"></script>

<style lang="scss" scoped>
@import "./login.scss"
</style>
