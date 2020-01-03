import React from "react"
import styled from "styled-components"

const LogoWrapper = styled.div`
  display: flex;
  width: 144px;
  height: 72px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colorBgPlaceholder};
`

export const Logo = () => {
  return <LogoWrapper></LogoWrapper>
}
