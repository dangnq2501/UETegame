const crypto = require("crypto").webcrypto;
const b56str = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";

export const b56gen = (len) => {
    const arr = new Uint8Array(len);
    crypto.getRandomValues(arr);
    let s = "";
    for (const x of arr) {
        s += b56str[~~(x/4.63)];
    }
    return s;
};
