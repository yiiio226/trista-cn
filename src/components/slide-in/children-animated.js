import styled from "styled-components"

export const ChildrenAnimated = styled.div`
  white-space: nowrap;
  /* background-color: rgba(100, 0, 0, 0.1); */
  transform: translateX(${props => props.shiftWidth}px);
  transition-property: transform;
`
