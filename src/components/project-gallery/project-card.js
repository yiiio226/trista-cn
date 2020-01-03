import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const LinkWrapper = styled(Link)`
  display: block;
  background-color: ${props => props.primaryColor || props.theme.color};
  grid-column: ${props => (props.isWide ? "1/3" : "initial")};
`

export const ProjectCard = ({ _num, ...props }) => {
  return (
    <LinkWrapper to="" {...props}>
      {_num}
    </LinkWrapper>
  )
}
