vec2 reslution_normalize(vec2 position, vec2 resolution);
#include ../lib/resolution.glsl;
attribute vec2 a_position;
uniform vec2 u_resolution;
uniform mat3 u_mat;

void main() {
  vec3 new_positioin = u_mat * vec3(a_position, 1);
  vec2 normalized_position = reslution_normalize(new_positioin.xy, u_resolution);
  gl_Position = vec4(normalized_position, 0, 1);
}