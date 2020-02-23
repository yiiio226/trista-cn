import styled from "styled-components"

export const ChildrenAnimated = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  height: 130px;
  transform: translateX(${props => props.shiftWidth}px);
  transition-property: transform;
  font-weight: 400;
`
