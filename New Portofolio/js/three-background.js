/* ==========================================================================
   Three.js 3D Background with Floating Tech Logos (HTML, CSS, JS, TS)
   Clean, Elegant, Responsive with Mouse Parallax & Gentle Floating Physics
   ========================================================================== */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js library not loaded. 3D background disabled.');
    return;
  }

  const container = document.getElementById('three-canvas-container');
  if (!container) return;

  // 1. Scene, Camera, Renderer Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 45;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 2. Helper: Draw Rounded Rect on Canvas
  function drawRoundedRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  // 3. Texture Generators for HTML, CSS, JS, TS Logos
  function createHtmlLogoTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Glowing halo
    const glow = ctx.createRadialGradient(128, 128, 30, 128, 128, 120);
    glow.addColorStop(0, 'rgba(227, 79, 38, 0.45)');
    glow.addColorStop(1, 'rgba(227, 79, 38, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 256, 256);

    // Card background
    ctx.fillStyle = 'rgba(16, 18, 34, 0.88)';
    ctx.strokeStyle = 'rgba(227, 79, 38, 0.85)';
    ctx.lineWidth = 4;
    drawRoundedRect(ctx, 36, 36, 184, 184, 30, true, true);

    // Shield base
    ctx.fillStyle = '#e34f26';
    ctx.beginPath();
    ctx.moveTo(70, 72);
    ctx.lineTo(186, 72);
    ctx.lineTo(176, 172);
    ctx.lineTo(128, 194);
    ctx.lineTo(80, 172);
    ctx.closePath();
    ctx.fill();

    // Right shield shade
    ctx.fillStyle = '#f06529';
    ctx.beginPath();
    ctx.moveTo(128, 80);
    ctx.lineTo(172, 80);
    ctx.lineTo(164, 166);
    ctx.lineTo(128, 184);
    ctx.closePath();
    ctx.fill();

    // White "5"
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 70px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('5', 128, 134);

    return new THREE.CanvasTexture(canvas);
  }

  function createCssLogoTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Glowing halo
    const glow = ctx.createRadialGradient(128, 128, 30, 128, 128, 120);
    glow.addColorStop(0, 'rgba(41, 101, 241, 0.45)');
    glow.addColorStop(1, 'rgba(41, 101, 241, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 256, 256);

    // Card background
    ctx.fillStyle = 'rgba(16, 18, 34, 0.88)';
    ctx.strokeStyle = 'rgba(41, 101, 241, 0.85)';
    ctx.lineWidth = 4;
    drawRoundedRect(ctx, 36, 36, 184, 184, 30, true, true);

    // Shield base
    ctx.fillStyle = '#1572b6';
    ctx.beginPath();
    ctx.moveTo(70, 72);
    ctx.lineTo(186, 72);
    ctx.lineTo(176, 172);
    ctx.lineTo(128, 194);
    ctx.lineTo(80, 172);
    ctx.closePath();
    ctx.fill();

    // Right shield shade
    ctx.fillStyle = '#2965f1';
    ctx.beginPath();
    ctx.moveTo(128, 80);
    ctx.lineTo(172, 80);
    ctx.lineTo(164, 166);
    ctx.lineTo(128, 184);
    ctx.closePath();
    ctx.fill();

    // White "3"
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 70px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('3', 128, 134);

    return new THREE.CanvasTexture(canvas);
  }

  function createJsLogoTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Glowing halo
    const glow = ctx.createRadialGradient(128, 128, 30, 128, 128, 120);
    glow.addColorStop(0, 'rgba(247, 223, 30, 0.45)');
    glow.addColorStop(1, 'rgba(247, 223, 30, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 256, 256);

    // Card background
    ctx.fillStyle = 'rgba(16, 18, 34, 0.88)';
    ctx.strokeStyle = 'rgba(247, 223, 30, 0.85)';
    ctx.lineWidth = 4;
    drawRoundedRect(ctx, 36, 36, 184, 184, 30, true, true);

    // Yellow Badge
    ctx.fillStyle = '#f7df1e';
    drawRoundedRect(ctx, 58, 58, 140, 140, 18, true, false);

    // Black "JS" text
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 64px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('JS', 128, 130);

    return new THREE.CanvasTexture(canvas);
  }

  function createTsLogoTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Glowing halo
    const glow = ctx.createRadialGradient(128, 128, 30, 128, 128, 120);
    glow.addColorStop(0, 'rgba(49, 120, 198, 0.45)');
    glow.addColorStop(1, 'rgba(49, 120, 198, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 256, 256);

    // Card background
    ctx.fillStyle = 'rgba(16, 18, 34, 0.88)';
    ctx.strokeStyle = 'rgba(49, 120, 198, 0.85)';
    ctx.lineWidth = 4;
    drawRoundedRect(ctx, 36, 36, 184, 184, 30, true, true);

    // Blue Badge
    ctx.fillStyle = '#3178c6';
    drawRoundedRect(ctx, 58, 58, 140, 140, 18, true, false);

    // White "TS" text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TS', 128, 130);

    return new THREE.CanvasTexture(canvas);
  }

  // Create Textures
  const textures = [
    createHtmlLogoTexture(),
    createCssLogoTexture(),
    createJsLogoTexture(),
    createTsLogoTexture()
  ];

  // 4. Create Moderate Number of Floating 3D Tech Logo Meshes
  const logoGroup = new THREE.Group();
  scene.add(logoGroup);

  const floatingLogos = [];
  const TOTAL_LOGOS = 28; // Bersih, tidak terlalu banyak & terdistribusi seimbang
  const planeGeo = new THREE.PlaneGeometry(4.2, 4.2);

  for (let i = 0; i < TOTAL_LOGOS; i++) {
    const texIndex = i % 4; // Rotasi merata: HTML, CSS, JS, TS
    const material = new THREE.MeshBasicMaterial({
      map: textures[texIndex],
      transparent: true,
      opacity: 0.72 + (Math.random() * 0.2),
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const mesh = new THREE.Mesh(planeGeo, material);

    // Sebaran posisi luas agar tidak menumpuk
    const x = (Math.random() - 0.5) * 110;
    const y = (Math.random() - 0.5) * 90;
    const z = (Math.random() - 0.5) * 45;

    mesh.position.set(x, y, z);

    // Skala sedikit bervariasi untuk kedalaman visual 3D
    const scale = 0.7 + Math.random() * 0.55;
    mesh.scale.set(scale, scale, 1);

    // Rotasi awal acak
    mesh.rotation.z = (Math.random() - 0.5) * 0.4;
    mesh.rotation.y = (Math.random() - 0.5) * 0.5;

    logoGroup.add(mesh);

    floatingLogos.push({
      mesh: mesh,
      baseX: x,
      baseY: y,
      baseZ: z,
      floatSpeed: 0.0008 + Math.random() * 0.0012,
      rotSpeedY: (Math.random() - 0.5) * 0.008,
      rotSpeedZ: (Math.random() - 0.5) * 0.004,
      phase: Math.random() * Math.PI * 2,
      rangeY: 3.5 + Math.random() * 4.5
    });
  }

  // 5. Partikel Halus Ringan (Sparse Star Dust - Hanya 60 butir lembut, tidak ramai)
  const sparseStarCount = 65;
  const starsGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(sparseStarCount * 3);

  for (let i = 0; i < sparseStarCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 120;
    starPositions[i + 1] = (Math.random() - 0.5) * 100;
    starPositions[i + 2] = (Math.random() - 0.5) * 60;
  }
  starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

  const starsMat = new THREE.PointsMaterial({
    size: 1.2,
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });
  const starSystem = new THREE.Points(starsGeo, starsMat);
  scene.add(starSystem);

  // 6. Mouse Interaction & Scroll Tracking
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const halfWidth = window.innerWidth / 2;
  const halfHeight = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX - halfWidth) * 0.02;
    mouse.targetY = (e.clientY - halfHeight) * 0.02;
  });

  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset || document.documentElement.scrollTop;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // 7. Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Lerp mouse parallax
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Camera movement
    camera.position.x = mouse.x * 0.7;
    camera.position.y = -mouse.y * 0.7 - (scrollY * 0.007);
    camera.lookAt(0, -scrollY * 0.007, 0);

    // Animasi logo melayang
    floatingLogos.forEach((item) => {
      // Gerakan mengambang naik-turun yang halus
      item.mesh.position.y = item.baseY + Math.sin(time * 1.2 + item.phase) * item.rangeY;
      item.mesh.position.x = item.baseX + Math.cos(time * 0.8 + item.phase) * 1.2;

      // Rotasi 3D lembut
      item.mesh.rotation.y += item.rotSpeedY;
      item.mesh.rotation.z += item.rotSpeedZ;
    });

    // Partikel lembut berputar pelan
    starSystem.rotation.y = time * 0.015;

    renderer.render(scene, camera);
  }

  animate();
})();
