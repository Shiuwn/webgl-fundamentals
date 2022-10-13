import './style.css'
import paint from './painter/ch05'

/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')

const gl = canvas.getContext('webgl')

paint(gl)



