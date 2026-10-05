/* A small black cat that follows the mouse cursor.

   Movement is physical rather than scripted: the cat accelerates, walks (or
   trots when the cursor is far), slows down as it arrives, stands, sits and
   watches the cursor, grooms, and eventually lies down to sleep. Legs are
   animated procedurally (two-segment legs, cat gait order) and the stride is
   driven by the distance actually travelled, so the paws don't slide.

   Mouse-only: skipped on touch devices and when reduced motion is preferred. */
(function () {
  if (!window.matchMedia || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ------------------------------------------------------------------ drawing
  // side view, facing right, viewBox 80x54, ground at y = 52
  var SVG =
    '<svg viewBox="0 0 80 54" aria-hidden="true"><g class="rig">' +
      '<g class="pose-walk">' +
        '<path class="tail" />' +
        '<polyline class="leg far" data-leg="bf" />' +
        '<polyline class="leg far" data-leg="ff" />' +
        '<path class="torso" d="M18 29 C18 22 27 20 37 21 C46 22 52 19 57 22 C61 25 59 33 54 35 C46 38 31 38 24 36 C20 34.5 18 32 18 29Z" />' +
        '<polyline class="leg" data-leg="bn" />' +
        '<polyline class="leg" data-leg="fn" />' +
      '</g>' +
      '<g class="pose-sit">' +
        '<path class="tail sit-tail" d="M24 49 C31 54 45 54 53 50" />' +
        '<ellipse cx="30" cy="41" rx="12" ry="10" />' +
        '<path d="M24 41 C22 28 34 18 44 18 C50 19 52 26 50 34 C49 42 44 48 36 49 Z" />' +
        '<ellipse cx="36" cy="50.5" rx="6" ry="2.2" />' +
        '<path class="leg far" d="M45 32 L46 51 L48 51" />' +
        '<path class="leg groom-leg" d="M48 32 L49 51 L51.5 51" />' +
      '</g>' +
      '<g class="pose-lie">' +
        '<path class="tail" d="M15 46 C9 53 30 55 49 51" />' +
        '<path class="lie-body" d="M12 44 C12 34 26 31 38 32 C48 33 56 37 56 45 C56 50 50 52 36 52 C22 52 12 51 12 44Z" />' +
        '<ellipse cx="55" cy="51" rx="5" ry="2" />' +
        '<text class="zzz" x="66" y="30">z</text><text class="zzz z2" x="71" y="22">z</text>' +
      '</g>' +
      '<g class="head">' +
        '<polygon class="ear far" points="-5,-3 -4,-12.5 1,-6" />' +
        '<ellipse rx="7.5" ry="6.5" />' +
        '<ellipse cx="5.5" cy="2" rx="4" ry="3" />' +
        '<polygon class="ear near" points="-1,-5 2.5,-13 5,-4" />' +
        '<g class="eye-open"><path class="eye" d="M1 -1.2 Q3.4 -3.4 5.6 -1.2 Q3.4 0.8 1 -1.2Z" /><ellipse class="pupil" cx="3.6" cy="-1.2" rx="0.6" ry="1.3" /></g>' +
        '<path class="eye-closed" d="M1 -0.8 Q3.3 0.8 5.6 -0.8" />' +
        '<path class="whisker" d="M8 2.5 L14.5 1.2 M8 3.2 L14.5 4.2" />' +
      '</g>' +
    '</g></svg>';

  var cat = document.createElement('div');
  cat.className = 'cursor-cat is-sit';
  cat.innerHTML = SVG;
  document.body.appendChild(cat);

  var svg = cat.firstChild;
  var rig = svg.firstChild;
  var head = svg.querySelector('.head');
  var torso = svg.querySelector('.torso');
  var tail = svg.querySelector('.pose-walk .tail');
  var legs = {};
  svg.querySelectorAll('.pose-walk .leg').forEach(function (el) { legs[el.getAttribute('data-leg')] = el; });

  // ------------------------------------------------------------------ tuning
  var W = 72, H = 48.6;              // rendered size (viewBox 80x54 at 0.9)
  var STOP = 52;                     // distance from the target where it settles
  var WALK = 1.15;                   // px per frame (~70 px/s)
  var TROT = 2.3;                    // px per frame (~140 px/s), only when far away
  var TROT_FROM = 360;               // distance at which it starts to trot
  var ACCEL = 0.045, BRAKE = 0.07;   // px per frame²
  var SIT_AFTER = 700;               // ms standing before it sits
  var LIE_AFTER = 9000;              // ms without mouse movement before it lies down

  // legs: hip position, segment lengths, knee bend direction, gait phase offset
  var LEG = {
    bf: { hx: 24, hy: 31, a: 11, b: 10.5, bend: 1, walk: 0.5, trot: 0.5 },
    ff: { hx: 49, hy: 31, a: 10, b: 10.5, bend: -1, walk: 0.75, trot: 0 },
    bn: { hx: 27, hy: 32, a: 11, b: 10.5, bend: 1, walk: 0, trot: 0 },
    fn: { hx: 52, hy: 32, a: 10, b: 10.5, bend: -1, walk: 0.25, trot: 0.5 }
  };
  var GROUND = 52;

  // head placement per pose (x, y, rotation in degrees)
  var HEAD = { walk: [61, 20, 0], sit: [47, 14, 0], lie: [56, 42, 8], stretch: [64, 27, 14] };

  // ------------------------------------------------------------------ state
  var x = 70, y = innerHeight - 24;  // the cat's feet
  var vx = 0, vy = 0;
  var mx = x, my = y;                // last cursor position
  var facing = 1;
  var phase = 0, amp = 0;            // gait cycle and how strongly legs move
  var state = 'sit', since = performance.now();
  var lastMouse = performance.now() - LIE_AFTER + 2500;
  var trotting = false;
  var nextGroom = performance.now() + 4000, nextTwitch = performance.now() + 2500;
  var last = performance.now();

  function setState(s, now) {
    if (s === state) return;
    cat.classList.remove('is-' + state);
    cat.classList.add('is-' + s);
    // ease the head between poses, but let it follow the gait while walking
    head.style.transition = (s === 'walk') ? 'none' : 'transform 0.45s ease';
    state = s;
    since = now;
  }

  function setFacing(f) {
    if (f === facing) return;
    facing = f;
    rig.style.transform = 'scaleX(' + f + ')';
  }

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    lastMouse = performance.now();
  }, { passive: true });

  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.spine')) return;
    cat.classList.remove('hop');
    void cat.offsetWidth;            // restart the hop animation
    cat.classList.add('hop');
  });

  // ------------------------------------------------------------------ legs
  function solveLeg(L, fx, fy) {
    // two-bone IK: hip -> knee -> foot
    var dx = fx - L.hx, dy = fy - L.hy;
    var d = Math.min(Math.hypot(dx, dy), L.a + L.b - 0.01);
    var base = Math.atan2(dy, dx);
    var k = Math.acos(Math.max(-1, Math.min(1, (L.a * L.a + d * d - L.b * L.b) / (2 * L.a * d))));
    var ang = base + L.bend * k;
    var kx = L.hx + L.a * Math.cos(ang), ky = L.hy + L.a * Math.sin(ang);
    var footX = L.hx + d * Math.cos(base), footY = L.hy + d * Math.sin(base);
    return L.hx.toFixed(1) + ',' + L.hy + ' ' + kx.toFixed(1) + ',' + ky.toFixed(1) + ' ' +
      footX.toFixed(1) + ',' + footY.toFixed(1) + ' ' + (footX + 2.2).toFixed(1) + ',' + footY.toFixed(1);
  }

  function drawWalk(speed, t) {
    var stride = 5 + speed * 4.5;                 // stride length grows with speed
    var duty = trotting ? 0.5 : 0.62;             // share of the cycle a paw is on the ground
    var lift = 2.4 + speed * 1.2;
    Object.keys(LEG).forEach(function (k) {
      var L = LEG[k];
      var p = (phase + (trotting ? L.trot : L.walk)) % 1;
      var fx, fy;
      if (state === 'stretch') {
        // front paws reach forward, rump up
        fx = k[0] === 'f' ? 9 : -3;
        fy = 0;
      } else if (p < duty) {
        var u = p / duty;
        fx = stride / 2 - u * stride;
        fy = 0;
      } else {
        var w = (p - duty) / (1 - duty);
        var e = w * w * (3 - 2 * w);              // smoothstep swing
        fx = -stride / 2 + e * stride;
        fy = -Math.sin(Math.PI * w) * lift;
      }
      if (state !== 'stretch') { fx *= amp; fy *= amp; }
      legs[k].setAttribute('points', solveLeg(L, L.hx + 1 + fx, GROUND + fy));
    });

    // body rises slightly twice per cycle, head counter-bobs, tail sways
    var bob = Math.abs(Math.sin(phase * Math.PI * 2)) * 0.7 * amp;
    var tilt = state === 'stretch' ? -7 : 0;
    torso.setAttribute('transform', 'translate(0 ' + (-bob).toFixed(2) + ') rotate(' + tilt + ' 52 30)');
    var sway = Math.sin(t / 420) * 2.5 + Math.sin(phase * Math.PI * 2) * 1.2 * amp;
    var tipY = trotting ? 14 : 8;
    tail.setAttribute('d', 'M19 27 C11 26 7 ' + (19 + amp * 2).toFixed(1) + ' ' + (8 + sway).toFixed(1) + ' ' + tipY);
    if (state === 'walk' || state === 'stand') {
      var hb = Math.sin(phase * Math.PI * 4 + 1) * 0.5 * amp;
      head.style.transform = 'translate(' + HEAD.walk[0] + 'px,' + (HEAD.walk[1] + hb).toFixed(2) + 'px) rotate(0deg)';
    }
  }

  function placeHead(pose, extraRot) {
    var h = HEAD[pose];
    head.style.transform = 'translate(' + h[0] + 'px,' + h[1] + 'px) rotate(' + (h[2] + (extraRot || 0)).toFixed(1) + 'deg)';
  }

  // ------------------------------------------------------------------ loop
  function frame(now) {
    var dt = Math.min(now - last, 50) / 16.7;     // ~1 at 60fps
    last = now;

    // settle just under the pointer, but never aim somewhere it can't reach
    var tx = Math.max(W / 2, Math.min(innerWidth - W / 2, mx));
    var ty = Math.max(H, Math.min(innerHeight - 2, my + 30));
    var dx = tx - x, dy = ty - y;
    var dist = Math.hypot(dx, dy);
    var speed = Math.hypot(vx, vy);
    var wantsToGo = dist > STOP + 18;

    // decide what to do
    if (state === 'lie' && wantsToGo) setState('stretch', now);
    else if (state === 'stretch' && now - since > 900) setState('walk', now);
    else if (state === 'sit' && wantsToGo) setState('rise', now);
    else if (state === 'rise' && now - since > 320) setState('walk', now);
    else if (state === 'stand' && wantsToGo) setState('walk', now);
    else if (state === 'stand' && now - since > SIT_AFTER) setState('sit', now);
    else if (state === 'sit' && now - lastMouse > LIE_AFTER && now - since > 2500) setState('lie', now);
    else if (state === 'walk' && dist <= STOP + 4 && speed < 0.2) setState('stand', now);

    // steering: walk, or trot when far; slow down when arriving
    if (state === 'walk') {
      if (dist > TROT_FROM) trotting = true;
      else if (dist < TROT_FROM * 0.5) trotting = false;
      // ease in on arrival, but keep a minimum pace so it actually gets there
      var target = dist > STOP + 3 ? Math.max(0.3, Math.min(trotting ? TROT : WALK, (dist - STOP) * 0.035)) : 0;
      var dvx = (dist ? dx / dist : 0) * target - vx;
      var dvy = (dist ? dy / dist : 0) * target - vy;
      var dv = Math.hypot(dvx, dvy);
      var lim = (target < speed ? BRAKE : ACCEL) * dt;
      if (dv > lim) { dvx *= lim / dv; dvy *= lim / dv; }
      vx += dvx; vy += dvy;
    } else {
      vx = vy = 0;
    }
    x += vx * dt;
    y += vy * dt;
    speed = Math.hypot(vx, vy);

    // turn only with real sideways movement, or to face the cursor while sitting
    if (state === 'walk' && Math.abs(vx) > 0.25) setFacing(vx > 0 ? 1 : -1);
    if ((state === 'sit' || state === 'stand') && Math.abs(mx - x) > 70) setFacing(mx > x ? 1 : -1);

    // gait advances by distance travelled, so paws stay planted
    var cycle = (5 + speed * 4.5) / (trotting ? 0.5 : 0.62);
    phase = (phase + (speed * dt) / cycle) % 1;
    var ampTarget = state === 'walk' ? Math.min(1, speed / 0.5) : 0;
    amp += (ampTarget - amp) * Math.min(1, 0.15 * dt);

    if (state === 'walk' || state === 'stand' || state === 'rise' || state === 'stretch') {
      drawWalk(speed, now);
      if (state === 'stretch') placeHead('stretch');
      if (state === 'rise') placeHead('walk');
    } else if (state === 'sit') {
      // watch the cursor: tilt the head up/down toward it
      var look = Math.atan2(my - (y - 40), Math.abs(mx - x) + 30) * 180 / Math.PI;
      var grooming = cat.classList.contains('groom');
      placeHead('sit', grooming ? 28 : Math.max(-25, Math.min(18, look * 0.6)));
      if (!grooming && now > nextGroom) {
        cat.classList.add('groom');
        setTimeout(function () { cat.classList.remove('groom'); }, 1800);
        nextGroom = now + 7000 + Math.random() * 8000;
      }
    } else if (state === 'lie') {
      placeHead('lie');
    }

    if (now > nextTwitch) {
      cat.classList.remove('twitch');
      void cat.offsetWidth;
      cat.classList.add('twitch');
      nextTwitch = now + 2500 + Math.random() * 5000;
    }

    // keep on screen
    x = Math.max(W / 2, Math.min(innerWidth - W / 2, x));
    y = Math.max(H, Math.min(innerHeight - 2, y));
    cat.style.transform = 'translate(' + (x - W / 2).toFixed(1) + 'px,' + (y - H * 52 / 54).toFixed(1) + 'px)';

    requestAnimationFrame(frame);
  }

  placeHead('sit');
  requestAnimationFrame(frame);
})();
