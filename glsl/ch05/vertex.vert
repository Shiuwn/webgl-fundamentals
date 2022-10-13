vec2 reslution_normalize(vec2 position, vec2 resolution);
uniform vec2 u_resolution;
attribute vec2 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;

#include ../lib/resolution.glsl;

void main() {

  vec2 normal_position = reslution_normalize(a_position, u_resolution);
  gl_Position = vec4(normal_position, 0, 1);
  v_texCoord = a_texCoord;

}
