---
layout: default
title: "Explore Me"
permalink: /explore/
---

# Explore Me

Welcome to the interactive holographic globe of my experiances. This is a fun interactive little thing that I created to show memorable places and things. No all encompassing, but quite fun, its a way to play and learn about javascript and web 3D globes. 

Use your mouse or trackpad to click and drag the 3D globe, scroll to zoom, or select nodes from the control panel below to explore my various experiances.

<link rel="stylesheet" href="{{ '/assets/css/explore.css' | relative_url }}">
<script src="{{ '/assets/js/miniature.earth.core.js' | relative_url }}"></script>

<!-- Outer Sci-Fi Container -->
<div class="explore-card theme-cyan" id="exploreCard">
  <div class="starfield"></div>

  <div class="explore-grid">
    <!-- Globe Panel -->
    <div class="globe-panel">
      <div class="globe-container-wrapper">
        <div class="globe-bg-glow"></div>
        <div id="myearth"></div>
      </div>
    </div>

    <!-- Telemetry Control Panel -->
    <div class="telemetry-panel">
      <div class="hud-header">
        <h3 class="hud-title" id="hudNodeTitle">SYSTEM STATUS</h3>
        <span class="hud-status" id="hudNodeStatus">ACTIVE</span>
      </div>

      <div class="hud-screen">
        <div class="hud-row">
          <span class="hud-label">COORDINATES:</span>
          <span class="hud-val highlight" id="hudCoords">SYS.INIT_0.0°N / 0.0°E</span>
        </div>
        <div class="hud-row">
          <span class="hud-label">TELEMETRY:</span>
          <span class="hud-val" id="hudSpecialty">ACQUIRING LINK...</span>
        </div>
        <div class="hud-row">
          <span class="hud-label">SIGNAL STR:</span>
          <span class="hud-val highlight" id="hudSignal">100% (SECURE)</span>
        </div>
        <div class="hud-description" id="hudDescription">
          Select a node on the holographic globe or click one of the telemetry anchors below to load localized database entries and map coordinates.
        </div>
      </div>

      <div class="hud-controls">
        <button class="hud-btn" onclick="selectNode(0)" id="btnNode0">📍 Wilmington</button>
        <button class="hud-btn" onclick="selectNode(1)" id="btnNode1">📍 Blue Ridge</button>
        <button class="hud-btn" onclick="selectNode(2)" id="btnNode2">📍 Breckenridge</button>
        <button class="hud-btn" onclick="selectNode(3)" id="btnNode3">📍 Zion Canyon</button>
        <button class="hud-btn" onclick="selectNode(4)" id="btnNode4">📍 Moqui Caverns</button>
      </div>
    </div>
  </div>

  <!-- Global Action Controls & System Info -->
  <div class="hud-controls" style="margin-top: 1.5rem; justify-content: center; z-index: 2; position: relative;">
    <button class="hud-btn" id="btnSpin" onclick="toggleSpin()">🔄 Rotation: ON</button>
    <button class="hud-btn" id="btnColor" onclick="changeColor()">🎨 Cycle Scan Color</button>
    <button class="hud-btn" onclick="zoomGlobe(0.15)">➕ Zoom In</button>
    <button class="hud-btn" onclick="zoomGlobe(-0.15)">➖ Zoom Out</button>
  </div>

  <div class="explore-footer">
    <span>INTERFACE VERSION: HG-4.0.1 // PROTOCOL: WEBL-3D</span>
    <span id="sysTime">LATENCY: -- MS</span>
  </div>
</div>

<script>
// Define the interactive node data
const nodes = [
  {
    name: "Wilmington, NC",
    shortName: "Wilmington Base",
    coords: "34.2233° N, 77.9183° W",
    lat: 34.2233,
    lng: -77.9183,
    specialty: "Computer Vision & ML Research",
    signal: "98.4% (UNCW Net)",
    description: "Served as a Machine Learning researcher at the University of North Carolina Wilmington for 9+ years. Led computer vision initiatives including image segmentation, object detection, and deep learning models for intelligence, commercial insurance, and local enterprise clients."
  },
  {
    name: "Blue Ridge Mountains, NC",
    shortName: "Blue Ridge Base",
    coords: "35.5951° N, 82.5515° W",
    lat: 35.5951,
    lng: -82.5515,
    specialty: "HQ & Creative Photography Hub",
    signal: "99.9% (Primary)",
    description: "Current base of operations nestled in the scenic Blue Ridge Mountains. Merges computer engineering and visual arts to capture landscapes and automotive curves, managing extensive photography series across several national parks."
  },
  {
    name: "Breckenridge, CO",
    shortName: "Breckenridge Node",
    coords: "39.4817° N, 106.0384° W",
    lat: 39.4817,
    lng: -106.0384,
    specialty: "High-Altitude Biking Base",
    signal: "84.2% (Cell-Link)",
    description: "Primary recreational hub in Breckenridge, Colorado. Driven by an intense passion for mountain biking, exploring rugged trails, high-altitude alpine terrain, and technical woodworking hobbies."
  },
  {
    name: "Zion National Park, UT",
    shortName: "Zion Canyon Node",
    coords: "37.2982° N, 113.0263° W",
    lat: 37.2982,
    lng: -113.0263,
    specialty: "Zion Photography Expedition",
    signal: "91.0% (Sat-Link)",
    description: "Major landscape photography showcase node. Documented Zion's premier landmarks including the dramatic chains and ridges of Angels Landing and the riverbed paths of the 1,000-foot-deep Virgin River Narrows."
  },
  {
    name: "Moqui Caverns, UT",
    shortName: "Moqui Caverns Node",
    coords: "37.0475° N, 112.5263° W",
    lat: 37.0475,
    lng: -112.5263,
    specialty: "Navajo Sandstone Node",
    signal: "78.5% (Subterranean)",
    description: "Explored and captured the historic, human-carved Navajo sandstone tunnels in Kanab, UT. Carved in the 1970s for industrial glass sand mining, they present breathtaking geometry and shifting sunlight shapes."
  }
];

// Connection route definitions
const routeConnections = [
  [34.2233, -77.9183, 35.5951, -82.5515], // Wilmington -> Blue Ridge
  [35.5951, -82.5515, 39.4817, -106.0384], // Blue Ridge -> Breckenridge
  [39.4817, -106.0384, 37.2982, -113.0263], // Breckenridge -> Zion
  [37.2982, -113.0263, 37.0475, -112.5263]  // Zion -> Moqui Caverns
];

let myearth;
let earthSprites = [];
let scanThemes = ['cyan', 'green', 'gold'];
let currentThemeIndex = 0;
let autoRotating = true;

// Custom system clock
setInterval(() => {
  const ping = Math.floor(Math.random() * 15) + 12;
  document.getElementById("sysTime").innerText = `LATENCY: ${ping} MS // UTC: ${new Date().toISOString().substring(11, 19)}`;
}, 1000);

window.addEventListener('load', function() {
  // Initialize the 3D Hologram Globe
  myearth = new Earth('myearth', {
    location: { lat: 36, lng: -95 },
    light: 'none',
    mapImage: "{{ '/assets/images/explore/hologram-map.svg' | relative_url }}",
    transparent: true,
    autoRotate: true,
    autoRotateSpeed: 1.2,
    autoRotateDelay: 100,
    autoRotateStart: 1000,
    zoom: 0.9,
    zoomable: true,
    zoomMin: 0.6,
    zoomMax: 1.5
  });

  myearth.addEventListener("ready", function() {
    this.startAutoRotate();
    document.getElementById('myearth').classList.add('earth-ready');

    // 1. Draw connecting path lines (representing career/travel routes)
    const lineOptions = {
      color: '#00e5ff',
      opacity: 0.3,
      hairline: true,
      offset: -0.5
    };

    routeConnections.forEach(conn => {
      lineOptions.locations = [
        { lat: conn[0], lng: conn[1] },
        { lat: conn[2], lng: conn[3] }
      ];
      this.addLine(lineOptions);
    });

    // 2. Add glowing sprites for interactive nodes
    nodes.forEach((node, index) => {
      const sprite = this.addSprite({
        image: "{{ '/assets/images/explore/hologram-shine.svg' | relative_url }}",
        location: { lat: node.lat, lng: node.lng },
        scale: 0.28,
        offset: -0.45,
        opacity: 0.75,
        hotspot: true
      });

      // Bind node index to the sprite object for retrieval in click handler
      sprite.nodeIndex = index;
      earthSprites.push(sprite);

      // Add click event listener directly to the sprite
      sprite.addEventListener('click', function() {
        selectNode(this.nodeIndex);
      });
    });

    // Load initial node details on boot
    selectNode(1);
  });
});

// Select a node programmatically or via click
function selectNode(index) {
  if (!myearth || index < 0 || index >= nodes.length) return;

  const node = nodes[index];
  
  // Update HUD content
  document.getElementById("hudNodeTitle").innerText = node.shortName.toUpperCase();
  document.getElementById("hudCoords").innerText = `${node.coords}`;
  document.getElementById("hudSpecialty").innerText = node.specialty;
  document.getElementById("hudSignal").innerText = node.signal;
  document.getElementById("hudDescription").innerText = node.description;

  // Visual active state for HUD buttons
  for (let i = 0; i < nodes.length; i++) {
    const btn = document.getElementById(`btnNode${i}`);
    if (btn) {
      if (i === index) {
        btn.style.borderColor = 'rgba(0, 229, 255, 1)';
        btn.style.background = 'rgba(0, 156, 255, 0.25)';
        btn.style.color = '#ffffff';
        if (scanThemes[currentThemeIndex] === 'green') {
          btn.style.borderColor = '#00ff66';
          btn.style.background = 'rgba(0, 255, 102, 0.25)';
        } else if (scanThemes[currentThemeIndex] === 'gold') {
          btn.style.borderColor = '#ffaa00';
          btn.style.background = 'rgba(255, 170, 0, 0.25)';
        }
      } else {
        btn.style.borderColor = '';
        btn.style.background = '';
        btn.style.color = '';
      }
    }
  }

  // Smoothly rotate the 3D globe to center on this node and zoom in
  myearth.goTo({ lat: node.lat, lng: node.lng }, { approachAngle: 15 });
  myearth.zoom = 1.35;
}

// Toggle Auto Rotation
function toggleSpin() {
  if (!myearth) return;
  autoRotating = !autoRotating;
  if (autoRotating) {
    myearth.startAutoRotate();
    document.getElementById("btnSpin").innerText = "🔄 Rotation: ON";
  } else {
    myearth.autoRotate = false;
    document.getElementById("btnSpin").innerText = "🔄 Rotation: OFF";
  }
}

// Zoom control programmatically
function zoomGlobe(factor) {
  if (!myearth) return;
  let targetZoom = myearth.zoom + factor;
  if (targetZoom < 0.6) targetZoom = 0.6;
  if (targetZoom > 1.5) targetZoom = 1.5;
  myearth.zoom = targetZoom;
}

// Cycle visual color scan theme
function changeColor() {
  const card = document.getElementById("exploreCard");
  if (!card) return;

  // Remove old theme classes
  scanThemes.forEach(t => card.classList.remove(`theme-${t}`));

  // Go to next theme
  currentThemeIndex = (currentThemeIndex + 1) % scanThemes.length;
  const newTheme = scanThemes[currentThemeIndex];
  card.classList.add(`theme-${newTheme}`);

  // Re-style active button matching the theme
  // Find which button is active
  let activeIndex = 0;
  for (let i = 0; i < nodes.length; i++) {
    const btn = document.getElementById(`btnNode${i}`);
    if (btn && (btn.style.borderColor !== '')) {
      activeIndex = i;
      break;
    }
  }
  selectNode(activeIndex);
}
</script>
