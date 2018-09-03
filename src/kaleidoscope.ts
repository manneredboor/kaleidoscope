type Point = { x: number; y: number }
type Triangle = [Point, Point, Point]

//
// Math
//

const point = (x: number, y: number): Point => ({ x, y })

const radians = (angle: number): number => (Math.PI / 180) * angle

const summPoints = (A: Point, B: Point): Point => point(A.x + B.x, A.y + B.y)

const substractPoints = (A: Point, B: Point): Point =>
  point(A.x - B.x, A.y - B.y)

// Rotates A around O using angle in degrees
const rotatePoint = (O: Point, A: Point, angle: number): Point => {
  const rad = radians(angle)
  const p = substractPoints(A, O)
  const rotated = point(
    p.x * Math.cos(rad) - p.y * Math.sin(rad),
    p.x * Math.sin(rad) + p.y * Math.cos(rad),
  )
  return summPoints(rotated, O)
}

const centerOfTriangle = (trngl: Triangle): Point =>
  point(
    (trngl[0].x + trngl[1].x + trngl[2].x) / 3,
    (trngl[0].y + trngl[1].y + trngl[2].y) / 3,
  )

function triangleInCircle(O: Point, r: number): Triangle {
  const A = point(O.x, O.y - r)
  return [A, rotatePoint(O, A, 120), rotatePoint(O, A, 240)]
}

// Finds B point in the triangle
const triangleFromBase = (A: Point, C: Point): Triangle => [
  A,
  rotatePoint(C, A, 60),
  C,
]

//
// Main
//

const growRotations: {
  length: number
  drawAt: number[]
}[] = [
  {
    drawAt: [0],
    length: 1,
  },
  {
    drawAt: [0, 1],
    length: 3,
  },
  {
    drawAt: [0, 1, 3],
    length: 6,
  },
  {
    drawAt: [1, 3, 6, 7],
    length: 9,
  },
  {
    drawAt: [0, 1, 4, 7, 9],
    length: 12,
  },
  {
    drawAt: [1, 3, 6, 7, 10, 13],
    length: 15,
  },
  {
    drawAt: [0, 1, 4, 7, 9, 12, 15],
    length: 18,
  },
  {
    drawAt: [1, 3, 6, 9, 10, 13, 16, 19],
    length: 21,
  },
  {
    drawAt: [0, 1, 4, 9],
    length: 24,
  },
]

// Will be multiplyed by 60deg
// prettier-ignore
const rotations = [
  [0],
  [5, 3, 1],
  [4, 2],
  [3, 1, 3, 1, 5, 1, 5, 3, 5],
  [0, 2, 0, 4],
  [1, 5, 3, 5, 1, 5, 3, 1, 3, 5, 3, 1, 5, 1, 3],
  [2, 4, 0, 4, 2, 0],
  [5, 3, 1, 5, 1, 3, 5, 3, 1, 5, 3, 5, 1, 3, 1, 5, 3, 1, 3, 5, 1],
  [4, 0, 2, 4, 2, 0, 4, 2],
  [3, 1, 5, 3, 1, 5, 3, 1, 5, 3, 1, 5],
]

const reflections = growRotations.reduce<Triangle[][]>(
  (allReflects, rotation) => [
    ...allReflects,
    allReflects[allReflects.length - 1]
      .map((triangle, i) =>
        triangle
          .map((A, j, trngl) => {
            const n = i * 3 + j
            const toDraw = rotation.drawAt.indexOf(n % rotation.length) !== -1
            const B = trngl[j < 2 ? j + 1 : 0]
            return toDraw && triangleFromBase(A, B)
          })
          .filter(trngl => Boolean(trngl)),
      )
      .reduce((all = [], cur) => [...all, ...cur]),
  ],
  [[triangleInCircle(point(0, 0), 1)]],
)

export function drawKaleidoscope({
  ctx,
  image,
  radius,
}: {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement | HTMLCanvasElement | false | undefined | null
  radius: number
}) {
  if (!image) return

  const rescale = (x: number) => x * radius

  ctx.save()
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)

  reflections.forEach((triangles, i) => {
    ctx.save()
    ctx.globalAlpha = 1 - i * 0.075
    triangles.forEach((triangle, j) => {
      ctx.save()

      ctx.beginPath()
      ctx.moveTo(rescale(triangle[0].x), rescale(triangle[0].y))
      ctx.lineTo(rescale(triangle[1].x), rescale(triangle[1].y))
      ctx.lineTo(rescale(triangle[2].x), rescale(triangle[2].y))
      ctx.closePath()
      ctx.clip()

      const centerP = centerOfTriangle(triangle)
      ctx.translate(rescale(centerP.x), rescale(centerP.y))

      const angle = rotations[i] ? rotations[i][j % rotations[i].length] : 0
      ctx.rotate(radians(60 * angle))

      if (i % 2 === 1) ctx.scale(-1, 1)

      if (rotations[i]) {
        ctx.drawImage(image, -radius, -radius, radius * 2, radius * 2)
      }
      ctx.restore()
    })
    ctx.restore()
  })
  ctx.restore()
}
