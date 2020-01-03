import styled from "styled-components"

export const Gap = styled.div`
  width: 100%;
  height: ${props => props.gapSize || props.theme.gapSize}px;
`
