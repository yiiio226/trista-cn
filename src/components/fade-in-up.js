import React from "react"
import styled from "styled-components"
import { motion, useViewportScroll, useTransform } from "framer-motion"

const FadeInUpMotion = motion.div
const FadeInUpWrapper = styled(FadeInUpMotion)`
  width: 100%;
  height: 100%;
  transition-duration: ${props => props.duration}s;
  transition-delay: ${props => props.delay}s;
  transition-property: transform opacity;
  transition-timing-function: ease-in-out;
`

const scrollYToBool = (ref, y, threshold) => {
  if (!ref.current || typeof window === "undefined") return false
  const bottom = window.innerHeight + y

  const eleTop = ref.current.offsetTop
  // Not scrolling enough yet
  if (eleTop > bottom + threshold) {
    return false
  } else {
    return true
  }
}

export const FadeInUp = ({
  children,
  initialOffset = 100,
  initialOpacity = 0,
  threshold = -100,
  duration = 0.8,
  delay = 0,
  ...props
}) => {
  const ref = React.useRef()
  const { scrollY } = useViewportScroll()
  const translateY = useTransform(scrollY, y =>
    scrollYToBool(ref, y, threshold) ? 0 : initialOffset
  )
  const opacity = useTransform(scrollY, y =>
    scrollYToBool(ref, y, threshold) ? 1 : initialOpacity
  )

  // TODO: Temporarily disabled FadeInUp
  if (children) {
    return <FadeInUpWrapper {...props}>{children}</FadeInUpWrapper>
  }

  return (
    <FadeInUpWrapper
      ref={ref}
      style={{ translateY, opacity }}
      duration={duration}
      delay={delay}
      {...props}
    >
      {children}
    </FadeInUpWrapper>
  )
}
