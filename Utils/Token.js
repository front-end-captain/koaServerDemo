const JWT = require("jwt-simple");
const Day = require("dayjs");

const SECRET = { key: "viking" };
Object.freeze(SECRET);

class Token {
  static createToken() {
    // 过期时间为当前时间点之后的 24 小时之后 单位: ms
    const expireTime = Day().add(1, 'days').valueOf();
    const payload = { expire: expireTime };
    return JWT.encode(payload, SECRET.key);
  };

  static checkToken(token) {
    if (!token) {
      return false;
    }

    const decode = JWT.decode(token, SECRET.key);

    // 24 * 60 * 60 * 1000 = 86400000
    if ((decode.expire + 86400000) < Date.now()) {
      return false;
    }

    return true;
  }
}

module.exports = Token;
