import { genErrorHelper } from "./helper.js";
/**
 * HTTP Response Error インスタンス生成
 * @param httpCode HTTP Response Code
 * @param kind 種別
 * @param number 連番
 * @param name エラー名
 * @param message エラーメッセージ
 * @returns {Error}
 */
const genError = (httpCode, kind, number, name, message) => {
  return genErrorHelper('E', httpCode, kind, number, name, message);
};


  /**
   * 外部APIのエラー全般に使用する.
   */
export const ExternalServerError = code => genError(code || 500, '0000', '0000', 'ExternalServerError', 'External Server Error')
  /**
   * 外部APIのリクエストエラー全般に使用する.
   */
export const ExternalBadRequest = () => genError(400, '0000', '0001', 'ExternalBadRequest', 'External Bad Request')

