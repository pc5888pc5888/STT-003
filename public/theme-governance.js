(() => {
  const style = document.createElement('style');
  style.textContent = `
    /* White-gold civilization is the primary surface. Dark panels become warm institutional pauses. */
    .hv-dark{background:#eee4d6!important;color:#2a251f!important;border-color:#d8c6ac!important}
    .hv-dark .hv-heading{color:#2a251f!important}
    .hv-dark .hv-desc{color:#70675d!important}
    .hv-dark .hv-eyebrow{color:#9b6e36!important}
    .hv-mis{background:#d9c8ae!important;border-color:#d9c8ae!important}
    .hv-mis div{background:#f7f1e8!important;color:#3c342c!important}
    .hv-mis b{color:#9b6e36!important}
    .hv-final{background:linear-gradient(135deg,#eee3d4 0%,#faf6ef 58%,#e5d5bf 100%)!important;color:#2a251f!important;border-top:1px solid #d8c6ac!important}
    .hv-final h2{color:#2a251f!important}.hv-final p{color:#70675d!important}
    .pd-method{background:#eee4d6!important;color:#2a251f!important;border:1px solid #d8c6ac!important}
    .pd-method .pd-items{border-color:#d8c6ac!important}
    .pd-method .pd-item{background:#f8f2e9!important;color:#50473e!important;border-color:#d8c6ac!important}

    /* Thematic 3D gold object: one small secondary artifact only on a named core topic. */
    .stt-thematic-gold{position:absolute;z-index:6;width:clamp(58px,7vw,92px);height:auto;right:7%;bottom:7%;border-radius:50%;box-shadow:0 15px 36px rgba(93,62,28,.18);filter:saturate(.9) contrast(1.02);pointer-events:none}
    @media(max-width:900px){.stt-thematic-gold{width:56px;right:5%;bottom:5%}}
  `;
  document.head.appendChild(style);

  const routeAsset = {
    '/problems/major-decision': '/images/theme-gold-decision.webp'
  };

  function apply(){
    const src = routeAsset[location.pathname];
    if (!src) return;
    const host = document.querySelector('.pd-visual');
    if (!host || host.querySelector('.stt-thematic-gold')) return;
    const img = document.createElement('img');
    img.className = 'stt-thematic-gold';
    img.src = src;
    img.alt = '';
    img.setAttribute('aria-hidden','true');
    host.appendChild(img);
  }
  apply();
  new MutationObserver(apply).observe(document.documentElement,{subtree:true,childList:true});
  addEventListener('popstate',()=>setTimeout(apply,0));
})();