import React from "react"

import { decrypt } from "./utils/encrypt"
import { EncryptedDialog } from "./encrypted-dialog"

export const Protected = ({
  isProtected,
  unprotectedData,
  protectedData,
  hintData,
  children,
}) => {
  const [decryptedData, updateDecryptedData] = React.useState(null)
  const decryptData = React.useCallback(
    pass => {
      try {
        if (isProtected) {
          const decrypted = decrypt(protectedData, pass)
          updateDecryptedData(decrypted)
        }
        return true
      } catch (e) {
        return false
      }
    },
    [protectedData]
  )

  if (!isProtected) {
    return children({ data: unprotectedData })
  } else if (decryptedData) {
    return children({ data: decryptedData })
  } else {
    return (
      <EncryptedDialog onSubmit={p => decryptData(p)} hintData={hintData} />
    )
  }
}
