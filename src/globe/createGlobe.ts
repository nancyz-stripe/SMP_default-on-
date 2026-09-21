import * as THREE from 'three'
import {
  COVERAGE_FRAGMENT,
  COVERAGE_VERTEX,
  PLAIN_VERTEX,
  plainFragment,
} from './shaders'

/** The dotted globe with the travelling arcs, shared by the 15 prototypes that
 *  show it. Each of those had its own copy of this scene; the copies differed
 *  only in the handful of values that are options here.
 *
 *  Ported from three r128 to 0.186, which needs two deliberate opt-outs to
 *  keep the original's appearance:
 *
 *  1. Colour management. r128 fed colours to the GPU as authored. Modern three
 *     converts sRGB to linear on the way in and back on the way out, which
 *     lightens every colour in this scene. Disabled so the tokens land exactly
 *     as the prototypes chose them.
 *
 *  2. Light falloff. These point lights are thousands of units from the globe
 *     and were written for r128's non-physical lighting, where a light with
 *     `distance: 0` did not attenuate at all. Modern three always applies
 *     `decay`, so at decay 2 the inverse-square falloff over that distance
 *     would leave the globe lit by ambient light alone. Passing decay 0
 *     restores r128's behaviour.
 */

// r128 semantics, set once before any material is built.
THREE.ColorManagement.enabled = false

/** Sampled for land: a dot is kept where the map is opaque. */
const MAP_URL =
  'https://images.ctfassets.net/fzn2n1nzq965/11064gUb2CgTJXKVwAt5J9/297a98a65d04d4fbb979072ce60466ab/map_fill-a78643e8.png'

const DOT_COUNT = 40000
const MAX_ARCS = 5

type City = { lat: number; lng: number }

/** Endpoints the arcs pick from. */
const MAJOR_CITIES: City[] = [
  { lat: 40.7, lng: -74 }, { lat: 37.8, lng: -122.4 }, { lat: 19.4, lng: -99.1 },
  { lat: -23.5, lng: -46.6 }, { lat: 51.5, lng: -0.1 }, { lat: 48.9, lng: 2.3 },
  { lat: 52.5, lng: 13.4 }, { lat: 55.8, lng: 37.6 }, { lat: 25.2, lng: 55.3 },
  { lat: 19.1, lng: 72.9 }, { lat: 39.9, lng: 116.4 }, { lat: 35.7, lng: 139.7 },
  { lat: 1.3, lng: 103.8 }, { lat: -33.9, lng: 151.2 }, { lat: 6.5, lng: 3.4 },
  { lat: 30, lng: 31.2 }, { lat: -26.2, lng: 28 }, { lat: 43.7, lng: -79.4 },
  { lat: 41.9, lng: -87.6 },
]

/** The coverage variant splits the pool, so an arc can be shown as domestic or
 *  as cross-border depending on what's being managed. */
const HOME_CITIES: City[] = [
  { lat: 40.7, lng: -74 }, { lat: 37.8, lng: -122.4 }, { lat: 41.9, lng: -87.6 },
  { lat: 34.05, lng: -118.24 }, { lat: 25.8, lng: -80.2 }, { lat: 47.6, lng: -122.3 },
  { lat: 30.3, lng: -97.7 }, { lat: 39.7, lng: -105.0 }, { lat: 33.75, lng: -84.4 },
]

const INTL_CITIES: City[] = [
  { lat: 19.4, lng: -99.1 }, { lat: -23.5, lng: -46.6 }, { lat: 51.5, lng: -0.1 },
  { lat: 48.9, lng: 2.3 }, { lat: 52.5, lng: 13.4 }, { lat: 55.8, lng: 37.6 },
  { lat: 25.2, lng: 55.3 }, { lat: 19.1, lng: 72.9 }, { lat: 39.9, lng: 116.4 },
  { lat: 35.7, lng: 139.7 }, { lat: 1.3, lng: 103.8 }, { lat: -33.9, lng: 151.2 },
  { lat: 6.5, lng: 3.4 }, { lat: 30, lng: 31.2 }, { lat: -26.2, lng: 28 },
  { lat: 43.7, lng: -79.4 }, { lat: 52.4, lng: 4.9 }, { lat: 59.3, lng: 18.1 },
  { lat: 37.6, lng: 127.0 },
]

const ARC_COLOURS: [number, number][] = [
  [0xf94148, 0xff8352],
  [0x533afd, 0x0d8eff],
  [0xf94148, 0x533afd],
  [0xff8352, 0x0d8eff],
]

/** Home market for the coverage variant: the United States, with an anchor the
 *  wave radiates from. */
const HOME = { latMin: 24, latMax: 50, lngMin: -125, lngMax: -66 }
const HOME_ANCHOR = { lat: 39.5, lng: -98.35 }

export type GlobePalette = 'soft' | 'flat'

export type GlobeOptions = {
  /** Multiplier on the base radius. The prototypes use 1 (large), 0.85,
   *  0.830875 and 0.7225 (medium). */
  scale?: number
  /** `soft` is the later look: a translucent sphere with a fill light. `flat`
   *  is the earlier one, opaque and unfilled. */
  palette?: GlobePalette
  /** How far the dot colour is darkened. 0.55 on the soft palette, 0.75 on the
   *  flat one. */
  dotDarken?: number
  /** Swaps in the coverage-wave shader, splits the arc pool by region, and
   *  makes `setMode` live. Only v4 uses this. */
  coverage?: boolean
  /** Where the map image's left edge sits in longitude.
   *
   *  `shifted` samples it as `lng + 180`, which is what 14 of the 15 globes do.
   *  The cloud still looks like Earth, but every dot is half a turn from its
   *  real coordinates — harmless while nothing depends on where a dot actually
   *  is. `true` is v4's correction, measured against 50 known land/sea points;
   *  it is required there because region lighting and the city arcs would
   *  otherwise land on the wrong continent. */
  longitude?: 'shifted' | 'true'
  /** Called with the globe's diameter in px whenever it changes, so the page
   *  can size a glow circle or publish a CSS variable the value cards read. */
  onDiameter?: (diameter: number) => void
  /** Refit on resize by zooming the camera rather than rebuilding the scene.
   *  The sphere, dots and arcs are built once at the initial radius, so this is
   *  much cheaper and is what the onboarding flow uses. */
  refitByZoom?: boolean
}

/** What Stripe is managing, which the coverage globe reflects. */
export type CoverageMode = 'self' | 'cross_border' | 'all'

export type GlobeHandle = {
  /** Coverage variant only. Sets the target state the frame loop tweens
   *  towards, and which arcs are allowed. */
  setMode: (mode: CoverageMode) => void
  dispose: () => void
}

type Arc = {
  line: THREE.Line
  glowStart: THREE.Group
  glowEnd: THREE.Group
  totalPoints: number
  created: number
  drawDuration: number
  holdDuration: number
  fadeDuration: number
}

function unitVec(lat: number, lng: number): [number, number, number] {
  const a = (lat * Math.PI) / 180
  const o = (lng * Math.PI) / 180
  return [Math.cos(a) * Math.sin(o), Math.sin(a), Math.cos(a) * Math.cos(o)]
}

export function createGlobe(container: HTMLElement, options: GlobeOptions = {}): GlobeHandle {
  const {
    scale = 1,
    palette = 'soft',
    dotDarken = palette === 'soft' ? 0.55 : 0.75,
    coverage = false,
    longitude = coverage ? 'true' : 'shifted',
    onDiameter,
    refitByZoom = false,
  } = options

  const w = container.clientWidth
  const h = container.clientHeight

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, 1, 10000)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace
  renderer.sortObjects = false
  container.appendChild(renderer.domElement)

  const radiusFor = (width: number, height: number) =>
    (100 + Math.min(width, height) * 0.25) * scale

  const globeRadius = radiusFor(w, h)
  const globeSegments = Math.floor((globeRadius / 250) * 10) + 20
  camera.position.z = globeRadius * 4

  onDiameter?.(globeRadius * 2)

  const globeContainer = new THREE.Group()
  globeContainer.rotation.x = Math.PI * 0.1111
  globeContainer.rotation.y = Math.PI * 0.55
  scene.add(globeContainer)

  const sphereGeometry = new THREE.SphereGeometry(globeRadius, globeSegments, globeSegments)
  const sphereMaterial =
    palette === 'soft'
      ? new THREE.MeshPhongMaterial({
          color: new THREE.Color('#f7f6fc'),
          shininess: 3,
          transparent: true,
          opacity: 0.85,
        })
      : new THREE.MeshPhongMaterial({ color: new THREE.Color('#f1f2f8'), shininess: 5 })
  globeContainer.add(new THREE.Mesh(sphereGeometry, sphereMaterial))

  // Point lights pass decay 0 — see the note at the top of this file.
  if (palette === 'soft') {
    scene.add(new THREE.AmbientLight(new THREE.Color('#F8F7FC'), 1.3))
    const backLight = new THREE.PointLight(new THREE.Color('#666677'), 0.08, 0, 0)
    backLight.position.set(-1000, -1100, -3300)
    scene.add(backLight)
    const frontLight = new THREE.PointLight(new THREE.Color('#777788'), 0.5, 0, 0)
    frontLight.position.set(-3000, 3000, 3300)
    scene.add(frontLight)
    // Soft fill from the lower right to lift the shaded side of the sphere.
    const fillLight = new THREE.DirectionalLight(new THREE.Color('#FFFFFF'), 0.35)
    fillLight.position.set(2, -2, 2)
    scene.add(fillLight)
  } else {
    scene.add(new THREE.AmbientLight(new THREE.Color('#ECEBF5'), 1.0))
    const backLight = new THREE.PointLight(new THREE.Color('#222222'), 0.2, 0, 0)
    backLight.position.set(-1000, -1100, -3300)
    scene.add(backLight)
    const frontLight = new THREE.PointLight(new THREE.Color('#44444f'), 0.8, 0, 0)
    frontLight.position.set(-3000, 3000, 3300)
    scene.add(frontLight)
  }

  const dotUniforms: Record<string, THREE.IUniform> = coverage
    ? {
        u_time: { value: 0 },
        u_cameraDir: { value: new THREE.Vector3(0, 0, 1) },
        u_colorDim: { value: new THREE.Color('#9c8ee9') }, // unmanaged: light purple
        u_colorLit: { value: new THREE.Color('#6f66f2') },
        u_wave: { value: 0 },
        u_homeLit: { value: 0 },
        u_intlLit: { value: 0 },
        u_waveActive: { value: 0 },
      }
    : {
        u_time: { value: 0 },
        u_color: { value: new THREE.Color('#b8c0f0') },
        u_cameraDir: { value: new THREE.Vector3(0, 0, 1) },
      }

  // --- Dot field -----------------------------------------------------------
  // Sampled off the world map: points are distributed evenly over the sphere,
  // and kept wherever the map is opaque.
  let dotPoints: THREE.Points | null = null
  let disposed = false

  const anchorVec = unitVec(HOME_ANCHOR.lat, HOME_ANCHOR.lng)
  const isHome = (lat: number, lng: number) =>
    lat >= HOME.latMin && lat <= HOME.latMax && lng >= HOME.lngMin && lng <= HOME.lngMax

  const mapImg = new Image()
  mapImg.crossOrigin = 'anonymous'
  mapImg.src = MAP_URL
  mapImg.onload = () => {
    if (disposed) return
    const c = document.createElement('canvas')
    c.width = mapImg.width
    c.height = mapImg.height
    const ctx = c.getContext('2d')
    if (!ctx) return
    ctx.drawImage(mapImg, 0, 0)
    const imgData = ctx.getImageData(0, 0, c.width, c.height)

    const positions: number[] = []
    const randoms: number[] = []
    const regions: number[] = []
    const dists: number[] = []

    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT)
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi
      const latDeg = 90 - (phi * 180) / Math.PI
      const lngDeg = (((theta * 180) / Math.PI) % 360) - 180
      const u =
        longitude === 'true'
          ? (((lngDeg % 360) + 360) % 360) / 360
          : (lngDeg + 180) / 360
      const v = (90 - latDeg) / 180
      const px = Math.floor(u * c.width) % c.width
      const py = Math.floor(v * c.height) % c.height
      const idx = (py * c.width + px) * 4
      if (imgData.data[idx + 3] <= 128) continue

      const latRad = (latDeg * Math.PI) / 180
      const lngRad = (lngDeg * Math.PI) / 180
      positions.push(
        globeRadius * Math.cos(latRad) * Math.sin(lngRad),
        globeRadius * Math.sin(latRad),
        globeRadius * Math.cos(latRad) * Math.cos(lngRad),
      )
      randoms.push(Math.random())

      if (coverage) {
        // 1 while sampling, inverted to the shader's convention below.
        regions.push(isHome(latDeg, lngDeg) ? 1 : 0)
        // Great-circle distance from the anchor, normalised after the loop so
        // u_wave = 1 always finishes sweeping the whole globe.
        const [x, y, z] = unitVec(latDeg, lngDeg)
        const dot = x * anchorVec[0] + y * anchorVec[1] + z * anchorVec[2]
        dists.push(Math.acos(Math.max(-1, Math.min(1, dot))))
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('a_random', new THREE.Float32BufferAttribute(randoms, 1))
    if (coverage) {
      const maxDist = dists.reduce((m, d) => (d > m ? d : m), 0) || 1
      // The shader reads a_region as 0 = home, 1 = international, which is the
      // inverse of how it was sampled.
      geo.setAttribute(
        'a_region',
        new THREE.Float32BufferAttribute(regions.map((r) => (r === 1 ? 0 : 1)), 1),
      )
      geo.setAttribute(
        'a_dist',
        new THREE.Float32BufferAttribute(dists.map((d) => d / maxDist), 1),
      )
    }

    const mat = new THREE.ShaderMaterial({
      uniforms: dotUniforms,
      vertexShader: coverage ? COVERAGE_VERTEX : PLAIN_VERTEX,
      fragmentShader: coverage ? COVERAGE_FRAGMENT : plainFragment(dotDarken),
      transparent: true,
      depthWrite: false,
    })
    dotPoints = new THREE.Points(geo, mat)
    globeContainer.add(dotPoints)
    // Ignite once the dots exist, so the opening sweep is never missed.
    if (coverage) window.setTimeout(ignite, 250)
  }

  // --- Coverage state ------------------------------------------------------
  // The globe's appearance is a function of the selected mode. The targets are
  // set on selection; the frame loop eases the live values towards them.
  let arcMode: CoverageMode = 'self'
  const live = { wave: 0, home: 0, intl: 0, active: 0 }
  const target = { wave: 0, home: 0, intl: 0 }

  // --- Arcs ----------------------------------------------------------------
  const arcs: Arc[] = []

  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

  /** Which arcs are allowed depends on what Stripe is managing: nothing when
   *  self-managed, home↔international under cross-border, and domestic pairs
   *  too once all payments are covered. */
  function pickPair(): [City, City] | null {
    if (!coverage) {
      const a = pick(MAJOR_CITIES)
      let b = pick(MAJOR_CITIES)
      while (b === a) b = pick(MAJOR_CITIES)
      return [a, b]
    }
    if (arcMode === 'self') return null
    if (arcMode === 'cross_border') return [pick(HOME_CITIES), pick(INTL_CITIES)]
    if (Math.random() < 0.4) {
      const a = pick(HOME_CITIES)
      let b = pick(HOME_CITIES)
      while (b === a) b = pick(HOME_CITIES)
      return [a, b]
    }
    return [pick(HOME_CITIES), pick(INTL_CITIES)]
  }

  const cityToVec3 = (city: { lat: number; lng: number }) => {
    const r = globeRadius + 1
    const latRad = (city.lat * Math.PI) / 180
    const lngRad = (city.lng * Math.PI) / 180
    return new THREE.Vector3(
      r * Math.cos(latRad) * Math.sin(lngRad),
      r * Math.sin(latRad),
      r * Math.cos(latRad) * Math.cos(lngRad),
    )
  }

  /** A dot with a ring around it, sitting just off the surface. The polygon
   *  offset is what keeps it from being swallowed by the sphere. */
  function createEndpointMarker(color: THREE.Color) {
    const group = new THREE.Group()
    const offset = { polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }
    const dotMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1, ...offset })
    group.add(new THREE.Mesh(new THREE.SphereGeometry(2.2, 12, 12), dotMat))
    const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1, ...offset })
    group.add(new THREE.Mesh(new THREE.TorusGeometry(5.5, 0.6, 8, 32), ringMat))
    group.userData = { dotMat, ringMat }
    return group
  }

  const setMarkerOpacity = (marker: THREE.Group, opacity: number) => {
    marker.userData.dotMat.opacity = opacity
    marker.userData.ringMat.opacity = opacity
  }

  function createArc() {
    if (disposed || arcs.length >= MAX_ARCS) return
    const pair = pickPair()
    if (!pair) return
    const [cityA, cityB] = pair

    const start = cityToVec3(cityA)
    const end = cityToVec3(cityB)
    const dist = start.distanceTo(end)
    // Longer hops bow further out, so the arcs don't all sit at one height.
    const arcHeight = 1.8 + (dist / (globeRadius * 2)) * 1.5
    const mid = start
      .clone()
      .add(end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(globeRadius * arcHeight)
    const curve = new THREE.CubicBezierCurve3(
      start,
      start.clone().lerp(mid, 0.4),
      end.clone().lerp(mid, 0.4),
      end,
    )
    const points = curve.getPoints(64)

    const [from, to] = ARC_COLOURS[Math.floor(Math.random() * ARC_COLOURS.length)]
    const colorFrom = new THREE.Color(from)
    const colorTo = new THREE.Color(to)

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: colorFrom.clone().lerp(colorTo, 0.5),
      transparent: true,
      opacity: 1,
    })
    const line = new THREE.Line(geometry, material)
    globeContainer.add(line)

    const glowStart = createEndpointMarker(colorFrom)
    const glowEnd = createEndpointMarker(colorTo)
    glowStart.position.copy(start)
    glowEnd.position.copy(end)
    glowStart.lookAt(start.clone().multiplyScalar(2))
    glowEnd.lookAt(end.clone().multiplyScalar(2))
    setMarkerOpacity(glowStart, 1)
    setMarkerOpacity(glowEnd, 0)
    globeContainer.add(glowStart, glowEnd)

    line.geometry.setDrawRange(0, 0)
    arcs.push({
      line,
      glowStart,
      glowEnd,
      totalPoints: 65,
      created: Date.now(),
      drawDuration: 600,
      holdDuration: 3000,
      fadeDuration: 800,
    })
  }

  const firstArc = window.setTimeout(createArc, 500)
  const arcTimer = window.setInterval(createArc, 1000)

  /** Retires arcs that no longer belong to the selected mode, by ageing them
   *  into their fade. */
  function fadeAllArcs() {
    const now = Date.now()
    for (const a of arcs) {
      a.created = Math.min(a.created, now - (a.drawDuration + a.holdDuration))
    }
  }

  let currentMode: CoverageMode | null = null

  function setMode(mode: CoverageMode) {
    if (!coverage || mode === currentMode) return
    currentMode = mode
    arcMode = mode
    target.wave = mode === 'self' ? 0 : 1
    target.home = mode === 'all' ? 1 : 0
    target.intl = mode === 'self' ? 0 : 1
    fadeAllArcs()
  }

  // Ignite on load so the entry state matches the default selection. Fires when
  // the dot field is ready; this timer is only a fallback for a slow or failed
  // map image.
  let ignited = false
  function ignite() {
    if (ignited || disposed) return
    ignited = true
    setMode('cross_border')
  }
  const igniteFallback = coverage ? window.setTimeout(ignite, 2500) : undefined

  function disposeArc(arc: Arc) {
    globeContainer.remove(arc.line, arc.glowStart, arc.glowEnd)
    arc.line.geometry.dispose()
    ;(arc.line.material as THREE.Material).dispose()
    arc.glowStart.userData.dotMat.dispose()
    arc.glowStart.userData.ringMat.dispose()
    arc.glowEnd.userData.dotMat.dispose()
    arc.glowEnd.userData.ringMat.dispose()
  }

  // --- Frame loop ----------------------------------------------------------
  const clock = new THREE.Clock()
  let frame = 0

  // getElapsedTime() consumes the delta, so time is tracked off getDelta()
  // alone — the coverage tween needs the per-frame delta as well.
  let elapsed = 0

  function animate() {
    frame = requestAnimationFrame(animate)
    const dt = Math.min(0.05, clock.getDelta())
    elapsed += dt
    dotUniforms.u_time.value = elapsed
    ;(dotUniforms.u_cameraDir.value as THREE.Vector3).copy(camera.position).normalize()
    globeContainer.rotation.y -= 0.001

    if (coverage) {
      // The ignition front travels at a fixed rate so the sweep stays readable;
      // dimming runs faster, and in reverse order, on the way back down.
      if (live.wave < target.wave) live.wave = Math.min(target.wave, live.wave + dt * 0.85)
      else if (live.wave > target.wave) live.wave = Math.max(target.wave, live.wave - dt * 1.5)

      const moving = Math.abs(target.wave - live.wave) > 0.001 ? 1 : 0
      live.active += (moving - live.active) * Math.min(1, dt * 12)
      live.home += (target.home - live.home) * Math.min(1, dt * 5)
      live.intl += (target.intl - live.intl) * Math.min(1, dt * 5)

      dotUniforms.u_wave.value = live.wave
      dotUniforms.u_homeLit.value = live.home
      dotUniforms.u_intlLit.value = live.intl
      dotUniforms.u_waveActive.value = live.active
    }

    const now = Date.now()
    for (let i = arcs.length - 1; i >= 0; i--) {
      const arc = arcs[i]
      const age = now - arc.created
      const totalLife = arc.drawDuration + arc.holdDuration + arc.fadeDuration
      const material = arc.line.material as THREE.LineBasicMaterial

      if (age > totalLife) {
        disposeArc(arc)
        arcs.splice(i, 1)
      } else if (age < arc.drawDuration) {
        // Drawing: the line grows point by point, and the far endpoint only
        // appears as the line reaches it.
        const p = age / arc.drawDuration
        arc.line.geometry.setDrawRange(0, Math.floor(p * arc.totalPoints))
        material.opacity = 1
        setMarkerOpacity(arc.glowStart, 1)
        setMarkerOpacity(arc.glowEnd, p > 0.9 ? (p - 0.9) / 0.1 : 0)
      } else if (age < arc.drawDuration + arc.holdDuration) {
        arc.line.geometry.setDrawRange(0, arc.totalPoints)
        material.opacity = 1
        setMarkerOpacity(arc.glowStart, 1)
        setMarkerOpacity(arc.glowEnd, 1)
      } else {
        const fade = 1 - (age - arc.drawDuration - arc.holdDuration) / arc.fadeDuration
        arc.line.geometry.setDrawRange(0, arc.totalPoints)
        material.opacity = fade
        setMarkerOpacity(arc.glowStart, fade)
        setMarkerOpacity(arc.glowEnd, fade)
      }
    }
    renderer.render(scene, camera)
  }
  animate()

  // --- Resize --------------------------------------------------------------
  const onResize = () => {
    const nw = container.clientWidth
    const nh = container.clientHeight
    if (!nw || !nh) return
    camera.left = -nw / 2
    camera.right = nw / 2
    camera.top = nh / 2
    camera.bottom = -nh / 2
    if (refitByZoom) {
      // The sphere, arcs and points were built at globeRadius, so a host that
      // wants a different diameter is served by the camera's zoom rather than a
      // rebuild. The diameter is republished for the CSS that depends on it.
      const want = radiusFor(nw, nh)
      camera.zoom = want / globeRadius
      onDiameter?.(want * 2)
    }
    camera.updateProjectionMatrix()
    renderer.setSize(nw, nh)
  }
  const observer = new ResizeObserver(onResize)
  observer.observe(container)

  return {
    setMode,
    dispose() {
      disposed = true
      cancelAnimationFrame(frame)
      clearTimeout(firstArc)
      clearInterval(arcTimer)
      if (igniteFallback !== undefined) clearTimeout(igniteFallback)
      observer.disconnect()
      for (const arc of arcs) disposeArc(arc)
      arcs.length = 0
      if (dotPoints) {
        dotPoints.geometry.dispose()
        ;(dotPoints.material as THREE.Material).dispose()
      }
      sphereGeometry.dispose()
      sphereMaterial.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
