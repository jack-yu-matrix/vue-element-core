<template>
  <el-container class="login-container">
    <div class="login-header">
      <div class="logo">
        <svg-icon name="logo" class="login-svg" style="margin-right:10px"></svg-icon>
      </div>
      <div class="title">{{$t('user.loginTitle')}}</div>
    </div>
    <div class="login-panel">
      <div class="left">
        <img src="@/assets/user/panel-left.png">
      </div>
      <div class="right">
        <div class="right-title">
          <div class="title-name">{{$t('user.login')}}</div>
          <div class="lang-set">
            <el-dropdown trigger="click" @command="handleLangCommand">
              <span class="el-dropdown-link">
                <svg-icon style="cursor: pointer;" name="language" class="lang-svg"></svg-icon>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh">{{$t('lang.zh')}}</el-dropdown-item>
                <el-dropdown-item command="en">{{$t('lang.en')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <el-form hide-required-asterisk :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-position="top" class="login-form">
          <el-form-item class="base-item" prop="userName">
            <label slot="label">
              <svg-icon name="username" class="base-item-svg"></svg-icon>
              <span>{{$t('user.username')}}</span>
            </label>
            <el-input class="login-input" v-model="loginForm.userName" :placeholder="$t('user.usernamePlaceholder')" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="base-item" prop="password">
            <label slot="label">
              <svg-icon name="password" class="base-item-svg"></svg-icon>
              <span>{{$t('user.password')}}</span>
            </label>
            <el-input class="login-input" type="password" @keyup.enter.native="submitForm('loginForm')" v-model="loginForm.password" :placeholder="$t('user.passwordPlaceholder')" autocomplete="off"></el-input>
          </el-form-item>
          <div class="more-item">
            <el-checkbox v-model="loginForm.autoLogin">{{$t('user.autoLogin')}}</el-checkbox>
            <el-link type="primary" :underline="false">{{$t('user.forgetPsw')}}</el-link>
          </div>
          <el-form-item class="submit-item">
            <el-button class="submit-btn" :loading="submitting" type="primary" @click="submitForm('loginForm')">{{$t('user.login')}}</el-button>
          </el-form-item>
          <div class="more-item">
            <div class="login-with">
              <span>{{$t('user.loginWith')}}</span>
              <svg-icon name="wechat"></svg-icon>
              <svg-icon name="qq"></svg-icon>
            </div>
            <el-link type="primary" :underline="false">{{$t('user.register')}}</el-link>
          </div>
        </el-form>
      </div>
    </div>
  </el-container>
</template>
<script>
import md5 from 'md5'
export default {
  name: 'Login',
  data () {
    return {
      submitting: false,
      loginForm: {
        userName: '',
        password: '',
        autoLogin: false
      },
      loginRules: {
        userName: [
          { required: true, message: this.$t('user.usernameValidate'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('user.passwordValidate'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLangCommand (command) {
      this.$store.dispatch('SetLang', command)
      this.$refs.loginForm.clearValidate()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.submitting = true
        const nowPassword = md5(this.loginForm.password)
        const params = {
          username: this.loginForm.userName,
          password: nowPassword
        }
        this.$store.dispatch('Login', params).then(res => {
          if (res.code === 200) {
            this.$router.push({ path: this.$route.redirect || '/' })
          } else {
            this.$notify.error({
              title: '错误',
              message: res.message
            })
          }
        }).catch(err => {
          this.$notify.error({
            title: '错误',
            message: err
          })
        }).finally(() => {
          this.submitting = false
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import '~@/styles/var.less';
  @panel-width: 12rem;
  @min-width: 90rem;
  @panel-height: 60rem;
  @min-height: 50rem;
  @header-height: 6rem;

  .login-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: @min-height;
    overflow-x: hidden;
    background-image: linear-gradient(-45deg,#409EFF 10%,#004eff);
    box-shadow: 0 6px 8px 0 rgba(0,0,0,.1);
  }
  .login-header {
    display: flex;
    align-items: center;
    padding: 1rem 0;
    width: @panel-width;
    min-width: @min-width;
    height: @header-height;
    color: #fff;
    .logo {
      height: 100%;
      .login-svg {
        width: 15rem;
        height: @header-height;
      }
    }
    .title {
      position: relative;
      padding-left: 1rem;
      font-size: @font-size-normal;
      border-left: 0.1rem solid #fff;
    }
  }
  /deep/ .login-input .el-input__inner{
    border-top: none;
    border-right: none;
    border-left: none;
    border-radius: 0;
  }
  .login-panel {
    z-index: 1000;
    display: flex;
    width: @panel-width;
    min-width: @min-width;
    height: @panel-height;
    border-radius: 10px;
    box-shadow: @shadow-card;
    background-color: #fff;
    overflow: hidden;
    .left {
      flex: 3;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right {
      flex: 4;
      padding: 2rem 3rem;
      line-height: 3rem;
      .right-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 2rem;
        font-size: 2.5rem;
        .title-name {
          position: relative;
          &::before {
            content: "";
            position: absolute;
            top: -8px;
            left: 0;
            width: 30px;
            height: 4px;
            opacity: .9;
            border-radius: 50%;
            background-image: linear-gradient(32deg,#8b7bff 4%,#004eff);
            box-shadow: 0 6px 8px 0 rgba(0,0,0,.1);
            border-radius: 20px;
          }
        }
        .lang-svg {
          font-size: 2rem;
        }
      }
      .login-form {
        margin: 5rem 5rem 0 5rem;
        .base-item {
          .base-item-svg {
            margin-right: 0.5rem;
            font-size: 1.8rem;
            color: #666;
          }
        }
        .more-item{
          margin: 1rem 0;
          display: flex;
          justify-content: space-between;
          .login-with {
            font-size: 1.4rem;
            color: #666;
            display: flex;
            align-items: center;
            .svg-icon {
              font-size: 2rem;
              margin-left: 1.5rem;
              cursor: pointer;
              &:hover {
                color: #409EFF;
              }
            }
          }
        }
        .submit-item {
          margin-top: 3rem;
          .submit-btn {
            width: 100%;
            margin: 0 1rem;
          }
        }
      }
    }
  }
</style>
