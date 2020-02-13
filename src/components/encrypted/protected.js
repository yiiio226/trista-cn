import React from "react"

import { decrypt } from "./utils/encrypt"
import { EncryptedDialog } from "./encrypted-dialog"

export const Protected = ({
  isProtected,
  unprotectedData,
  protectedData,
  children,
}) => {
  console.log(
    "Protected",
    isProtected,
    JSON.parse(JSON.stringify(unprotectedData)),
    protectedData
  )
  const [decryptedData, updateDecryptedData] = React.useState(null)
  const [errorMsg, updateErrorMsg] = React.useState(null)
  const decryptData = React.useCallback(
    pass => {
      try {
        const decrypted = decrypt(protectedData, pass)
        updateDecryptedData(decrypted)
      } catch (e) {
        updateErrorMsg("Wrong password, please try again :)")
      }
    },
    [protectedData]
  )

  if (!isProtected) {
    console.log("data: unprotectedData")
    return children({ data: unprotectedData })
  } else if (decryptedData) {
    console.log("data: decryptedData")
    return children({ data: decryptedData })
  } else {
    console.log("error")
    return (
      <EncryptedDialog onSubmit={p => decryptData(p)} errorMsg={errorMsg} />
    )
  }
}
