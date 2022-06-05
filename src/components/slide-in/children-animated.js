import styled from "styled-components"

export const ChildrenAnimated = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  height: 115px;
  transform: translateX(${props => props.shiftWidth}px);
  transition-property: transform;
  font-weight: 400;
  @media (max-width: 780px) {
    font-weight: 600;
  }
`
