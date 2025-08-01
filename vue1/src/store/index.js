/*
 * @Author: XiaoHu22213 2484246430@qq.com
 * @Date: 2024-07-30 09:59:19
 * @LastEditors: XiaoHu22213 2484246430@qq.com
 * @LastEditTime: 2024-08-07 10:17:38
 * @FilePath: \sale\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    role: [],
    detailData: [],
    orderId: 0,
    changedOrderId: 0,
    changedKnowledgeId: 0,
    user: "",
    loginUserNickname: "",
    loginUserAvatar: "",
    activeIndex: "1",
    publishActiveIndex: "1",
    userActiveIndex: "1-1",
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    paymentInfo: "",
    imgShowRoad: process.env.VUE_APP_Address,
    fileUploadRoad: process.env.VUE_APP_Address,
    mutiFile: "",
  },
  getters: {
    getStorage(state) {
      if (!state.token) {
        state.token = JSON.parse(localStorage.getItem(key));
        return state.token;
      }
    },
    isExpert(state) {
      for (var k in state.role) {
        if (state.role[k].authority === "expert") {
          return true;
        }
      }
      return false;
    },
    isAdmin(state) {
      for (var k in state.role) {
        if (state.role[k].authority === "admin") {
          return true;
        }
      }
      return false;
    },
  },
  mutations: {
    updateOrderId(state, value) {
      state.orderId = value;
    },
    updateDetailData(state, value) {
      state.detailData = value;
      console.log("state.detailData", state.detailData);
    },
    updateChangedOrderId(state, value) {
      state.changedOrderId = value;
    },
    updateChangedKnowledgeId(state, value) {
      state.changedKnowledgeId = value;
    },
    updateLoginUserNickname(state, value) {
      console.log("state.loginUserNickname", value, state.loginUserNickname);
      console.log("原先的state.loginUserNickname", state.loginUserNickname);
      state.loginUserNickname = value;
    },
    updateLoginUserAvatar(state, value) {
      state.loginUserAvatar = value;
    },
    updateRole(state, value) {
      state.role = value;
    },
    updatePaymentInfo(state, value) {
      state.paymentInfo = value;
    },
    updateActiveIndex(state, value) {
      state.activeIndex = value;
    },
    updatePublishActiveIndex(state, value) {
      state.publishActiveIndex = value;
    },
    updateUserActiveIndex(state, value) {
      state.userActiveIndex = value;
    },
    // 设置存储token
    setToken(state, value) {
      state.token = value;
      localStorage.setItem("token", value);
    },
    // 删除token
    removeStorage(state) {
      localStorage.removeItem("token");
    },
  },
  actions: {},
  modules: {},
});
