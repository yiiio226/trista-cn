import React from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import styled from "styled-components"

const Tooltip = styled.span`
  position: absolute;
  transform: translateY(0);

  &.animate {
    transition: all 0.2s;
    transform: translateY(-10px);
  }
`

export const ClickToCopyLink = ({
  link = { name: "LINK", link: "copy:LINK" },
  successText = "",
}) => {
  const [showTooltip, updateShowTooltip] = React.useState(false)
  const tooltipRef = React.useRef()
  const linkHref = link.link.replace("copy:", "")

  const animateTooltip = (ref, updateShow) => {
    updateShow(true)
    ref.current.classList.add("animate")
    setTimeout(() => {
      updateShow(false)
      ref.current.classList.remove("animate")
    }, 1000)
  }

  const onClickLink = e => {
    e.preventDefault()
    animateTooltip(tooltipRef, updateShowTooltip)
  }

  return (
    <>
      <Tooltip ref={tooltipRef} style={{ opacity: showTooltip ? 1 : 0 }}>
        {successText}
      </Tooltip>
      <CopyToClipboard text={linkHref}>
        <a onClick={e => onClickLink(e)} href="">
          {link.name}
        </a>
      </CopyToClipboard>
    </>
  )
}
