import styled from "styled-components"

export const Container = styled.div`
  margin: 0 auto;
  /* When is full width, make max-width 100% */
  max-width: ${props =>
    props.isFullWidth
      ? "100%"
      : props.sideDistance
      ? "calc(100vw - " + props.sideDistance * 2 + "px)"
      : props.theme.mobileWidth + "px"};
  padding: 0
    ${props =>
      props.isFullWidth
        ? props.sideDistance
          ? props.sideDistance + "px"
          : "calc((100vw - " + props.theme.mobileWidth + "px)/2)"
        : 0};
`
