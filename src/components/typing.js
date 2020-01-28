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

  @media (max-width: 780px) {
    transform: scale(0.5);
  }
`

export const Typing = () => {
  const [content, updateContent] = React.useState("!FLASH$")

  React.useEffect(() => {
    ;(async () => {
      while (true) {
        await sleep(1000)
        updateContent("你好，我是 Trista")
        await sleep(1500)
        updateContent("!CLEAR$")
        await sleep(1000)
        updateContent("我是一名 UI 设计师")

        await sleep(3000)
        updateContent("!CLEAR$")
        await sleep(800)
        updateContent("!FLASH$")
      }
    })()
  }, [])

  return (
    <TypingWrapper>
      <SlideIn duration={800}>{content}</SlideIn>
    </TypingWrapper>
  )
}
