import React from "react"
import { Viewport } from "./viewport"
import { ChildrenAnimated } from "./children-animated"

export const SlideIn = ({ duration, children }) => {
  const [childrenWidth, updateChildrenWidth] = React.useState(0)
  const [lastChildren, updateLastChildren] = React.useState()
  // const [isBlink, updateIsBlink] = React.useState(true)
  const viewportRef = React.useRef()
  const childrenRef = React.useRef()
  const isCleaning = children === "!CLEAR$"
  const showingChildren = isCleaning ? lastChildren : children

  React.useEffect(() => {
    if (isCleaning) {
      updateChildrenWidth(0)
      children = ""
    }
  }, [isCleaning])

  // TODO: When typing, do not flash cursor

  React.useEffect(() => {
    if (childrenRef.current) {
      const newWidth = childrenRef.current.offsetWidth
      updateChildrenWidth(newWidth)
      console.log("newWidth", newWidth)
    }
  }, [showingChildren, childrenRef])

  React.useEffect(() => {
    const toggleTransition = isEnable => {
      viewportRef.current.style.transitionDuration = `${
        isEnable ? duration / 1000 : 0
      }s`
      childrenRef.current.style.transitionDuration = `${
        isEnable ? duration / 1000 : 0
      }s`
    }
    const slideAnimation = () => {
      viewportRef.current.style.width = `${isCleaning ? 0 : childrenWidth}px`
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
    setTimeout(() => toggleTransition(false), duration)
  }, [childrenWidth])

  React.useEffect(() => {
    if (!isCleaning) {
      updateLastChildren(children)
    } else {
      setTimeout(() => updateLastChildren(children), duration)
    }
  }, [isCleaning])

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
      className="cursorBlink"
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
