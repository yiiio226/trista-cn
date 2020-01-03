import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const LinkWrapper = styled(Link)`
  display: block;
  background-color: ${props => props.primaryColor || props.theme.color};
`

export const ProjectCard = () => {
  return <LinkWrapper to="">x</LinkWrapper>
}
