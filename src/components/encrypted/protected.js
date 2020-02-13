import React from "react"

import { decrypt } from "./utils/encrypt"
import { EncryptedDialog } from "./encrypted-dialog"

export const Protected = ({
  isProtected,
  unprotectedData,
  protectedData,
  children,
}) => {
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
    [isProtected, protectedData]
  )

  if (!isProtected) {
    return children({ data: unprotectedData })
  } else if (decryptedData) {
    return children({ data: decryptedData })
  } else {
    return (
      <EncryptedDialog onSubmit={p => decryptData(p)} errorMsg={errorMsg} />
    )
  }
}
