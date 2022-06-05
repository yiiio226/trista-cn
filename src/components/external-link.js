import styled from "styled-components"
import { OutboundLink } from "gatsby-plugin-google-analytics"

export const ExternalLink = styled(OutboundLink).attrs(props => ({
  href: props.href,
  children: props.label,
  target: "_blank",
  rel: "noopener noreferrer",
}))``
