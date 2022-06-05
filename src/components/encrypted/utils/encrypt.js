const CryptoJS = require("crypto-js")

module.exports.encrypt = (data, pass) => {
  const toBeEnc = {
    time: Date.now(),
    data,
  }
  const toBeEncStr = JSON.stringify(toBeEnc)

  return CryptoJS.AES.encrypt(toBeEncStr, pass).toString()
}

module.exports.decrypt = (cipherText, pass) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, pass)
  const dataStr = bytes.toString(CryptoJS.enc.Utf8)
  const encData = JSON.parse(dataStr)
  if (encData.time > Date.now()) {
    throw new Error("Wrong password.")
  }
  return encData.data
}
