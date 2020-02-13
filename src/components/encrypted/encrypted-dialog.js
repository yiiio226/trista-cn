import React from "react"
import styled from "styled-components"

const EncryptedDialogWrapper = styled.div`
  width: calc(100vw - 60px);
  max-width: 1240px;
  margin: 0 auto;
  text-align: center;
`

export const EncryptedDialog = ({ onSubmit, errorMsg }) => {
  const [password, updatePassword] = React.useState()
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(password)
  }
  return (
    <EncryptedDialogWrapper>
      <h2>Page is encrypted</h2>
      <form onSubmit={handleSubmit}>
        <h3>Please provide a password</h3>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => updatePassword(e.target.value)}
        />
        <input type="submit" />
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
      </form>
    </EncryptedDialogWrapper>
  )
}
