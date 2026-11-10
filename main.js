(function () {
  'use strict';

  /* Keep --vw in sync with the scrollbar-free viewport width so dots align with the grid. */
  var root = document.documentElement;
  function setVw() { root.style.setProperty('--vw', root.clientWidth + 'px'); }
  setVw();
  window.addEventListener('resize', setVw);

  /* ---------- Project detail viewer ---------- */
  var PROJECTS = window.PROJECTS || [];
  var dialog = document.getElementById('detail');
  var bodyEl = document.getElementById('detail-body');
  var lastTrigger = null;

  /* tiny DOM helpers: all content is set through textContent / nodes, never innerHTML */
  function el(tag, cls, content) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    append(n, content);
    return n;
  }
  function append(parent, content) {
    if (content == null || content === false) return;
    if (Array.isArray(content)) { content.forEach(function (c) { append(parent, c); }); return; }
    parent.appendChild(typeof content === 'string' ? document.createTextNode(content) : content);
  }
  /* "text **bold** text" -> text + <strong> */
  function rich(text, tag, cls) {
    var n = el(tag || 'p', cls);
    String(text).split('**').forEach(function (part, i) {
      if (!part) return;
      if (i % 2) n.appendChild(el('strong', null, part)); else n.appendChild(document.createTextNode(part));
    });
    return n;
  }
  function lines(text, tag, cls) {
    var n = el(tag, cls);
    String(text).split('\n').forEach(function (part, i) {
      if (i) n.appendChild(document.createElement('br'));
      n.appendChild(document.createTextNode(part));
    });
    return n;
  }
  function img(src, alt, lazy) {
    var i = document.createElement('img');
    i.src = src; i.alt = alt || '';
    i.decoding = 'async';
    if (lazy) i.loading = 'lazy';
    return i;
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  var BLOCKS = {
    text: function (s) {
      var wrap = el('div', 'dt-text');
      if (s.lead) wrap.appendChild(rich(s.lead, 'p', 'dt-lead'));
      (s.body || []).forEach(function (t) { wrap.appendChild(rich(t)); });
      return wrap;
    },

    notes: function (s) {
      var wrap = el('div', 'dt-notes');
      s.notes.forEach(function (n) { wrap.appendChild(rich(n.text, 'p', 'dt-note tone-' + n.tone)); });
      return wrap;
    },

    'figure-text': function (s) {
      var wrap = el('div', 'dt-ft size-' + (s.size || 'md'));
      var fig = el('figure', 'dt-ft-fig' + (s.blend ? ' is-blend' : ''));
      fig.appendChild(img(s.image, s.alt, true));
      var txt = el('div', 'dt-ft-text');
      if (s.caption) txt.appendChild(el('h4', 'dt-caption', s.caption));
      (s.body || []).forEach(function (t) { txt.appendChild(rich(t)); });
      wrap.appendChild(fig);
      wrap.appendChild(txt);
      return wrap;
    },

    figure: function (s) {
      var fig = el('figure', 'dt-fig size-' + (s.size || 'wide') + (s.blend ? ' is-blend' : ''));
      fig.appendChild(img(s.image, s.alt, true));
      if (s.caption) fig.appendChild(el('figcaption', null, s.caption));
      return fig;
    },

    cards: function (s) {
      var wrap = el('div', 'dt-cardwrap');
      var list = el('ul', 'dt-cards');
      s.items.forEach(function (t) { list.appendChild(el('li', 'dt-card', el('span', null, t))); });
      wrap.appendChild(list);
      if (s.conclusion) {
        var c = el('div', 'dt-concl');
        if (s.conclusion.title) c.appendChild(el('strong', null, s.conclusion.title));
        c.appendChild(el('p', null, s.conclusion.text));
        wrap.appendChild(c);
      }
      return wrap;
    },

    swot: function (s) {
      var wrap = el('div', 'dt-swotwrap');
      var grid = el('div', 'dt-swot');
      [['S', 'Strengths'], ['W', 'Weaknesses'], ['O', 'Opportunities'], ['T', 'Threats']].forEach(function (k) {
        var cell = el('div', 'dt-swot-cell is-' + k[0].toLowerCase());
        cell.appendChild(el('span', 'dt-swot-badge', k[0]));
        var ul = el('ul');
        s[k[0]].forEach(function (t) { ul.appendChild(el('li', null, t)); });
        cell.appendChild(ul);
        grid.appendChild(cell);
      });
      grid.appendChild(el('span', 'dt-swot-core', 'SWOT'));
      wrap.appendChild(grid);
      if (s.note) wrap.appendChild(rich(s.note, 'p', 'dt-swot-note'));
      return wrap;
    },

    gallery: function (s) {
      var auto = s.ratio === 'auto';
      var wrap = el('div', auto ? 'dt-grid' : 'dt-gallery');
      s.items.forEach(function (it, i) {
        var f = el('figure', 'dt-gitem');
        var frame = el('div', 'dt-gframe');
        if (!auto) frame.style.aspectRatio = s.ratio;
        frame.appendChild(img(it.image, it.title, true));
        f.appendChild(frame);
        f.appendChild(el('figcaption', null, [el('span', 'dt-gnum', pad2(i + 1)), it.title]));
        wrap.appendChild(f);
      });
      return wrap;
    },

    mosaic: function (s) {
      var wrap = el('div', 'dt-mosaicwrap');
      var grid = el('div', 'dt-mosaic');
      s.images.forEach(function (it) { grid.appendChild(el('figure', null, img(it.image, it.alt, true))); });
      wrap.appendChild(grid);
      var txt = el('div', 'dt-text');
      (s.body || []).forEach(function (t) { txt.appendChild(rich(t)); });
      wrap.appendChild(txt);
      return wrap;
    },

    vertical: function (s) {
      var wrap = el('div', 'dt-vert');
      var words = el('div', 'dt-vert-words', s.words.map(function (w, i) {
        return el('span', i ? 'is-second' : null, w);
      }));
      words.setAttribute('aria-hidden', 'true');
      wrap.appendChild(words);
      var txt = el('div', 'dt-text');
      (s.body || []).forEach(function (t) { txt.appendChild(rich(t)); });
      wrap.appendChild(txt);
      return wrap;
    },

    list: function (s) {
      var wrap = el('ul', 'dt-list');
      s.rows.forEach(function (r) {
        wrap.appendChild(el('li', null, [el('span', 'dt-list-k' + (r.k ? '' : ' is-bullet'), r.k || ''), el('span', 'dt-list-v', r.v)]));
      });
      return wrap;
    },

    skills: function (s) {
      var wrap = el('ul', 'dt-skills');
      s.items.forEach(function (it) {
        var dots = el('span', 'dt-dots');
        dots.setAttribute('aria-label', it.level + ' / 3');
        for (var i = 0; i < 3; i++) dots.appendChild(el('i', i < it.level ? 'on' : ''));
        wrap.appendChild(el('li', null, [dots, el('span', 'dt-skill-name', it.name)]));
      });
      return wrap;
    }
  };

  function renderFacts(facts) {
    var dl = el('dl', 'dt-facts');
    facts.forEach(function (f) {
      var box = el('div');
      box.appendChild(el('dt', null, f.k));
      var dd = el('dd');
      if (f.colors) {
        var sw = el('ul', 'dt-swatches');
        f.colors.forEach(function (c) {
          var li = el('li', null, el('span', null, c));
          li.insertBefore(el('i'), li.firstChild);
          li.firstChild.style.background = c;
          sw.appendChild(li);
        });
        dd.appendChild(sw);
      } else if (f.href) {
        var a = el('a', null, f.v); a.href = f.href; dd.appendChild(a);
      } else {
        dd.textContent = f.v;
      }
      box.appendChild(dd);
      dl.appendChild(box);
    });
    return dl;
  }

  function renderProject(p, index) {
    var frag = document.createDocumentFragment();
    var n = PROJECTS.length;

    // hero
    var hero = el('header', 'dt-hero layout-' + p.hero.layout);
    var head = el('div', 'dt-hero-text');
    head.appendChild(el('p', 'dt-kicker', pad2(index + 1) + ' — ' + p.kicker));
    head.appendChild(lines(p.title, 'h1', 'dt-h1'));
    if (p.name) head.appendChild(el('p', 'dt-name', [p.name, el('span', null, p.sub)]));
    if (p.tagline) head.appendChild(el('p', 'dt-tagline', p.tagline));
    if (p.lead) head.appendChild(rich(p.lead, 'p', 'dt-herolead'));
    hero.appendChild(head);
    var hf = el('figure', 'dt-hero-img');
    hf.appendChild(img(p.hero.image, p.hero.alt, false));
    hero.appendChild(hf);
    frag.appendChild(hero);

    if (p.facts && p.facts.length) frag.appendChild(renderFacts(p.facts));

    // sections: label on the left (like the grid on the main page), content in the middle
    p.sections.forEach(function (s) {
      var sec = el('section', 'dt-sec type-' + s.type);
      sec.appendChild(el('h3', 'dt-label', s.label));
      sec.appendChild(el('div', 'dt-content', BLOCKS[s.type](s)));
      frag.appendChild(sec);
    });

    // prev / next
    var prev = PROJECTS[(index + n - 1) % n], next = PROJECTS[(index + 1) % n];
    var pager = el('nav', 'dt-pager');
    pager.setAttribute('aria-label', 'Projects');
    [['Prev', (index + n - 1) % n, prev], ['Next', (index + 1) % n, next]].forEach(function (x, i) {
      var b = el('button', 'dt-pager-btn' + (i ? ' is-next' : ''), [
        el('small', null, i ? 'Next ↗' : '↖ Prev'),
        el('span', null, x[2].title.replace(/\n/g, ' '))
      ]);
      b.type = 'button';
      b.setAttribute('data-project', String(x[1]));
      pager.appendChild(b);
    });
    frag.appendChild(pager);
    return frag;
  }

  function openDetail(index, trigger) {
    var p = PROJECTS[index];
    if (!dialog || !p) return;
    if (trigger && !dialog.open) lastTrigger = trigger;
    bodyEl.textContent = '';
    bodyEl.style.setProperty('--accent', p.accent || '#000');
    bodyEl.style.setProperty('--accent2', p.accent2 || p.accent || '#000');
    bodyEl.appendChild(renderProject(p, index));
    document.getElementById('detail-index').textContent = pad2(index + 1) + ' / ' + pad2(PROJECTS.length);
    document.getElementById('detail-title').textContent = p.title.replace(/\n/g, ' ');
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
      root.classList.add('detail-open');
    }
    dialog.scrollTop = 0;
    document.getElementById('detail-close').focus({ preventScroll: true });
  }

  function closeDetail() {
    if (!dialog || !dialog.open) return;
    if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
  }

  if (dialog) {
    dialog.addEventListener('close', function () {
      if (dialog.open) return;          // reopened before this (async) event fired
      root.classList.remove('detail-open');
      bodyEl.textContent = '';
      if (lastTrigger) lastTrigger.focus({ preventScroll: true });
    });
    document.getElementById('detail-close').addEventListener('click', closeDetail);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-project]');
    if (btn) openDetail(Number(btn.getAttribute('data-project')), btn);
  });


  /* ---------- Globe ---------- */
  /* Modeled on the bleibtgleich globe: small tiles on a Fibonacci sphere, but only in an equatorial band
     (not the poles), so it reads as a loose belt of pages rather than a solid ball. Constant Y spin,
     drag with inertia, tiles bobbing along their normals, back faces almost invisible. */
  var canvas = document.getElementById('globe');
  var section = document.querySelector('.featured');
  var base = window.GLOBE_IMAGES || [];           // 7 single pages (project covers + cover pages)
  if (!canvas || !section || !window.THREE || !base.length) return;

  var THREE = window.THREE;
  var RADIUS = 1.85;          // sphere radius (world units)
  var TILE_W = 0.4;           // every tile has this width; height follows the image
  var FOV = 48;
  var BAND = 0.55;            // keep only points with |y| < BAND
  var COPIES = 3;             // each page appears 3 times -> 21 tiles
  var BOB = 0.1, BOB_SPEED = 0.1, BOB_WAVE = 1.5;
  var IDLE_SPIN = 0.003;      // rad per 60 fps frame (~0.18 rad/s)
  var DRAG_GAIN = 0.013, DRAG_MAX = 0.11;
  var REVEAL_SECONDS = 1.4;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 1000);
  var globe = new THREE.Group();
  scene.add(globe);

  /* Fibonacci sphere points, then keep the equatorial band and take as many as there are tiles. */
  function fibonacci(total) {
    var pts = [], golden = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < total; i++) {
      var y = 1 - (i / (total - 1)) * 2;
      var r = Math.sqrt(1 - y * y);
      pts.push(new THREE.Vector3(Math.cos(golden * i) * r, y, Math.sin(golden * i) * r));
    }
    return pts;
  }
  var count = base.length * COPIES;
  var points = fibonacci(Math.ceil(2.5 * count))
    .filter(function (p) { return Math.abs(p.y) < BAND; })
    .slice(0, count);

  var tiles = [];
  var loader = new THREE.TextureLoader();

  points.forEach(function (dir, i) {
    // step by 3 so neighbouring latitudes do not show the same page
    var src = base[(i * 3) % base.length];
    loader.load(src, function (tex) {
      tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = 4;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;

      var h = TILE_W / (tex.image.width / tex.image.height);
      var material = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
      // the back of a tile shows the page un-mirrored
      material.onBeforeCompile = function (shader) {
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <map_fragment>',
          'vec2 mapUv = vUv; if (!gl_FrontFacing) { mapUv.x = 1.0 - mapUv.x; }' +
          'diffuseColor *= texture2D(map, mapUv);'
        );
      };

      var geometry = new THREE.PlaneGeometry(TILE_W, h);
      var mesh = new THREE.Mesh(geometry, material);
      var pos = dir.clone().multiplyScalar(RADIUS);
      mesh.position.copy(pos);
      mesh.lookAt(pos.clone().multiplyScalar(2));      // face outward, no random tilt
      mesh.frustumCulled = false;
      mesh.scale.setScalar(0);

      // hairline so the pale pages still read against the white page
      var edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({ color: 0x000000, transparent: true })
      );
      mesh.add(edge);

      globe.add(mesh);
      tiles.push({ mesh: mesh, material: material, edge: edge, pos: pos, dir: dir.clone().normalize() });
    });
  });

  /* Camera distance so the whole sphere (plus half a tile) fits the canvas, like the reference. */
  function fitCamera() {
    var e = RADIUS + 0.6 * TILE_W;
    var vf = FOV * Math.PI / 180;
    var hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
    camera.position.set(0, 0, 1.08 * Math.max(e / Math.tan(vf / 2), e / Math.tan(hf / 2)));
  }
  function resize() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    fitCamera();
  }
  resize();
  window.addEventListener('resize', resize);

  /* ----- pinned heading: words side by side -> screen edges -> back together (scroll-linked) ----- */
  var heading = document.querySelector('.featured-heading');
  var globeBox = canvas.parentElement;
  var progress = 0, smooth = 0;

  /* Same range as bleibtgleich's ScrollTrigger: starts when the globe's top reaches 75% of the viewport,
     ends when its bottom reaches 25%. 0.5 = globe centered on the pinned heading. */
  function readProgress() {
    var rect = globeBox.getBoundingClientRect();
    var vh = window.innerHeight;
    var total = 0.5 * vh + rect.height;
    progress = Math.min(1, Math.max(0, (0.75 * vh - rect.top) / total));
  }
  readProgress();
  window.addEventListener('scroll', readProgress, { passive: true });

  var headMin = 0, headMax = 0;
  function measureHeading() {
    if (!heading) return;
    heading.style.setProperty('--hw', '4000px');          // wide enough that the words take their natural size
    var kids = heading.children, sum = 0;
    for (var i = 0; i < kids.length; i++) sum += kids[i].offsetWidth;
    headMin = sum + root.clientWidth * 0.011;              // small gap between the words
    headMax = Math.max(headMin, root.clientWidth - Math.min(24, root.clientWidth * 0.03) * 2);
  }
  measureHeading();
  window.addEventListener('resize', measureHeading);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureHeading);

  /* ----- visibility: render only near the viewport; start the reveal when the globe first shows ----- */
  var visible = true, revealing = false, revealT = 0;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }, { rootMargin: '20% 0px' }).observe(section);
    new IntersectionObserver(function (entries, io) {
      if (entries[0].isIntersecting) { revealing = true; io.disconnect(); }
    }, { rootMargin: '0px 0px -10% 0px' }).observe(globeBox);
  } else {
    revealing = true;
  }

  /* ----- spin: constant idle rotation + drag with inertia ----- */
  var angle = 0;                                  // current Y rotation
  var dragVel = 0;                                // velocity added by dragging
  var spinVel = reduce ? 0 : IDLE_SPIN;           // current auto-spin speed
  var spinTarget = spinVel;
  var dragging = false, lastX = 0, idleFor = 0;

  globeBox.style.cursor = 'grab';
  globeBox.style.touchAction = 'pan-y';          // vertical swipes still scroll the page
  globeBox.addEventListener('pointerdown', function (e) {
    dragging = true; lastX = e.clientX; dragVel = 0;
    globeBox.style.cursor = 'grabbing';
    try { globeBox.setPointerCapture(e.pointerId); } catch (err) {}
  });
  globeBox.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX;
    dragVel = Math.max(-DRAG_MAX, Math.min(DRAG_MAX, dragVel + dx * DRAG_GAIN));
    lastX = e.clientX;
  });
  function endDrag() { dragging = false; globeBox.style.cursor = 'grab'; }
  globeBox.addEventListener('pointerup', endDrag);
  globeBox.addEventListener('pointercancel', endDrag);

  var bobTime = 0, last = performance.now();

  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) { last = now; return; }
    var dt = Math.min((now - last) / 1000, 0.05); last = now;
    var n = Math.min(1, 60 * dt);                 // frame-rate independent step (1 at 60 fps)

    // heading width (scroll-linked, smoothed)
    smooth += (progress - smooth) * Math.min(1, dt * 6);
    if (heading && headMax) {
      var k = 1 - Math.abs(2 * smooth - 1);       // 0 -> 1 -> 0, linear like the original
      heading.style.setProperty('--hw', (headMin + (headMax - headMin) * k).toFixed(1) + 'px');
    }

    // reveal: tiles grow outward from the center
    if (revealing && revealT < 1) revealT = Math.min(1, revealT + dt / REVEAL_SECONDS);
    var a = 1 - Math.pow(1 - revealT, 3);

    // spin
    if (dragging) { idleFor = 0; spinTarget = 0; }
    else { idleFor += dt; if (idleFor > 1) spinTarget = reduce ? 0 : IDLE_SPIN; }
    dragVel *= Math.pow(dragging ? 0.9 : 0.94, n);
    spinVel += (spinTarget - spinVel) * (dragging ? 0.18 : 0.03) * n;
    angle += (dragVel + spinVel) * n;
    globe.rotation.y = angle;

    bobTime += reduce ? 0 : dt * BOB_SPEED;
    var sin = Math.sin(angle), cos = Math.cos(angle);

    for (var i = 0; i < tiles.length; i++) {
      var t = tiles[i];
      // bob in and out along the normal; phase depends on height, so it ripples up the globe
      var off = 0.5 * (Math.sin(Math.PI * 2 * (bobTime + t.pos.y * BOB_WAVE)) + 1) * (reduce ? 0 : BOB);
      t.mesh.position.copy(t.pos).addScaledVector(t.dir, off).multiplyScalar(a);
      t.mesh.scale.setScalar(a);

      // how much the tile faces the camera (rotation about Y only): solid in front, ghost behind
      var facing = -t.dir.x * sin + t.dir.z * cos;
      var target = (facing > 0.25 ? 1 : facing > 0 ? 0.1 + (facing / 0.25) * 0.9 : 0.1) * a;
      t.material.opacity += (target - t.material.opacity) * 0.1 * n;
      t.edge.material.opacity = t.material.opacity * 0.85;
    }

    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
})();
