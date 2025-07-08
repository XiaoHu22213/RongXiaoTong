/*
 * @Author: XiaoHu22213 2484246430@qq.com
 * @Date: 2024-08-07 08:39:56
 * @LastEditors: XiaoHu22213 2484246430@qq.com
 * @LastEditTime: 2024-08-07 21:51:19
 * @FilePath: \sale\src\api\financingList.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from "../utils/request";
const URL = process.env.BASEURL;

// 根据银行id查询融资一览
export function selectByBankId(params) {
  if (params.keys == "") {
    return request({
      method: "get",
      url: `finance/selectByBankId/${params.pageNum}`,
      headers: {
        Authorization: window.localStorage.token,
      },
    });
  } else {
    return request({
      method: "get",
      url: `finance/selectByFinance/${params.keys}/${params.pageNum}`,
      headers: {
        Authorization: window.localStorage.token,
      },
    });
  }
}

// 根据融资id查询融资
export function getFinanceById(params) {
  return request({
    method: "get",
    url: `/finance/selectById/${params.id}`,
    headers: {
      Authorization: window.localStorage.token,
    },
  });
}

//根据融资Id查询融资的材料
export function getFileInfoAsListById(params) {
  return request({
    method: "get",
    url: "finance/getFileInfoAsListById/" + params.id,
    headers: {
      Authorization: window.localStorage.token,
    },
  });
}

// 根据融资id修改融资getPicById
export function reviseFinanceById(params) {
  return request({
    method: "put",
    url: "finance/update",
    headers: {
      Authorization: window.localStorage.token,
    },
    data: params,
  });
}
export function getPicById(params) {
  return request({
    method: "get",
    url: "finance/getPic/" + params.id,
    headers: {
      Authorization: window.localStorage.token,
    },
  });
}
// 查询推荐融资人
export function selectRecommend(params) {
  return request({
    method: "get",
    url: "finance/selectRecommend/" + params.pageNum,
    headers: {
      Authorization: window.localStorage.token,
    },
  });
}
export function selectBankName() {
  return request({
    method: "get",
    url: "finance/selectBankName/",
    headers: {
      Authorization: window.localStorage.token,
    },
  });
}
