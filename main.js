import './style.css'
import paint from './painter/ch06'

/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')

const gl = canvas.getContext('webgl')

paint(gl)



