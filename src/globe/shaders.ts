/** The globe's dot field is drawn as a single THREE.Points with a custom
 *  shader. Two variants exist across the prototypes:
 *
 *  `plain`    every land dot blinks in the same colour.
 *  `coverage` dots carry a region and a distance from the home market, and a
 *             travelling wave lights them up outward from it. v4 uses this to
 *             show coverage expanding from the US to the rest of the world.
 */

export const PLAIN_VERTEX = /* glsl */ `
  uniform float u_time;
  uniform vec3 u_cameraDir;
  attribute float a_random;
  varying float v_random;
  varying float v_facing;
  void main() {
    v_random = a_random;
    vec3 worldNormal = normalize((modelMatrix * vec4(normalize(position), 0.0)).xyz);
    v_facing = dot(worldNormal, u_cameraDir);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 3.0;
  }
`

/** Carves each point sprite into a five-pointed star, rotated by the point's
 *  own random seed, then blinks it. Points on the far side of the sphere are
 *  discarded outright, which is what keeps the back of the globe clear. */
const STAR_BODY = /* glsl */ `
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float rotAngle = v_random * 6.28;
  float cs = cos(rotAngle), sn = sin(rotAngle);
  uv = vec2(uv.x * cs - uv.y * sn, uv.x * sn + uv.y * cs);
  float angle = atan(uv.y, uv.x);
  float radius = length(uv);
  float a = 3.14159 / 5.0;
  float sector = floor(angle / (2.0 * a) + 0.5);
  float sectorAngle = sector * 2.0 * a;
  vec2 tip = vec2(cos(sectorAngle), sin(sectorAngle));
  float d = dot(uv, tip);
  if (d > cos(a)) discard;
  if (radius > 0.95) discard;
`

export const plainFragment = (darken: number) => /* glsl */ `
  uniform float u_time;
  uniform vec3 u_color;
  varying float v_random;
  varying float v_facing;
  void main() {
    if (v_facing < 0.0) discard;
    ${STAR_BODY}
    float edgeFade = smoothstep(0.0, 0.6, v_facing);
    float blink = 0.75 + 0.25 * sin(u_time * 2.0 + v_random * 12.56);
    vec3 darkenedColor = u_color * ${darken.toFixed(2)};
    gl_FragColor = vec4(darkenedColor, blink * edgeFade);
  }
`

export const COVERAGE_VERTEX = /* glsl */ `
  uniform float u_time;
  uniform vec3 u_cameraDir;
  uniform float u_wave;
  uniform float u_homeLit;
  uniform float u_intlLit;
  uniform float u_waveActive;
  attribute float a_random;
  attribute float a_region;  // 1.0 = home market, 0.0 = cross-border
  attribute float a_dist;    // normalised distance from the home anchor
  varying float v_random;
  varying float v_facing;
  varying float v_lit;
  varying float v_front;
  void main() {
    v_random = a_random;
    vec3 worldNormal = normalize((modelMatrix * vec4(normalize(position), 0.0)).xyz);
    v_facing = dot(worldNormal, u_cameraDir);

    // Whether this dot's market is meant to be lit at all.
    float target = mix(u_intlLit, u_homeLit, a_region);
    // Ignition sweeps outward from the home market as u_wave advances, so
    // reversing u_wave dims the globe in the opposite order.
    float gate = mix(1.0, step(a_dist, u_wave), u_waveActive);
    v_lit = target * gate;
    // Brief flare on the travelling front.
    v_front = target * u_waveActive * (1.0 - smoothstep(0.0, 0.13, abs(u_wave - a_dist)));

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 3.0;
  }
`

export const COVERAGE_FRAGMENT = /* glsl */ `
  uniform float u_time;
  uniform vec3 u_colorDim;
  uniform vec3 u_colorLit;
  varying float v_random;
  varying float v_facing;
  varying float v_lit;
  varying float v_front;
  void main() {
    if (v_facing < 0.0) discard;
    ${STAR_BODY}
    float edgeFade = smoothstep(0.0, 0.6, v_facing);
    float blink = 0.75 + 0.25 * sin(u_time * 2.0 + v_random * 12.56);
    // Unmanaged markets read as a lighter purple rather than grey; managed
    // markets come forward in full indigo, brightest right on the front.
    vec3 color = mix(u_colorDim, u_colorLit, v_lit);
    color += u_colorLit * v_front * 0.6;
    gl_FragColor = vec4(color, blink * edgeFade);
  }
`
