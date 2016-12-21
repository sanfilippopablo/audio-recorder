export const readableDuration = (duration) => {
  const mins = Math.floor(duration / 60)
  const secs = duration % 60

  let strMins = String(mins)
  if (mins < 10) {
    strMins = '0' + strMins
  }

  let strSecs = String(secs)
  if (secs < 10) {
    strSecs = '0' + strSecs
  }

  return `${strMins}:${strSecs}`
}
