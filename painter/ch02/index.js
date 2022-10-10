import vertexSource from '../../glsl/ch02/vertex.vert'
import fragSource from '../../glsl/ch02/frag.frag'
import { loadShader, createProgram } from '../../utils'

/**
 *
 * @param {WebGLRenderingContext} gl
 */
export default function paint(gl) {
  const vShader = loadShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fShader = loadShader(gl, gl.FRAGMENT_SHADER, fragSource)
  if(!vShader || !fShader) return
  const program = createProgram(gl, fShader, vShader)
  if(!program) return
  gl.useProgram(program)

  const aPosition = gl.getAttribLocation(program, 'a_position')
  gl.vertexAttrib2fv(aPosition, [0.5, 0.5])

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, 1)
}
