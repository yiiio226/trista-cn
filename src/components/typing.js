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
  const [content, updateContent] = React.useState(["!FLASH$", 800])

  React.useEffect(() => {
    ;(async () => {
      while (true) {
        await sleep(1200)
        updateContent(["你好，我是 Trista", 800])
        await sleep(1500)
        updateContent(["!CLEAR$", 800])
        await sleep(1000)
        updateContent(["我是一名 UI 设计师", 1000])

        await sleep(3000)
        updateContent(["!CLEAR$", 800])
        await sleep(800)
        updateContent(["!FLASH$", 800])
      }
    })()
  }, [])

  return (
    <TypingWrapper>
      <SlideIn duration={content[1]}>{content[0]}</SlideIn>
    </TypingWrapper>
  )
}
