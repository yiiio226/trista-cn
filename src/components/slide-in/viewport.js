import styled from "styled-components"

export const Viewport = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 0;
  overflow: hidden;
  transition-property: width;

  @keyframes cursorBlink {
    0% {
      box-shadow: 2px 0 0 rgba(32, 104, 106, 0);
    }
    25% {
      box-shadow: 2px 0 0 rgba(32, 104, 106, 0);
    }
    50% {
      box-shadow: 2px 0 0 rgba(32, 104, 106, 1);
    }
    90% {
      box-shadow: 2px 0 0 rgba(32, 104, 106, 1);
    }
    100% {
      box-shadow: 2px 0 0 rgba(32, 104, 106, 0);
    }
  }
  &.cursorBlink {
    animation: cursorBlink 1s linear infinite;
  }
  &.cursorNoBlink {
    box-shadow: 2px 0 0 rgba(32, 104, 106, 1);
  }
`
