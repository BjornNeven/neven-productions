/* Editmodus — alleen actief met ?edit in de URL. Klik een element aan, typ een opmerking.
   Opmerkingen staan in localStorage ('np-edit') en in window.__opmerkingen, zodat Claude ze kan uitlezen. */
(() => {
  const KEY = 'np-edit';
  const laad = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } };
  const bewaar = l => { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {} window.__opmerkingen = l; };
  let lijst = laad(); window.__opmerkingen = lijst;
  let kiezen = true, open = null;

  const css = document.createElement('style');
  css.textContent = `
  .npe-hover{outline:2px dashed #ffa51f !important; outline-offset:2px !important; cursor:crosshair !important}
  .npe-ui,.npe-ui *{font:13px/1.4 ui-monospace,Menlo,monospace !important; letter-spacing:0 !important; text-transform:none !important}
  .npe-balk{position:fixed; left:12px; bottom:12px; z-index:2147483000; display:flex; gap:6px; align-items:center;
    background:#111; color:#eee; border:1px solid #ffa51f; padding:6px 8px}
  .npe-balk button,.npe-pop button{background:#222; color:#eee; border:1px solid #444; padding:5px 9px; cursor:pointer}
  .npe-balk button.aan{background:#ffa51f; color:#000; border-color:#ffa51f}
  @media (max-width:759px){ .npe-balk{bottom:76px} }
  .npe-pop{position:fixed; z-index:2147483001; width:min(340px,92vw); background:#111; color:#eee; border:1px solid #ffa51f; padding:10px}
  .npe-pop textarea{width:100%; min-height:80px; background:#000; color:#fff; border:1px solid #444; padding:6px; box-sizing:border-box}
  .npe-pop .wat{color:#999; margin-bottom:6px; max-height:3.6em; overflow:hidden}
  .npe-pop .rij{display:flex; gap:6px; justify-content:flex-end; margin-top:6px}
  .npe-nr{position:absolute; z-index:2147482999; background:#ffa51f; color:#000; font:700 11px/18px ui-monospace,monospace;
    min-width:18px; height:18px; text-align:center; border-radius:9px; pointer-events:none}`;
  document.head.appendChild(css);

  const balk = document.createElement('div'); balk.className = 'npe-ui npe-balk';
  balk.innerHTML = `<b>Editmodus</b><button data-a="kies" class="aan">Selecteren: aan</button>
    <span data-a="n"></span><button data-a="kopie">Kopieer</button><button data-a="wis">Wis alles</button>`;
  document.body.appendChild(balk);

  function selector(el) {
    if (el.id) return '#' + el.id;
    const pad = [];
    while (el && el !== document.body && pad.length < 6) {
      let s = el.tagName.toLowerCase();
      if (el.id) { pad.unshift('#' + el.id); break; }
      const cls = [...el.classList].filter(c => !c.startsWith('npe-'))[0];
      if (cls) s += '.' + cls;
      const p = el.parentElement;
      if (p) { const zus = [...p.children].filter(c => c.tagName === el.tagName); if (zus.length > 1) s += `:nth-of-type(${zus.indexOf(el) + 1})`; }
      pad.unshift(s); el = p;
    }
    return pad.join(' > ');
  }
  const omschrijf = el => (el.alt || el.getAttribute('aria-label') || el.innerText || el.tagName).replace(/\s+/g, ' ').trim().slice(0, 90);

  function teken() {
    document.querySelectorAll('.npe-nr').forEach(n => n.remove());
    lijst.forEach((o, i) => {
      const el = document.querySelector(o.selector); if (!el) return;
      const r = el.getBoundingClientRect(), n = document.createElement('div');
      n.className = 'npe-nr'; n.textContent = i + 1;
      n.style.left = (r.left + scrollX - 6) + 'px'; n.style.top = (r.top + scrollY - 6) + 'px';
      document.body.appendChild(n);
    });
    balk.querySelector('[data-a=n]').textContent = `${lijst.length} opmerking${lijst.length === 1 ? '' : 'en'}`;
  }

  function popup(el, x, y) {
    sluit();
    const p = document.createElement('div'); p.className = 'npe-ui npe-pop';
    p.innerHTML = `<div class="wat"></div><textarea placeholder="Wat moet hier anders?"></textarea>
      <div class="rij"><button data-a="weg">Annuleer</button><button data-a="ok">Opslaan</button></div>`;
    p.querySelector('.wat').textContent = '→ ' + omschrijf(el);
    p.style.left = Math.min(x, innerWidth - 360) + 'px'; p.style.top = Math.min(y + 12, innerHeight - 190) + 'px';
    document.body.appendChild(p); open = p; p.querySelector('textarea').focus({ preventScroll: true });
    p.addEventListener('click', e => {
      const a = e.target.dataset.a; if (!a) return;
      if (a === 'ok') {
        const t = p.querySelector('textarea').value.trim();
        if (t) { lijst.push({ selector: selector(el), element: omschrijf(el), opmerking: t, tijd: new Date().toISOString() }); bewaar(lijst); }
      }
      sluit(); teken();
    });
    p.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) p.querySelector('[data-a=ok]').click(); if (e.key === 'Escape') sluit(); });
  }
  function sluit() { if (open) { open.remove(); open = null; } }

  let vorige = null;
  document.addEventListener('mouseover', e => {
    if (!kiezen || e.target.closest('.npe-ui')) return;
    vorige && vorige.classList.remove('npe-hover'); vorige = e.target; vorige.classList.add('npe-hover');
  }, true);
  document.addEventListener('click', e => {
    if (e.target.closest('.npe-ui')) return;
    if (!kiezen) return;
    e.preventDefault(); e.stopPropagation();
    e.target.classList.remove('npe-hover'); popup(e.target, e.clientX, e.clientY);
  }, true);

  balk.addEventListener('click', e => {
    const a = e.target.dataset.a;
    if (a === 'kies') { kiezen = !kiezen; e.target.classList.toggle('aan', kiezen); e.target.textContent = 'Selecteren: ' + (kiezen ? 'aan' : 'uit'); vorige && vorige.classList.remove('npe-hover'); }
    if (a === 'kopie') navigator.clipboard && navigator.clipboard.writeText(lijst.map((o, i) => `${i + 1}. [${o.element}] ${o.opmerking}`).join('\n'));
    if (a === 'wis') { lijst = []; bewaar(lijst); teken(); }
  });
  addEventListener('resize', teken); addEventListener('load', teken); setTimeout(teken, 800);
})();
