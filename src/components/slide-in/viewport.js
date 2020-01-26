import styled from "styled-components"

export const Viewport = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 0;
  overflow: hidden;
  transition-property: width;
  border-right: 2px solid rgba(32, 104, 106, 0);

  @keyframes cursor-blink {
    0% {
      border-right-color: rgba(32, 104, 106, 0);
    }
    25% {
      border-right-color: rgba(32, 104, 106, 0);
    }
    50% {
      border-right-color: rgba(32, 104, 106, 1);
    }
    90% {
      border-right-color: rgba(32, 104, 106, 1);
    }
    100% {
      border-right-color: rgba(32, 104, 106, 1);
    }
  }
  &.cursorBlink {
    animation: cursor-blink 1s linear infinite;
  }
  &.cursorNoBlink {
    border-right-color: rgba(32, 104, 106, 1);
  }
`
