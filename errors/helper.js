
/**
 * vironlib固有のエラー型
 */
 class VironLibError extends Error {
    constructor(message) {
      super(message);
      this.message = message;
      this.name = this.constructor.name;
    }
  }
  
  /**
   * HTTP Response Error インスタンス生成
   * @param prefix ErrorID prefix
   * @param httpCode HTTP Response Code
   * @param kind 種別
   * @param number 連番
   * @param name エラー名
   * @param message エラーメッセージ
   * @param detail 詳細
   * @returns {Error}
   */
export const genErrorHelper = (prefix, httpCode, kind, number, name, message, detail) => {
    console.log(message)
    const err = new VironLibError(message)
    err.statusCode = httpCode;
    err.data = {
      id: `#${prefix}-${kind}-${number}`,
      code: httpCode,
      name: name,
      message: message,
      detail: detail,
    };
    return err;
  };
  