import React from "react"
import styled from "styled-components"

import { SlideIn } from "./slide-in"
import { sleep } from "../hooks/sleep"

const TypingWrapper = styled.div`
  display: inline-block;
  font-size: 88px;
  line-height: 115px;
  font-family: ${props => props.theme.fontFamily};

  @media (max-width: 780px) {
    transform: scale(0.4);
  }
`

const DEFAULT_ACTIONS = [
  {
    sentence: "你好，我是 Trista",
    duration: 1,
    typeHandle: "text",
  },
  {
    duration: 2000,
    typeHandle: "sleep",
  },
  {
    duration: 800,
    typeHandle: "clear",
  },
  {
    duration: 200,
    typeHandle: "sleep",
  },
  {
    sentence: "你好，我是 Trista",
    duration: 800,
    typeHandle: "text",
  },
]

export const Typing = ({ actions = DEFAULT_ACTIONS }) => {
  const [content, updateContent] = React.useState(["你好，我是 Trista", 1])

  React.useEffect(() => {
    ;(async () => {
      while (true) {
        for (const i in actions) {
          const a = actions[i]

          switch (a.typeHandle) {
            case "text":
              updateContent([a.sentence, a.duration])
              await sleep(a.duration)
              break
            case "sleep":
              await sleep(a.duration)
              break
            case "clear":
              updateContent(["!CLEAR$", a.duration])
              await sleep(a.duration)
              break
            case "flash":
              updateContent(["!FLASH$", a.duration])
              await sleep(a.duration)
              break
            default:
              await sleep(a.duration)
          }
        }
      }
    })()
  }, [actions])

  return (
    <TypingWrapper>
      <SlideIn duration={content[1]}>{content[0]}</SlideIn>
    </TypingWrapper>
  )
}
