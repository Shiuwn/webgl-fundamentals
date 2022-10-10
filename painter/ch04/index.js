import vertexSource from '../../glsl/ch04/vertex.vert'
import fragSource from '../../glsl/ch04/frag.frag'
import { loadShader, createProgram } from '../../utils'

/**
 *
 * @param {WebGLRenderingContext} gl
 */
export default function paint(gl) {
  console.log(vertexSource)
  const vShader = loadShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fShader = loadShader(gl, gl.FRAGMENT_SHADER, fragSource)
  if (!vShader || !fShader) return
  const program = createProgram(gl, fShader, vShader)
  if (!program) return
  gl.useProgram(program)

  const positionBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuf)
  const position = [
    100, 200, 300, 200, 100, 300,

    100, 300, 300, 30, 300, 200,
  ]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)

  const aPositionLoc = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(aPositionLoc)
  gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0)

  const resolutionLoc = gl.getUniformLocation(program, 'u_resolution')

  const { width, height } = gl.canvas
  gl.uniform2fv(resolutionLoc, [width, height])

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  {
    const offset = 0
    const count = 3
    const mode = gl.TRIANGLES
    gl.drawArrays(mode, offset, count)
  }

  setTimeout(() => {
    gl.clearColor(1, 1, 1, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    const position = [
      150, 250, 350, 250, 150, 350,

      150, 350, 350, 350, 350, 250,
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)

    const offset = 0
    const count = 3
    const mode = gl.TRIANGLES
    gl.drawArrays(mode, offset, count)
  }, 1000)
}
