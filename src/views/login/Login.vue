<template>
  <div class="p-login-wrapper">
    <Particles id="tsparticles" :options="particlesOptions" :particles-init="particlesInit" />

    <div class="login-container">
      <div>欢迎登录Vue3模版系统</div>
      <el-form ref="loginForm" class="login-form">
        <el-form-item prop="useName">
          <span>
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="formObject.useName" placeholder="用户名(admin)" />
        </el-form-item>

        <el-form-item prop="pwd">
          <span>
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model="formObject.pwd" placeholder="密码(123456)" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onClickLoginEvent"> 登录 </el-button>
        </el-form-item>

        <div class="protocol-group">登录即同意《隐私协议》与《用户协议》</div>
      </el-form>
    </div>
  </div>
</template>

<script src="./login.js"></script>

<style lang="scss">
@import './login.scss';
</style>
