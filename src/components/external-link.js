import styled from "styled-components"

export const ExternalLink = styled.a.attrs(props => ({
  href: props.href,
  children: props.label,
  target: "_blank",
  rel: "noopener noreferrer",
}))``
