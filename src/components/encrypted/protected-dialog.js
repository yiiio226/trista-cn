import React from "react"
import styled, { css, keyframes } from "styled-components"
import Img from "gatsby-image"
import IcArrowRight from "../../images/icon_arrow-right.inline.svg"

const ProtectedDialogWrapper = styled.div`
  position: relative;
  display: flex;
  margin: 100px auto 0;
  max-width: 1240px;
  min-height: 400px;
  justify-content: center;
  @media (max-width: 1260px) {
    margin: 50px 30px 0;
  }
`

const PostCoverWrapper = styled(Img)`
  position: absolute;
  top: 0;
  max-width: 1200px;
  width: 100%;
  box-shadow: 0px 10px 30px -2px rgba(0, 0, 0, 0.06);
  filter: blur(14px);
`

const DialogFormWrapper = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 10px 30px -2px rgba(0, 0, 0, 0.06);
`

const DialogForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin: 140px auto 40px;
    min-width: 250px;
    font-size: 30px;
    text-align: center;
    @media (max-width: 780px) {
      font-size: 20px;
      margin: 40px auto 20px;
    }
  }
`

const shake = keyframes`
  0% {
        left:-10px;
    }
    16% {
        left:9px;
    }
    33% {
        left:-6px;
    }
    50% {
        left:5px;
    }
    66% {
        left:-2px;
    }
    83% {
        left:1px;
    }
    100% {
        left: 0px;
    }
`

const shakeAnimation = () => css`
  ${shake} 0.6s infinite alternate;
`

const InputField = styled.div`
  position: relative;
  max-width: 280px;
  width: 100%;
  animation: ${props => (props.shake ? shakeAnimation : "none")};

  input[type="password"] {
    position: absolute;
    height: 48px;
    width: 100%;
    padding: 0 0 0 20px;
    border: 1px solid #ddd;
    border-radius: 2px;
    box-sizing: border-box;
    &:active,
    &:focus {
      outline: none;
      border: 1px solid #ccc;
    }
  }
  button {
    position: absolute;
    right: 0;
    background-color: rgba(255, 255, 255, 0);
    border: 0;
    height: 40px;
    margin: 4px 1px 0 0;
    padding: 0 20px;
    cursor: pointer;
    font-size: 16px;
    color: rgba(153, 153, 153, 1);
    &:active,
    &:focus {
      outline: none;
      border: none;
    }
  }
`

export const ProtectedDialog = ({ onSubmit, hintData }) => {
  const [password, updatePassword] = React.useState("")
  const [isPasswordCorrect, updateIsPasswordCorrect] = React.useState(null)

  const { heroPicture, title } = hintData
  const heroPic = heroPicture[0]

  const handleSubmit = e => {
    e.preventDefault()
    const isPasswordCorrect = onSubmit(password)
    if (!isPasswordCorrect) {
      updateIsPasswordCorrect(false)
    }
  }

  React.useEffect(() => {
    if (isPasswordCorrect === false) {
      updatePassword("")
      setTimeout(() => {
        updateIsPasswordCorrect(null)
      }, 600)
    }
  }, [isPasswordCorrect])

  return (
    <ProtectedDialogWrapper>
      {heroPic && (
        <PostCoverWrapper fluid={heroPic.localImage.childImageSharp.fluid} />
      )}
      <DialogFormWrapper>
        <DialogForm onSubmit={handleSubmit}>
          <div className="title">{title}</div>
          <InputField shake={isPasswordCorrect === false}>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="请输入项目密码"
              onChange={e => updatePassword(e.target.value)}
            />
            <button onClick={handleSubmit}>
              <IcArrowRight className="submit" />
            </button>
          </InputField>
        </DialogForm>
      </DialogFormWrapper>
    </ProtectedDialogWrapper>
  )
}
