/*
 * @Author: XiaoHu22213 2484246430@qq.com
 * @Date: 2024-07-30 09:59:19
 * @LastEditors: XiaoHu22213 2484246430@qq.com
 * @LastEditTime: 2024-07-30 10:06:45
 * @FilePath: \sale\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";

export function request(config) {
  // 创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://3958b99l28.zicp.vip',
    // baseURL: 'http://119.3.180.117:9090',
    //baseURL: process.env.VUE_APP_Address,
    baseURL: "http://localhost:9090",
    timeout: 100000,
  });
  // axios.interceptors  全局拦截
  //请求拦截
  instance.interceptors.request.use(
    (config) => {
      //拦截请求
      return config; //若拦截到需要原封不动的返回
    },
    (err) => {}
  );
  //响应拦截
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );
  // 3.发送真正的网络请求
  return instance(config);
}
