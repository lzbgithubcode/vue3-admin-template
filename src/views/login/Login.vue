<template>
  <div class="p-login-wrapper">
   <Particles
     id="tsparticles"
      :options="particlesOptions"
      :particlesInit="particlesInit"
    />

    <div class="login-container">
         <div>欢迎登录Vue3模版系统</div>
         <el-form class="login-form" ref="loginForm">
             <el-form-item prop="username">
                <el-input v-model="formObject.username" placeholder="用户名(admin)" />
             </el-form-item>

              <el-form-item prop="pwd">
                <el-input v-model="formObject.pwd" placeholder="密码(123456)" />
             </el-form-item>


              <el-form-item prop="pwd">
                <el-button type="primary">登录</el-button>
             </el-form-item>
         </el-form>
    </div>
  </div>
</template>

<script src="./login.js"></script>

<style lang="scss" scoped>
@import "./login.scss"
</style>
