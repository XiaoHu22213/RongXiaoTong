<template>
  <div class="main-wrapper">
    <Header></Header>

    <div class="wrapper-content">
      <div class="left-wrapper">
        <div class="menu-text" :class="$route.name === 'intelligentMatch' ? 'selected' : ''" @click="toMatch">智能匹配</div>
        <div class="menu-text" :class="$route.name === 'financingList' ? 'selected' : ''" @click="toFinance">融资一览</div>
      </div>
      <div class="right-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  components: {
    Header
  },
  methods: {
    toMatch() {
      this.$router.push("/index/intelligentMatch")
    },
    toFinance() {
      this.$router.push("/index/financingList")
    }
  }
}
</script>

<style lang="less" scoped>
.main-wrapper {
  width: 100%;
  height: 100%;

  // backgroun%d: ;
  .wrapper-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .left-wrapper {
      width: 180px;
      margin-right: 20px;
      background: #27274a;
      color: #fff;
      height: 100%;
      font-size: 16px;
      line-height: 55px;

      // padding-top: 20px;
      .menu-text {
        text-align: center;
        width: 180px;
        cursor: pointer;

        &:hover {
          background: #34416c;
        }
      }

      .selected {
        background: #34416c;
      }
    }

    .right-wrapper {
      height: 100%;
      width: 100%;
      overflow-y: auto;
      background: #fff;
      margin-top: 10px;
      padding: 10px 20px;
    }
  }
}
</style>