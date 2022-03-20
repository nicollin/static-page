/**
 * 工具函数
 */
export default class Utils {
  /**
   * 数组是否有重量（不为空）
   * @param {*} arr
   * @returns
   */
  static isWeightyArray(arr) {
    return Array.isArray(arr) && arr.length ? true : false;
  }
}
