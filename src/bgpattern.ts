const patternImage = new Image()
patternImage.src = 'pattern.jpg'
patternImage.addEventListener(
  'load',
  () => {
    pattern.width = patternImage.width
    pattern.height = patternImage.height
  },
  false,
)

const pattern = document.createElement('canvas')
const patternCtx = pattern.getContext('2d')

export function renderBgPattern(state: any, time: number) {
  if (!patternImage.complete) return false
  patternCtx.save()
  patternCtx.clearRect(0, 0, pattern.width, pattern.height)
  const srncx = state.width / 2
  const srncy = state.height / 2
  const mousx = state.mouseX - srncx
  const mousy = state.mouseY - srncy
  const angle = Math.atan2(mousy, mousx) + ((time / 20000) % 360)
  patternCtx.translate(pattern.width / 2, pattern.height / 2)
  patternCtx.rotate(angle)
  patternCtx.drawImage(
    patternImage,
    -patternImage.width / 2,
    -patternImage.height / 2,
  )
  patternCtx.restore()
  return pattern
}
