// Interactive particle field for the landing hero.
// Expects: <canvas data-particles> inside an element whose CSS sets --particle-color.
(function () {
  var canvas = document.querySelector('canvas[data-particles]');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var container = canvas.parentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var LINK_DIST = 110;
  var POINTER_RADIUS = 140;
  var MAX_SPEED = 1.4;
  var MIN_SPEED = 0.12;
  var MAX_PARTICLES = 260;
  var TEXT_HALF = 350;
  var DIM_ALPHA = 0.3;

  var width = 0;
  var height = 0;
  var particles = [];
  var pointer = { x: 0, y: 0, active: false };
  var color = '#7fc4ff';
  var running = false;
  var inView = true;
  var rafId = 0;

  function edgeAlpha(x) {
    var offset = Math.abs(x - width / 2);
    var textHalf = Math.min(TEXT_HALF, width * 0.35);
    if (offset <= textHalf) return DIM_ALPHA;
    return DIM_ALPHA + (1 - DIM_ALPHA) * Math.min(1, (offset - textHalf) / 200);
  }

  function spawnX() {
    var x;
    do {
      x = Math.random() * width;
    } while (edgeAlpha(x) === DIM_ALPHA && Math.random() > 0.35);
    return x;
  }

  function randomParticle() {
    var angle = Math.random() * Math.PI * 2;
    var speed = 0.2 + Math.random() * 0.4;
    return {
      x: spawnX(),
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 0.8 + Math.random() * 1.4
    };
  }

  function resize() {
    var rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var count = Math.min(MAX_PARTICLES, Math.floor((width * height) / 5000));
    particles = [];
    for (var i = 0; i < count; i++) particles.push(randomParticle());
    draw();
  }

  function step() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      if (pointer.active) {
        var dx = pointer.x - p.x;
        var dy = pointer.y - p.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < POINTER_RADIUS * POINTER_RADIUS && d2 > 0) {
          var f = (1 - d2 / (POINTER_RADIUS * POINTER_RADIUS)) * 0.04;
          p.vx += dx * f * 0.05;
          p.vy += dy * f * 0.05;
        }
      }

      var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > MAX_SPEED) {
        p.vx = (p.vx / speed) * MAX_SPEED;
        p.vy = (p.vy / speed) * MAX_SPEED;
      } else if (speed < MIN_SPEED && speed > 0) {
        p.vx = (p.vx / speed) * MIN_SPEED;
        p.vy = (p.vy / speed) * MIN_SPEED;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = width + 10;
      else if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      else if (p.y > height + 10) p.y = -10;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    for (var q = 0; q < particles.length; q++) particles[q].a = edgeAlpha(particles[q].x);

    var linkSq = LINK_DIST * LINK_DIST;
    for (var i = 0; i < particles.length; i++) {
      var a = particles[i];
      for (var j = i + 1; j < particles.length; j++) {
        var b = particles[j];
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < linkSq) {
          ctx.globalAlpha = (1 - d2 / linkSq) * 0.35 * Math.min(a.a, b.a);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (var k = 0; k < particles.length; k++) {
      var p = particles[k];
      ctx.globalAlpha = p.a * 0.9;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function frame() {
    step();
    draw();
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduceMotion.matches || !inView || document.hidden) return;
    running = true;
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  function pointerAt(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    pointer.x = x;
    pointer.y = y;
  }

  color = getComputedStyle(container).getPropertyValue('--particle-color').trim() || color;
  resize();

  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(container);
  } else {
    window.addEventListener('resize', resize);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) start();
      else stop();
    }).observe(canvas);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop();
    else start();
  });

  document.addEventListener('pointermove', pointerAt);
  document.addEventListener('pointerdown', pointerAt);
  document.documentElement.addEventListener('pointerleave', function () {
    pointer.active = false;
  });

  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener('change', function () {
      if (reduceMotion.matches) stop();
      else start();
    });
  }

  start();
})();
