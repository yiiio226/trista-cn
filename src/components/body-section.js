import styled from "styled-components"

import { Container } from "./layout"

export const BodySection = styled(Container)`
  background-color: ${props =>
    props.isAlt ? props.theme.colorBgAlt : props.theme.colorBg};

  padding: 120px calc((100vw - ${props => props.theme.maxBodyWidth}px) / 2);
  @media (max-width: 780px) {
    padding: 60px 30px;
  }
`
