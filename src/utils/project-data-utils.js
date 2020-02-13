import _get from "lodash/get"

export const mergeArrayById = (arr1 = [], arr2 = []) => {
  const ids = [...arr1, ...arr2].map(i => i.id)
  return ids
    .filter((v, i) => ids.indexOf(v) === i)
    .map(id => {
      const i1Content = arr1.filter(i1 => i1.id === id)[0]
      const i2Content = arr2.filter(i2 => i2.id === id)[0]
      let image
      if (
        _get(i1Content, "image.length", 0) > 0 &&
        _get(i2Content, "image.length", 0) > 0
      ) {
        image = mergeArrayById(i1Content.image, i2Content.image)
      }
      return { ...i1Content, ...i2Content, image }
    })
}

export const mergeProjects = (p1, p2) => {
  // Merge array
  const projectContentBody = mergeArrayById(
    p1.projectContentBody,
    p2.projectContentBody
  )

  const heroPicture = mergeArrayById(p1.heroPicture, p2.heroPicture)
  const projectCover = mergeArrayById(p1.projectCover, p2.projectCover)
  const projectVideo = mergeArrayById(p1.projectVideo, p2.projectVideo)
  const projectVideoSmall = mergeArrayById(
    p1.projectVideoSmall,
    p2.projectVideoSmall
  )

  return {
    ...p1,
    ...p2,
    projectContentBody,
    heroPicture,
    projectCover,
    projectVideo,
    projectVideoSmall,
  }
}
