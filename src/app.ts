import { drawKaleidoscope } from 'kaleidoscope'
import { renderBgPattern } from 'bgpattern'
// import { renderRollingStuff } from 'rollingStuff'

const canvas = document.getElementById('kaleido') as HTMLCanvasElement
const ctx = canvas.getContext('2d')

const canvas2 = document.getElementById('kaleido-filter') as HTMLCanvasElement
const ctx2 = canvas2.getContext('2d')

export const state: {
  height?: number
  width?: number
  mouseX?: number
  mouseY?: number
} = {
  mouseX: 0,
  mouseY: 0,
}

function updateSizes() {
  state.height = window.innerHeight
  state.width = window.innerWidth
  canvas.width = state.width
  canvas.height = state.height
  canvas2.width = state.width
  canvas2.height = state.height
}

document.addEventListener(
  'mousemove',
  e => {
    state.mouseX = e.pageX
    state.mouseY = e.pageY
  },
  false,
)

window.addEventListener('resize', updateSizes, false)
updateSizes()

function render(time: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const pattern = renderBgPattern(state, time)

  drawKaleidoscope({
    ctx,
    image: pattern,
    radius: Math.max(120, Math.max(state.width / 8, state.height / 8)),
  })

  ctx2.drawImage(canvas, 0, 0)
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
