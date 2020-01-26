import React from "react"
// import Typist from "react-typist"
import "react-typist/dist/Typist.css"
import styled from "styled-components"

import { SlideIn } from "./slide-in"

const TypingWrapper = styled.div`
  display: inline-block;
  font-size: 64px;
  line-height: 64px;
  font-family: ${props => props.theme.fontFamily};

  .shadow {
    padding-right: 10px;
    opacity: 0;
  }

  .Typist {
    height: 40px;

    .Cursor {
      color: ${props => props.theme.colorTheme};
    }
  }
`

export const Typing = () => {
  const [running, updateRunning] = React.useState(true)
  React.useEffect(() => {
    if (running === false) updateRunning(true)
  }, [running])

  const [slideInContent, updateSlideInContent] = React.useState(
    "你好，我是 Trista"
  )

  React.useEffect(() => {
    setTimeout(() => {
      updateSlideInContent("!CLEAR$")
      setTimeout(() => updateSlideInContent("我是一名 UI 设计师"), 2000)
    }, 2000)
  }, [])

  return (
    <TypingWrapper>
      {running ? <SlideIn duration={800}>{slideInContent}</SlideIn> : ""}
    </TypingWrapper>
  )
}
