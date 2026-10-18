/* BATTERY control library - the clip player (rewrite Step 5b). SPLIT from lib/ui.js so ARM loads only the control it uses
   (the clip card) and the host-only UIDrawer stays in lib/ui.js - the v251 "iframes do not load ui.js / UIDrawer is host-only"
   invariant (lib-ui.test.mjs) is preserved. Loaded by arm.html's lib document.write; host + FUEL do not load it.
   Spec: docs/ARCH-DA-capacitor-structure-2026-10-13.md sec 5 + docs/STEP5b-CLIPCARD-SIGNATURE-2026-10-18.md. */
/* ClipCard: the inline exercise clip player card (v194), lifted here VERBATIM in behaviour as a PURE
   control (rewrite Step 5b — DA sec 5). createElement-only (footgun-immune) and holds ZERO app
   knowledge: the credit table (sourceFor), the official-demo table (officialFor), the playback-rate
   persistence (arm-care-clipspeed lives in ARM, reached only through rate.get/set), and the clips/
   base URL (parent.location.href in ARM, reached only through baseUrl) are ALL injected by the caller.
   It owns only the card's own mechanics: preview img, play overlay, inline <video>, the inline speed
   buttons, the single-video 'stop others' contract, and the ⤢ fullscreen / .big fallback chrome —
   every DOM op scoped to the document it is handed (doc), so two consumers in two documents never
   collide. The clip CSS (.clip-card-anim, .clip-preview, .clip-speed-inline, .big, #clip-scrim …)
   stays in the consuming document; this control only builds the markup those rules style.

   ClipCard.create(opts) -> HTMLElement (the card). opts:
     file        (required) clip filename, e.g. 'tube-forward.mp4'
     label       display label; default = file without .mp4, dashes -> spaces
     sourceFor   fn(file) -> [prefix,title,url] | null   credit lookup      (default: null credit)
     officialFor fn(file) -> url | null                  official-demo link (default: no link-out url)
     rate        { get:function()->number, set:function(number) }  rate persistence (default: in-memory, 1x)
     baseUrl     absolute prefix for clips/ + clips/previews/        (default '' = relative to doc)
     doc         document to build in + scope stop-others/big-chrome (default root.document)
   Pure: reads/writes nothing but the DOM it is given; defines no app global; no behaviour change vs
   the ARM buildClipCard it replaces (gated by clip-player + clip-preview-paint + lib-clipcard). */
var ClipCard=(function(){
  var root=(typeof window!=='undefined')?window:this;
  var _escDocs=(typeof WeakSet!=='undefined')?new WeakSet():null, _escList=[];
  function escArmed(doc){ if(_escDocs)return _escDocs.has(doc); for(var i=0;i<_escList.length;i++){ if(_escList[i]===doc)return true; } return false; }
  function markEsc(doc){ if(_escDocs)_escDocs.add(doc); else _escList.push(doc); }
  function clamp(r){ r=parseFloat(r); return (r===0.5||r===0.25)?r:1; }
  // single-video: pause every OTHER playing card in this document (the component's own contract)
  function stopOthers(doc, except){
    var cards=doc.querySelectorAll('.clip-card-anim.playing');
    for(var i=0;i<cards.length;i++){ if(cards[i]===except) continue;
      var v=cards[i].querySelector('video'); if(v){ try{v.pause();}catch(e){} }
      cards[i].classList.remove('playing'); }
  }
  // ⤢ fullscreen with a .big fixed-overlay fallback + scrim chrome, created once per document
  function ensureBigChrome(doc){
    if(doc.getElementById('clip-scrim')) return;
    var s=doc.createElement('div'); s.id='clip-scrim';
    s.addEventListener('click', function(){ exitAllBig(doc); }); doc.body.appendChild(s);
    var x=doc.createElement('button'); x.id='clip-exitbig'; x.type='button';
    x.textContent='✕ Close'; x.addEventListener('click', function(){ exitAllBig(doc); }); doc.body.appendChild(x);
  }
  function exitAllBig(doc){
    var big=doc.querySelectorAll('.clip-card-anim.big');
    for(var i=0;i<big.length;i++) big[i].classList.remove('big');
    var s=doc.getElementById('clip-scrim'); if(s) s.classList.remove('open');
    var x=doc.getElementById('clip-exitbig'); if(x) x.classList.remove('show');
  }
  function bigFallback(doc, card){
    ensureBigChrome(doc); card.classList.add('big');
    var s=doc.getElementById('clip-scrim'); if(s) s.classList.add('open');
    var x=doc.getElementById('clip-exitbig'); if(x) x.classList.add('show');
  }
  function goBig(doc, card){
    var v=card.querySelector('video');
    if(v && typeof v.webkitEnterFullscreen==='function'){ try{ v.webkitEnterFullscreen(); return; }catch(e){} }
    var fn=card.requestFullscreen||card.webkitRequestFullscreen;
    if(!fn){ bigFallback(doc, card); return; }
    var p=null; try{ p=fn.call(card); }catch(e){ bigFallback(doc, card); return; }
    if(p && typeof p.then==='function'){ p.catch(function(){ bigFallback(doc, card); }); }
  }
  function create(opts){
    opts=opts||{};
    var file=opts.file||'';
    var label=opts.label;
    var sourceFor=(typeof opts.sourceFor==='function')?opts.sourceFor:function(){return null;};
    var officialFor=(typeof opts.officialFor==='function')?opts.officialFor:function(){return null;};
    var rate=opts.rate||{}; var rateGet=(typeof rate.get==='function')?rate.get:null, rateSet=(typeof rate.set==='function')?rate.set:null;
    var _mem=1; // in-memory fallback when no persistence is injected
    function getRate(){ var r; if(rateGet){ try{ r=rateGet(); }catch(e){ r=_mem; } } else r=_mem; return clamp(r); }
    function putRate(r){ r=clamp(r); _mem=r; if(rateSet){ try{ rateSet(r); }catch(e){} } }
    var baseUrl=(typeof opts.baseUrl==='string')?opts.baseUrl:'';
    var doc=opts.doc||root.document;

    var key = file.replace(/\.mp4$/,'');
    var srcInfo = sourceFor(file);
    if(!escArmed(doc)){ doc.addEventListener('keydown', function(e){ if(e.key==='Escape') exitAllBig(doc); }); markEsc(doc); }

    var card = doc.createElement('div');
    card.className = 'clip-card-anim';
    card.setAttribute('role','button'); card.tabIndex = 0;
    card.setAttribute('aria-label', 'Play clip: ' + (label || key.replace(/-/g,' ')));
    var prev = doc.createElement('div');
    prev.className = 'clip-preview';
    var img = doc.createElement('img');
    img.className = 'clip-preview-img';
    img.loading = 'lazy';
    img.src = baseUrl + 'clips/previews/preview-' + key + '.webp';
    img.alt = ''; img.setAttribute('aria-hidden','true');
    /* Hide ONLY on a real load failure (404). The off-screen observer pauses by blanking src;
       that fires a spurious error which must NOT hide the preview (it never came back). */
    img.onerror = function(){ if(this._paused) return; this.onerror=null; this.style.display='none'; };
    prev.appendChild(img);
    var badge = doc.createElement('div'); badge.className='clip-loop-badge';
    var dot = doc.createElement('span'); dot.className='clip-loop-dot';
    badge.appendChild(dot); badge.appendChild(doc.createTextNode('Preview'));
    prev.appendChild(badge);
    var ovr = doc.createElement('div'); ovr.className='clip-play-overlay';
    var pbtn = doc.createElement('div'); pbtn.className='clip-play-btn';
    var tri = doc.createElement('div'); tri.className='clip-play-tri';
    pbtn.appendChild(tri); ovr.appendChild(pbtn); prev.appendChild(ovr);
    var fsb = doc.createElement('button'); fsb.className='clip-fsbtn'; fsb.type='button';
    fsb.setAttribute('aria-label','Expand to full screen'); fsb.textContent='⤢';
    prev.appendChild(fsb);
    /* 4.2: explicit slow-mo control (coaching feature; iOS native controls hide speed) */
    var speed = doc.createElement('div'); speed.className='clip-speed-inline';
    [['1','1×'],['0.5','½×'],['0.25','¼×']].forEach(function(p){
      var sb=doc.createElement('button'); sb.type='button'; sb.className='cs-ib';
      sb.setAttribute('data-rate',p[0]); sb.setAttribute('aria-label','Play at '+p[1]); sb.textContent=p[1];
      sb.addEventListener('click', function(ev){ ev.stopPropagation(); setInlineRate(parseFloat(p[0])); });
      speed.appendChild(sb);
    });
    prev.appendChild(speed);
    function syncSpeedBtns(r){ var bs=speed.querySelectorAll('.cs-ib');
      for(var i=0;i<bs.length;i++){ bs[i].classList.toggle('on', parseFloat(bs[i].getAttribute('data-rate'))===r); } }
    function setInlineRate(r){ putRate(r);
      if(video){ try{ video.playbackRate=getRate(); }catch(e){} } syncSpeedBtns(getRate()); }
    card.appendChild(prev);
    var footer = doc.createElement('div'); footer.className='clip-card-footer';
    var lbl = doc.createElement('span'); lbl.className='clip-card-label';
    lbl.textContent = label || key.replace(/-/g,' ');
    footer.appendChild(lbl);
    if(srcInfo){
      var cr=doc.createElement('a'); cr.className='clip-card-full';
      cr.href=srcInfo[2]; cr.target='_blank'; cr.rel='noopener';
      cr.textContent=srcInfo[1]+' ↗';
      cr.addEventListener('click', function(ev){ ev.stopPropagation(); });
      footer.appendChild(cr);
    } else {
      var full=doc.createElement('span'); full.className='clip-card-full'; full.textContent='Full video';
      footer.appendChild(full);
    }
    card.appendChild(footer);

    var video=null, failed=false;
    function linkOut(){
      if(failed) return; failed=true;
      var url=officialFor(file) || (srcInfo?srcInfo[2]:null);
      var a=doc.createElement('a'); a.className='clip-linkout';
      a.href=url||'#'; a.target='_blank'; a.rel='noopener';
      a.appendChild(doc.createTextNode('▶ Watch official demo ↗'));
      a.addEventListener('click', function(ev){ ev.stopPropagation(); });
      prev.appendChild(a); card.classList.add('playing');
    }
    function play(){
      if(failed){ var u=officialFor(file)||(srcInfo?srcInfo[2]:null); if(u) root.open(u,'_blank','noopener'); return; }
      stopOthers(doc, card);
      if(!video){
        video=doc.createElement('video');
        video.setAttribute('controls',''); video.setAttribute('playsinline',''); video.preload='metadata';
        video.src = baseUrl + 'clips/' + file;
        video.addEventListener('error', function(){
          if(video && video.parentNode) video.parentNode.removeChild(video);
          video=null; card.classList.remove('playing'); linkOut();
        });
        prev.appendChild(video);
        try { video.playbackRate = getRate(); } catch(e){}
      }
      card.classList.add('playing');
      syncSpeedBtns(getRate());
      var pr=video.play(); if(pr && pr.catch) pr.catch(function(){});
    }
    pbtn.addEventListener('click', function(ev){ ev.stopPropagation(); play(); });
    ovr.addEventListener('click', function(ev){ ev.stopPropagation(); play(); });
    card.addEventListener('click', function(){ if(!card.classList.contains('playing')) play(); });
    card.addEventListener('dblclick', function(){ if(!card.classList.contains('playing')) play(); goBig(doc, card); });
    fsb.addEventListener('click', function(ev){ ev.stopPropagation(); goBig(doc, card); });
    card.addEventListener('keydown', function(e){
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); play(); }
      else if(e.key==='f' || e.key==='F'){ goBig(doc, card); }
      else if(e.key==='Escape'){ exitAllBig(doc); }
    });
    return card;
  }
  return { create:create };
})();
window.ClipCard=ClipCard;

/* ClipModal: the demo-clip MODAL (the #clip-modal overlay driven by the ~40 clip-btn openClip() buttons),
   lifted here as a PURE control (rewrite Step 5b Stage-2). Unlike ClipCard it drives PRE-EXISTING markup
   (the overlay stays in arm.html, inline onclick/onerror handlers unchanged), so it is MOUNT-based: the
   caller hands it the element ids + the same injected deps as ClipCard (sourceFor, officialFor, rate, baseUrl),
   and gets back { open, close, setRate, failed, current }. It holds ZERO app knowledge — no credit table,
   no arm-care key, no parent.location, no ARM selector beyond the ids it is given. Output byte-identical to
   the ARM openClip/closeClip/setClipRate/clipFailed it replaces; the caller keeps those as thin global shims
   so every inline handler in the markup still works with no markup change. Esc-to-close owned here (one
   listener per mount). Gated by clip-playback.test.mjs (the modal's existing behaviour) + lib-clipcard.

   ClipModal.mount(opts) -> { open(name), close(), setRate(r), failed(), current() }. opts:
     doc         document the modal lives in              (default root.document)
     ids         { modal, video, official, credit, speed } element ids (default 'clip-'+key)
     sourceFor   fn(file) -> [prefix,title,url] | null     (default: null credit)
     officialFor fn(file) -> url | null                    (default: no link-out)
     rate        { get:()->number, set:(number) }          (default: in-memory, 1x; clamps to {0.5,0.25} else 1)
     baseUrl     absolute prefix for clips/                (default '' = relative) */
var ClipModal=(function(){
  var root=(typeof window!=='undefined')?window:this;
  function clamp(r){ r=parseFloat(r); return (r===0.5||r===0.25)?r:1; }
  function mount(opts){
    opts=opts||{};
    var doc=opts.doc||root.document;
    var ids=opts.ids||{};
    var sourceFor=(typeof opts.sourceFor==='function')?opts.sourceFor:function(){return null;};
    var officialFor=(typeof opts.officialFor==='function')?opts.officialFor:function(){return null;};
    var rate=opts.rate||{}; var rateGet=(typeof rate.get==='function')?rate.get:null, rateSet=(typeof rate.set==='function')?rate.set:null;
    var _mem=1;
    function getRate(){ var r; if(rateGet){ try{ r=rateGet(); }catch(e){ r=_mem; } } else r=_mem; return clamp(r); }
    function putRate(r){ r=clamp(r); _mem=r; if(rateSet){ try{ rateSet(r); }catch(e){} } }
    var baseUrl=(typeof opts.baseUrl==='string')?opts.baseUrl:'';
    var cur='';
    function el(k){ return doc.getElementById(ids[k]||('clip-'+k)); }
    function applyRate(){
      var v=el('video'); var r=getRate(); if(v){ try{ v.playbackRate=r; }catch(e){} }
      var sp=el('speed'); if(sp) sp.querySelectorAll('.cs-btn').forEach(function(b){ b.classList.toggle('on', parseFloat(b.getAttribute('data-rate'))===r); });
    }
    function open(name){
      var m=el('modal'), v=el('video'); if(!m||!v) return;
      cur=name||''; m.classList.remove('no-clip');
      var a=el('official'); if(a) a.style.display='none';
      v.src = baseUrl + 'clips/' + name;
      var cr=el('credit');
      if(cr){
        cr.textContent='';
        var si=sourceFor(cur);
        if(si){
          cr.appendChild(doc.createTextNode('Cut from: '));
          var lk=doc.createElement('a'); lk.href=si[2]; lk.target='_blank'; lk.rel='noopener';
          lk.textContent=si[1]+' ↗';
          cr.appendChild(lk); cr.style.display='block';
        } else { cr.style.display='none'; }
      }
      try{ v.load(); }catch(e){}
      applyRate();
      m.classList.add('on');
    }
    function setRate(r){ putRate(r); applyRate(); }
    function failed(){
      var m=el('modal'); if(m) m.classList.add('no-clip');
      var a=el('official');
      if(a){ var u=officialFor(cur); if(u){ a.href=u; a.style.display='inline-block'; } else { a.style.display='none'; } }
    }
    function close(){
      var m=el('modal'), v=el('video');
      if(v){ try{ v.pause(); }catch(e){} v.removeAttribute('src'); try{ v.load(); }catch(e){} }
      if(m){ m.classList.remove('on'); m.classList.remove('no-clip'); }
      var a=el('official'); if(a) a.style.display='none';
      var cr=el('credit'); if(cr) cr.style.display='none';
    }
    doc.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
    return { open:open, close:close, setRate:setRate, failed:failed, current:function(){ return cur; } };
  }
  return { mount:mount };
})();
window.ClipModal=ClipModal;
