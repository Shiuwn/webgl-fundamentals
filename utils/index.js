export const error = (msg) => {
  console.error(`[error] ${msg}`)
}
/**
 * @param {WebGLRenderingContext} gl
 * @param {number} type
 * @param {string} source
 */
export function loadShader(gl, type, source) {
  const shader = gl.createShader(type)
  if (!shader) {
    error('unable to create shader')
    return null
  }
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!compiled) {
    const info = gl.getShaderInfoLog(shader)
    error(`Failed to compile shader: ${info}`)
    gl.deleteShader(shader)
    return null
  }
  return shader
}
/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} fshader
 * @param {WebGLShader} vshader
 */

export const createProgram = (gl, fshader, vshader) => {
  const program = gl.createProgram()
  if (!program) {
    error('Failed to create program')
    return
  }
  gl.attachShader(program, fshader)
  gl.attachShader(program, vshader)

  gl.linkProgram(program)

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linked) {
    const info = gl.getProgramInfoLog(program)
    error(`Failed to link program: ${info}`)
    gl.deleteProgram(program)
    gl.deleteShader(fshader)
    gl.deleteShader(vshader)
    return null
  }
  return program
}
