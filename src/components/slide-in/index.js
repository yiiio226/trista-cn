import React from "react"
import { Viewport } from "./viewport"
import { ChildrenAnimated } from "./children-animated"

export const SlideIn = ({ duration, children }) => {
  const [childrenWidth, updateChildrenWidth] = React.useState(0)
  const [lastChildren, updateLastChildren] = React.useState("")
  const viewportRef = React.useRef()
  const childrenRef = React.useRef()
  const isCleaning = children === "!CLEAR$"
  const isBlinking = children === "!FLASH$"

  let showingChildren = isCleaning ? lastChildren : children
  showingChildren = isBlinking ? "" : showingChildren

  console.log(
    "showingChildren",
    showingChildren,
    "isCleaning, isBlinking",
    isCleaning,
    isBlinking
  )

  React.useEffect(() => {
    if (childrenRef.current) {
      let newWidth = isCleaning ? 0 : childrenRef.current.offsetWidth
      updateChildrenWidth(newWidth)
    }
  }, [showingChildren, childrenRef, isCleaning])

  /** Remember last children */
  React.useEffect(() => {
    if (!isCleaning) updateLastChildren(children)
  }, [isCleaning, children])

  React.useEffect(() => {
    console.log("childrenWidth", childrenWidth)
    const toggleTransition = isEnable => {
      viewportRef.current.style.transitionDuration = `${
        isEnable ? duration / 1000 : 0
      }s`
      childrenRef.current.style.transitionDuration = `${
        isEnable ? duration / 1000 : 0
      }s`
    }
    const slideAnimation = () => {
      viewportRef.current.style.width = `${childrenWidth}px`
      childrenRef.current.style.transform = `translateX(0px)`
      console.log(
        "width",
        viewportRef.current.style.width,
        "transform",
        childrenRef.current.style.transform
      )
    }

    toggleTransition(true)
    slideAnimation()
    const timer = setTimeout(() => toggleTransition(false), duration)
    return () => clearTimeout(timer)
  }, [childrenWidth, duration])

  console.log(
    "isCleaning, lastChildren, children",
    isCleaning,
    lastChildren,
    children
  )

  return (
    <Viewport
      fixedWidth={childrenWidth}
      duration={duration}
      className={isBlinking ? "cursorBlink" : "cursorNoBlink"}
      ref={viewportRef}
    >
      <ChildrenAnimated
        shiftWidth={childrenWidth}
        duration={duration}
        ref={childrenRef}
      >
        {showingChildren}
      </ChildrenAnimated>
    </Viewport>
  )
}
