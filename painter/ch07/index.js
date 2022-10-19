import vertexSource from '../../glsl/ch07/vertex.vert'
import fragSource from '../../glsl/ch07/frag.frag'
import { loadShader, createProgram } from '../../utils'
import { mat3, mat4, vec3 } from 'gl-matrix'

const renderSlider = () => {
  const container = document.getElementById('app')
  const wrapper = document.createElement('div')
  wrapper.classList.add('wrapper')
  wrapper.innerHTML = `
    <label>
      angel:<input type="range" min="0" max="360" id="angel" value="0">
    </label>
  `
  container.appendChild(wrapper)
}
/**
 *
 * @param {WebGLRenderingContext} gl
 */
export default function paint(gl) {
  renderSlider()
  const vShader = loadShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fShader = loadShader(gl, gl.FRAGMENT_SHADER, fragSource)
  if (!vShader || !fShader) return
  const program = createProgram(gl, fShader, vShader)
  if (!program) return
  gl.useProgram(program)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)

  const positionBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuf)
  const position = [
    // left column front
    0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0,

    // top rung front
    30, 0, 0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0,

    // middle rung front
    30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0,

    // left column back
    0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30,

    // top rung back
    30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30,

    // middle rung back
    30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30,

    // top
    0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30,

    // top rung right
    100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30,

    // under top rung
    30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0,

    // between top rung and middle
    30, 30, 0, 30, 60, 30, 30, 30, 30, 30, 30, 0, 30, 60, 0, 30, 60, 30,

    // top of middle rung
    30, 60, 0, 67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60, 0, 67, 60, 30,

    // right of middle rung
    67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30,

    // bottom of middle rung.
    30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0,

    // right of bottom
    30, 90, 0, 30, 150, 30, 30, 90, 30, 30, 90, 0, 30, 150, 0, 30, 150, 30,

    // bottom
    0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150, 0,

    // left side
    0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0,
  ]
  

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)
  const positionLoc = gl.getAttribLocation(program, 'a_position')

  gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(positionLoc)

  const normals = [
    // left column front
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,

    // top rung front
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,

    // middle rung front
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,

    // left column back
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,

    // top rung back
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,

    // middle rung back
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,

    // top
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,

    // top rung right
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,

    // under top rung
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,

    // between top rung and middle
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,

    // top of middle rung
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,

    // right of middle rung
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,

    // bottom of middle rung.
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,

    // right of bottom
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,

    // bottom
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,

    // left side
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
  ]
  const normalLoc = gl.getAttribLocation(program, 'a_normal')
  const normalBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW)
  gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(normalLoc)
  

  const deg2Rad = (deg) => (deg / 180) * Math.PI

  const mpvMatLoc = gl.getUniformLocation(program, 'u_worldViewProjection')
  const viewMat = mat4.create()
  mat4.lookAt(viewMat, [100, 150, 200], [0, 35, 0], [0, 1, 0])

  let rotateAngle = 0
  const modelMat = mat4.create()

  mat4.rotate(
    modelMat,
    modelMat,
    deg2Rad(rotateAngle),
    new Float32Array([0, 1, 0])
  )
  mat4.rotate(modelMat, modelMat, deg2Rad(180), new Float32Array([1, 0, 0]))
  mat4.translate(modelMat, modelMat, [-50, -75, -15])
  const modelMatLoc = gl.getUniformLocation(program, 'u_world')
  const transposeMat = mat4.create()
  gl.uniformMatrix4fv(modelMatLoc, false, mat4.transpose(transposeMat, mat4.invert(transposeMat, modelMat)))

  const projectionMat = mat4.create()
  const { width, height } = gl.canvas

  mat4.perspective(projectionMat, deg2Rad(60), width / height, 1, 2000)

  const mpvMat = mat4.create()
  mat4.mul(mpvMat, viewMat, modelMat)
  mat4.mul(mpvMat, projectionMat, mpvMat)

  gl.uniformMatrix4fv(mpvMatLoc, false, mpvMat)
  gl.uniformMatrix4fv(modelMatLoc, false, modelMat)

  const colorLoc = gl.getUniformLocation(program, 'u_color')
  gl.uniform4f(colorLoc, 0.2, 1, 0.2, 1)

  const lightDirection = gl.getUniformLocation(program, 'u_lightDirection')
  const vec = vec3.normalize(vec3.create(), [0.5, 0.7, 1])
  console.log(vec)
  gl.uniform3fv(lightDirection, vec)

  gl.clearColor(1, 1, 1, 1)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  gl.drawArrays(gl.TRIANGLES, 0, 16 * 6)

  const rerender = function () {
    rotateAngle = +this.value
    const modelMat = mat4.create()
    mat4.rotate(
      modelMat,
      modelMat,
      deg2Rad(rotateAngle),
      new Float32Array([0, 1, 0])
    )
    mat4.rotate(modelMat, modelMat, deg2Rad(180), new Float32Array([1, 0, 0]))
    mat4.translate(modelMat, modelMat, [-50, -75, -15])
    const mpvMat = mat4.create()
    mat4.mul(mpvMat, viewMat, modelMat)
    mat4.mul(mpvMat, projectionMat, mpvMat)
    const transposeMat = mat4.create()
    gl.uniformMatrix4fv(modelMatLoc, false, mat4.transpose(transposeMat, mat4.invert(transposeMat, modelMat)))

    gl.uniformMatrix4fv(mpvMatLoc, false, mpvMat)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 16 * 6)
  }

  const angelSlider = document.getElementById('angel')
  angelSlider?.addEventListener('input', rerender)
}
