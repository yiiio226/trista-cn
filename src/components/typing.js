import React from "react"
// import Typist from "react-typist"
import "react-typist/dist/Typist.css"
import styled from "styled-components"

import { SlideIn } from "./slide-in"
import { sleep } from "../hooks/sleep"

const TypingWrapper = styled.div`
  display: inline-block;
  font-size: 64px;
  line-height: 64px;
  font-family: ${props => props.theme.fontFamily};
`

export const Typing = () => {
  const [slideInContent, updateSlideInContent] = React.useState("!FLASH$")

  React.useEffect(() => {
    ;(async () => {
      await sleep(3000)
      updateSlideInContent("你好，我是 Trista")
      await sleep(2000)
      updateSlideInContent("!CLEAR$")
      await sleep(2000)
      updateSlideInContent("!FLASH$")
      await sleep(2000)
      updateSlideInContent("我是一名 UI 设计师")
    })()
  }, [])

  return (
    <TypingWrapper>
      <SlideIn duration={800}>{slideInContent}</SlideIn>
    </TypingWrapper>
  )
}
