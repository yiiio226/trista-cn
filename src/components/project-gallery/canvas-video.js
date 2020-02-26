import React from "react"
import styled from "styled-components"

const CanvasVideoWrapper = styled.div`
  display: flex;
`

const Canvas = styled.canvas`
  display: block;
  margin: auto auto 0;
  max-width: 100%;
  max-height: 100%;
`

export const CanvasVideo = ({ poster, src, type, onColor, ...props }) => {
  const canvasRef = React.useRef()

  React.useEffect(() => {
    if (!(window && canvasRef.current)) return

    var ratio = window.devicePixelRatio || 1

    const canvas = canvasRef.current
    var ctx = canvas.getContext("2d")
    var img = document.createElement("img")
    img.src = poster
    img.style.width = "500px"
    img.style.height = "400px"
    // canvas.parentNode.insertBefore(img, canvas) // Place video in DOM
    // ctx.drawImage(img, 0, 0, 200, 400)
    var vid = document.createElement("video")
    vid.preload = "auto"
    vid.autoplay = true
    vid.loop = true
    vid.muted = true
    vid.defaultMuted = true
    vid.playsinline = true
    vid.poster = poster
    vid.style.position = "absolute"
    vid.style.opacity = 0
    vid.style.zIndex = -1
    vid.style.width = "20px"
    vid.style.height = "20px"
    // now, add sources:
    var srcEle = document.createElement("source")
    srcEle.type = type
    srcEle.src = src
    vid.appendChild(srcEle)

    canvas.parentNode.insertBefore(vid, canvas) // Place video in DOM

    // Prepare to play
    const loadedDataListener = () => {
      const vw = vid.videoWidth
      const vh = vid.videoHeight
      canvas.width = vw
      canvas.height = vh

      const drawingLoop = () => {
        if (!window) return
        window.requestAnimationFrame(drawingLoop)

        // video size / canvas size
        ctx.drawImage(vid, 0, 0, vw, vh, 0, 0, vw, vh)
      }

      const extractColor = () => {
        var p = ctx.getImageData(0, 0, 1, 1).data
        const newBgColor = "rgb(" + p[0] + "," + p[1] + "," + p[2] + ")"
        onColor && onColor(newBgColor)
      }

      // vid.play()
      drawingLoop() // start playing
      extractColor()
      // console.log("vw, vh, cw, ch", vw, vh, vw, vh)
    }
    vid.addEventListener("loadeddata", loadedDataListener)
  }, [canvasRef])

  return (
    <CanvasVideoWrapper {...props}>
      <Canvas ref={canvasRef} />
    </CanvasVideoWrapper>
  )
}
