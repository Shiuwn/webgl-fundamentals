import vertexSource from '../../glsl/ch05/vertex.vert'
import fragSource from '../../glsl/ch05/frag.frag'
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

  const positionBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuf)
  const position = [
    100, 200, 300, 200, 100, 300,

    100, 300, 300, 300, 300, 200,
  ]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)
  const positionLoc = gl.getAttribLocation(program, 'a_position')

  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(positionLoc)

  const texCoordBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuf)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1]),
    gl.STATIC_DRAW
  )
  const texCoordLoc = gl.getAttribLocation(program, 'a_texCoord')
  gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(texCoordLoc)

  const resolutionLoc = gl.getUniformLocation(program, 'u_resolution')
  const {width, height} = gl.canvas
  gl.uniform2f(resolutionLoc, width, height)

  const image = new Image()
  image.src = './leaves.jpg'

  image.onload = () => {
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

    gl.clearColor(1, 1, 1, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 6)

  }
}
