import styled from "styled-components"

export const ExternalLink = styled.a.attrs({
  href: props => props.href,
  children: props => props.label,
  target: "_blank",
  rel: "noopener noreferrer",
})``
