import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const LinkWrapper = styled(Link)`
  display: block;
  background-color: ${props => props.primaryColor || props.theme.color};
  grid-column: ${props => (props.isWide ? "1/3" : "initial")};
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.06);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-25px);
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.12);
  }
`

export const ProjectCard = ({ _num, ...props }) => {
  return (
    <LinkWrapper to="" {...props}>
      {_num}
    </LinkWrapper>
  )
}
