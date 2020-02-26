import React from "react"

export const ProjectVideo = ({ cover, src, type }) => {
  const videoRef = React.useRef()

  /** Trying to fix muted not being set on ios video tag */
  if (videoRef.current && !videoRef.current.defaultMuted) {
    videoRef.current.defaultMuted = true
    videoRef.current.muted = true
  }

  return (
    <video
      preload="auto"
      autoPlay={true}
      loop={true}
      muted={true}
      playsInline={true}
      ref={videoRef}
      poster={cover}
    >
      <source src={src} type={type} />
    </video>
  )
}
