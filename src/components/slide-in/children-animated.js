import styled from "styled-components"

export const ChildrenAnimated = styled.div`
  white-space: nowrap;
  height: 130px;
  transform: translateX(${props => props.shiftWidth}px);
  transition-property: transform;
  font-weight: 500;
`
