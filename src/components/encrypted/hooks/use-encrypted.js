import React from "react"
import CryptoJS from "crypto-js"
import { decrypt } from "../utils/encrypt"

// TODO: just for test
window.CryptoJS = CryptoJS

export const useEncrypted = (encryptedData, password) => {
  const [result, updateResult] = React.useState(null)
  const [isPassValid, updateIsValid] = React.useState(null)

  React.useEffect(() => {
    if (!encryptedData) return

    try {
      const data = decrypt(encryptedData, password)
      updateResult(data)
      updateIsValid(true)
    } catch (e) {
      updateIsValid(false)
    }
  }, [password, encryptedData])

  return { result, isPassValid }
}
