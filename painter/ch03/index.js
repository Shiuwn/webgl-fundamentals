import vertexSource from '../../glsl/ch03/vertex.vert'
import fragSource from '../../glsl/ch03/frag.frag'
import { loadShader, createProgram } from '../../utils'


/**
 *
 * @param {WebGLRenderingContext} gl
 */
export default function paint(gl) {
  const vShader = loadShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fShader = loadShader(gl, gl.FRAGMENT_SHADER, fragSource)
  if (!vShader || !fShader) return
  const program = createProgram(gl, fShader, vShader)
  if (!program) return
  gl.useProgram(program)


  const aPosition = gl.getAttribLocation(program, 'a_position')
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

  const position = [0, 0, 0, 0.5, 0.7, 0]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)

  gl.enableVertexAttribArray(aPosition)
  const size = 2
  const type = gl.FLOAT
  const normal = false
  const stride = 0
  const offset = 0
  gl.vertexAttribPointer(aPosition, size, type, normal, stride, offset)

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  {
    const primitiveType = gl.TRIANGLES
    const offset = 0
    const count = 3
    gl.drawArrays(primitiveType, offset, count)
  }
}
