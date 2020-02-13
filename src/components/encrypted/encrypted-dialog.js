import React from "react"

export const EncryptedDialog = ({ onSubmit, onValid, errorMsg }) => {
  const [password, updatePassword] = React.useState()
  const [isValid, updateIsValid] = React.useState()
  const handleSubmit = e => {
    e.preventDefault()
    console.log("submit password:", password)
    const isValid = onSubmit(password)
    updateIsValid(isValid)

    if (isValid) {
      onValid()
    }
  }
  return (
    <div>
      <h2>Encrypted</h2>
      <form onSubmit={handleSubmit}>
        <h3>Input password</h3>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => updatePassword(e.target.value)}
        />
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
        <input type="submit" />
      </form>
    </div>
  )
}
