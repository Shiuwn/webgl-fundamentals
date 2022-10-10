vec2 reslution_normalize(vec2, vec2);
#include ../lib/resolution.glsl;

attribute vec2 a_position;
uniform vec2 u_resolution;

void main() {
  vec2 normal_position = reslution_normalize(a_position, u_resolution);
  gl_Position = vec4(normal_position, 0, 1);

}