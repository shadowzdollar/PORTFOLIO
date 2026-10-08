/* Loading screen: portrait + name, shown until the page (fonts, images and
   the book script) has loaded. It stays at least MIN ms so it doesn't just
   flash, and never longer than MAX ms. Repeat visits in the same tab get a
   shorter minimum. */
(function () {
  var el = document.getElementById('preloader');
  if (!el) return;

  var seen = false;
  try { seen = sessionStorage.getItem('preloader-seen') === '1'; sessionStorage.setItem('preloader-seen', '1'); } catch (e) {}
  var MIN = seen ? 400 : 1600;
  var MAX = 4000;
  var start = performance.now();
  var done = false;

  function hide() {
    if (done) return;
    done = true;
    var wait = Math.max(0, MIN - (performance.now() - start));
    setTimeout(function () {
      el.classList.add('is-done');
      setTimeout(function () { el.remove(); }, 700);
    }, wait);
  }

  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
  setTimeout(hide, MAX);
})();
