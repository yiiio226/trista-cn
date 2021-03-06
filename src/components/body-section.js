import styled from "styled-components"

import { Container } from "./container"

export const AboutBodySection = styled(Container)`
  background-color: ${props =>
    props.isAlt ? props.theme.colorBgAlt : props.theme.colorBg};

  padding: 120px calc((100vw - ${props => props.theme.maxBodyWidth}px) / 2);
  @media (max-width: 780px) {
    padding: 40px 30px;
  }
`

export const AboutBodyPhotos = styled(Container)`
  background-color: ${props =>
    props.isAlt ? props.theme.colorBgAlt : props.theme.colorBg};

  padding: 60px calc((100vw - 1200px) / 2);
  /* 1680: 1440 + 120 x 2 */
  @media (max-width: 1440px) {
    padding: 60px 120px;
  }
  @media (max-width: 780px) {
    padding: 60px 15px;
  }
`
