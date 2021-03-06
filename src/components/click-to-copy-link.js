import React from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import styled from "styled-components"
import IconSuccess from "../images/icon_success.inline.svg"

const Tooltip = styled.div`
  position: fixed;
  top: 15px;
  left: calc(50% - 100px);
  width: 200px;
  height: 40px;
  line-height: 40px;
  background-color: rgba(228, 238, 238, 1);
  box-shadow: 0px 1px 2px 0px rgba(0, 34, 34, 0.08);
  color: ${props => props.theme.colorTheme};
  transform: translateY(0);

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(-10px);
  &.showing {
    transform: translateY(0);
  }

  &.animate {
    transition: all 0.5s;
  }
`

export const ClickToCopyLink = ({
  link = { linkTitle: "LINK", linkLink: "copy:LINK" },
  successText = "",
}) => {
  const [showTooltip, updateShowTooltip] = React.useState(false)
  const tooltipRef = React.useRef()

  const animateTooltip = (ref, updateShow) => {
    updateShow(true)
    ref.current.classList.add("showing")
    ref.current.classList.add("animate")
    setTimeout(() => {
      updateShow(false)
      if (!ref.current) return
      ref.current.classList.remove("showing")
      setTimeout(() => {
        if (!ref.current) return
        ref.current.classList.remove("animate")
      }, 500)
    }, 1000)
  }

  const onClickLink = e => {
    e.preventDefault()
    animateTooltip(tooltipRef, updateShowTooltip)
  }

  return (
    <>
      <Tooltip ref={tooltipRef} style={{ opacity: showTooltip ? 1 : 0 }}>
        <IconSuccess style={{ marginRight: 8 }} />
        {successText}
      </Tooltip>
      <CopyToClipboard text={link.linkLink}>
        <a onClick={e => onClickLink(e)} href="./">
          {link.linkTitle}
        </a>
      </CopyToClipboard>
    </>
  )
}
