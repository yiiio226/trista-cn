import { useState, useEffect, useCallback, useRef } from "react"
import { useLocation } from "@reach/router"

export function useScroll() {
  const lastScrollTopRef = useRef(0)
  const location = useLocation()
  const bodyOffsetRef = useRef(
    typeof window === "undefined" || !window.document
      ? 0
      : document.body.getBoundingClientRect()
  )
  // const [bodyOffset, setBodyOffset] = useState()
  const [scroll, updateScroll] = useState({
    scrollX: bodyOffsetRef.current.left,
    scrollY: bodyOffsetRef.current.top,
    scrollDirection: null,
  })

  const listener = () => {
    bodyOffsetRef.current =
      typeof window === "undefined" || !window.document
        ? 0
        : document.body.getBoundingClientRect()

    const newScroll = {}
    const newDir =
      lastScrollTopRef.current > -bodyOffsetRef.current.top ? "down" : "up"
    if (newDir !== scroll.scrollDirection) newScroll.scrollDirection = newDir
    if (-bodyOffsetRef.current.top !== scroll.scrollY) {
      newScroll.scrollY = Math.max(-bodyOffsetRef.current.top, 0)
    }
    if (bodyOffsetRef.current.left !== scroll.scrollX) {
      newScroll.scrollX = bodyOffsetRef.current.left
    }
    if (-bodyOffsetRef.current.top !== lastScrollTopRef.current) {
      lastScrollTopRef.current = -bodyOffsetRef.current.top
    }
    updateScroll({ ...scroll, ...newScroll })
  }

  useEffect(() => {
    window.addEventListener("scroll", listener)
    return () => {
      window.removeEventListener("scroll", listener)
    }
  }, [scroll])

  useEffect(() => {
    listener()
  }, [location.pathname])

  return scroll
}
