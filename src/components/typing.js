import React from "react"
import Typist from "react-typist"
import "react-typist/dist/Typist.css"
import styled from "styled-components"

const TypingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;

  .Typist {
    width: 500px;
    height: 40px;
    font-size: 48px;
    line-height: 48px;
    font-family: ${props => props.theme.fontFamily};

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

  return (
    <TypingWrapper>
      {running ? (
        <Typist
          onTypingDone={() => updateRunning(false)}
          cursor={{ blink: true }}
        >
          <Typist.Delay ms={1000} />
          <span>你好</span>
          <Typist.Delay ms={1000} />
          <span>，</span>
          <Typist.Delay ms={200} />
          <span>我是 Trista</span>
          <Typist.Backspace count={7} delay={1000} />
          <Typist.Delay ms={500} />
          <span>一名设计师</span>
          <Typist.Backspace count={10} delay={5000} />
          <Typist.Delay ms={1000} />
        </Typist>
      ) : (
        ""
      )}
    </TypingWrapper>
  )
}
