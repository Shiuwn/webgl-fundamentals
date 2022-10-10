vec2 reslution_normalize(vec2 position, vec2 resolution) {
  vec2 ratio = position / resolution;
  return ratio * 2.0 - 1.0;
}