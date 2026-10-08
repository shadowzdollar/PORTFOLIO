/* Navigation for the interactive book.

   - Top bar: jump to Contents / Projects / Contact, and switch between the
     flip-book and a plain scrolling "Reader" view.
   - Arrow keys turn pages; entries on the Contents page are clickable.
   - The Reader view is built from the same .pc page blocks, so the text lives
     in one place. Phones start in the Reader, because the book's text is too
     small to read at that width.

   Page turns are driven by clicking the .spine elements, which is what the
   Webflow interactions listen for. A spine with .indexzero is turned. */
(function () {
  var spines = Array.prototype.slice.call(document.querySelectorAll('.spine'));
  var root = document.documentElement;
  var queue = [];
  var busy = false;

  function turned() {
    var n = 0;
    while (n < spines.length && spines[n].classList.contains('indexzero')) n++;
    return n;
  }

  // one page turn at a time, spaced so the flip animations don't collide
  function pump() {
    if (busy || !queue.length) return;
    busy = true;
    queue.shift()();
    setTimeout(function () { busy = false; pump(); }, 260);
  }

  function goTo(target) {
    target = Math.max(0, Math.min(spines.length, target));
    queue.length = 0;
    var n = turned();
    var step = target > n ? 1 : -1;
    for (; n !== target; n += step) {
      (function (i) { queue.push(function () { spines[i].click(); }); })(step > 0 ? n : n - 1);
    }
    pump();
  }

  // number of turned spines needed to show a page block
  function spreadOf(pc) {
    var spine = pc.closest('.spine');
    var i = spines.indexOf(spine);
    return pc.closest('.left-side-back') ? i + 1 : i;
  }

  function byPage(name) { return document.querySelector('.pc[data-page="' + name + '"]'); }

  // ------------------------------------------------------------------ reader
  var reader = document.createElement('main');
  reader.className = 'reader';
  reader.id = 'reader';
  reader.setAttribute('aria-label', 'Portfolio, reader view');

  var article = null;
  document.querySelectorAll('.pc').forEach(function (pc) {
    var continued = pc.querySelector('.kicker span');
    if (!continued || !article) {
      article = document.createElement('section');
      article.className = 'rd-section';
      article.id = 'rd-' + pc.getAttribute('data-page');
      reader.appendChild(article);
    }
    var copy = pc.cloneNode(true);
    copy.removeAttribute('data-page');
    copy.className = 'rd-page';
    if (continued) copy.querySelector('.kicker').remove();
    copy.querySelectorAll('.fleuron').forEach(function (f) { f.remove(); });
    while (copy.firstChild) article.appendChild(copy.firstChild);
  });
  var glance = document.querySelector('.glance');
  if (glance) reader.firstChild.after(glance.cloneNode(true));
  document.querySelector('.document-view').after(reader);

  function setMode(mode, remember) {
    root.classList.toggle('mode-reader', mode === 'reader');
    document.querySelectorAll('[data-mode]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-mode') === mode));
    });
    if (remember) { try { localStorage.setItem('book-mode', mode); } catch (e) {} }
  }

  var saved = null;
  try { saved = localStorage.getItem('book-mode'); } catch (e) {}
  setMode(saved || (matchMedia('(max-width: 767px)').matches ? 'reader' : 'book'), false);

  // ------------------------------------------------------------------ controls
  document.querySelectorAll('[data-mode]').forEach(function (b) {
    b.addEventListener('click', function () { setMode(b.getAttribute('data-mode'), true); });
  });

  document.querySelectorAll('[data-goto]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var name = link.getAttribute('data-goto');
      if (root.classList.contains('mode-reader')) {
        var sec = document.getElementById('rd-' + name);
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      var pc = byPage(name);
      if (pc) {
        goTo(spreadOf(pc));
        document.querySelector('.document-view').scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // contents page entries jump to their chapter
  document.querySelectorAll('.toc li[data-goto]').forEach(function (li) {
    li.setAttribute('role', 'link');
    li.setAttribute('tabindex', '0');
    li.addEventListener('keydown', function (e) { if (e.key === 'Enter') li.click(); });
  });

  document.addEventListener('keydown', function (e) {
    if (root.classList.contains('mode-reader') || e.altKey || e.ctrlKey || e.metaKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(turned() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(turned() - 1); }
  });
})();
