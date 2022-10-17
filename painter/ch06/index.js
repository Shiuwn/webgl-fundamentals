import vertexSource from '../../glsl/ch06/vertex.vert'
import fragSource from '../../glsl/ch06/frag.frag'
import { loadShader, createProgram } from '../../utils'
import { mat3 } from 'gl-matrix'

const renderSlider = () => {
  const container = document.getElementById('app')
  const wrapper = document.createElement('div')
  wrapper.classList.add('wrapper')
  wrapper.innerHTML = `
    <label>
      x: <input type="range" min="0" max="100" id="x" value="0"> 
    </label>
    <label>
      y:<input type="range" min="0" max="100" id="y" value="0">
    </label>
    <label>
      angel:<input type="range" min="0" max="360" id="angel" value="0">
    </label>
    <label>
      scale:<input type="range" min="50" max="150" id="scale" value="100">
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

  const positionBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuf)
  const position = [
    // left column
    0, 0, 30, 0, 0, 150, 0, 150, 30, 0, 30, 150,

    // top rung
    30, 0, 100, 0, 30, 30, 30, 30, 100, 0, 100, 30,

    // middle rung
    30, 60, 67, 60, 30, 90, 30, 90, 67, 60, 67, 90,
  ]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)
  const positionLoc = gl.getAttribLocation(program, 'a_position')

  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(positionLoc)

  const resolutionLoc = gl.getUniformLocation(program, 'u_resolution')
  const { width, height } = gl.canvas
  gl.uniform2f(resolutionLoc, width, height)

  const colorLoc = gl.getUniformLocation(program, 'u_color')
  gl.uniform4f(colorLoc, Math.random(), Math.random(), Math.random(), 1)

  const matLoc = gl.getUniformLocation(program, 'u_mat')
  gl.uniformMatrix3fv(
    matLoc,
    false,
    new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])
  )

  gl.clearColor(1, 1, 1, 1)

  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawArrays(gl.TRIANGLES, 0, 18)

  const draw = (mat) => {
    gl.uniformMatrix3fv(matLoc, false, mat)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 18)
  }

  const xSlider = document.querySelector('#x')
  const ySlider = document.querySelector('#y')
  const angelSlider = document.getElementById('angel')
  const scaleSlider = document.getElementById('scale')
  function rerender() {
    const xValue = xSlider.value
    const yValue = ySlider.value
    const scaleValue = scaleSlider.value * 0.01
    const mat = mat3.create()

    
    mat3.translate(mat, mat, [xValue * width * 0.01, yValue * height * 0.01])
    mat3.rotate(mat, mat, (angelSlider.value / 180) * Math.PI)
    mat3.scale(mat, mat, [scaleValue, scaleValue])
    draw(mat)
  }
  xSlider?.addEventListener('input', rerender)

  ySlider?.addEventListener('input', rerender)
  angelSlider?.addEventListener('input', rerender)
  scaleSlider?.addEventListener('input', rerender)
}
