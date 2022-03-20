import axios from "axios";

const API_HOST = "https://music-api-wine-zeta.vercel.app";

/**
 * GET请求
 * @param {*} api - 请求接口
 * @param {*} param - 返回接口中字段
 * @returns
 */
export async function asyncGetReq(api, param) {
  const data = (await axios.get(`${API_HOST}${api}`)).data;
  return data[param] ? data[param] : undefined;
}
/**
 * POST请求
 * @param {*} api - 请求接口
 * @param {*} queryParams - 查询参数
 * @param {*} param - 返回接口中字段
 * @returns
 */
export async function asyncPostReq(api, queryParams, param) {
  const data = (await axios.post(`${API_HOST}${api}`, queryParams)).data;
  return data[param] ? data[param] : undefined;
}
