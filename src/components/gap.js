import styled from "styled-components"

export const Gap = styled.div`
  width: 100%;
  height: ${props => props.gapSize || props.theme.gapSize}px;
  @media (max-width: 780px) {
    ${props =>
      props.shrinkOnMobile &&
      "height: " + (props.gapSize / 3 || props.theme.gapSize / 3) + "px;"}
  }
`

Gap.defaultProps = {
  shrinkOnMobile: true,
}
