<template>

  <div class="navigation-bar">
    <div class="left-header">
      <!-- <img src="../assets/logo.png" style="height:50px;"> -->
      <div class="title-content">
        <span class="logo-text">融资管理系统</span>
      </div>

    </div>
    <div class="right-header">
      <span style="color:#5d0210">{{ bankName }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span @click="Login" v-if="isLogin" class="login">登录</span>
      <span @click="turnToHome" v-else class="turnToHome">退出</span>
    </div>
  </div>
</template>

<script>
import { selectBankName } from "../api/financingList.js";
export default {
  data() {
    return {
      nickname: "",
      login: false,
      bankName: ""
    };
  },
  watch: {
    isLogin() {
      localStorage.getItem('setToken') ? false : true
    }
  },
  methods: {
    turnToHome() {
      this.$router.push("/home/front")
    },
    Login() {
      this.$router.push("/login");
    },
    selectName() {
      selectBankName({}).then(res => {
        this.bankName = res.data
      })
    },
    logout() {
      console.log("hhhhhhhh")
      console.log(localStorage.getItem('setToken'))
      this.$router.push("/login").catch((err) => err);
      localStorage.removeItem('setToken')
      this.login = true
      console.log(localStorage.getItem('setToken'))
    },
  },
  mounted() {
    // this.$store.commit("updateActiveIndex", "1");
    if (window.localStorage.token) {
      this.login = false
      let token = window.localStorage.setToken;
      let arr = token.split(".");
      let res = Base64.decode(arr[1]);
      this.nickname = JSON.parse(res).nickname
      console.log('this.nickname', this.nickname)

    } else {
      this.login = true
    };
    this.selectName()
  },
};
</script>

<style lang="less" scoped>
.navigation-bar {
  border-bottom: 1px solid #dad9d9;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 3px 20px;
  height: 56px;
  background: rgb(132, 150, 195);

  .left-header {
    display: flex;
    flex-direction: row;
    height: 56px;

    .title-content {
      display: flex;
      flex-direction: column;
      font-size: 18px;
      margin-top: 12px;
      color: #666;
      margin-left: 10px;

      .logo-text {
        color: #333;
        font-size: 20px;
        font-weight: 600
      }
    }
  }

  .right-header {
    line-height: 50px;
    font-size: 14px;

    .login {
      color: #333;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        color: #035D1C;
      }
    }
  }
}
</style>