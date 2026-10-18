/* BATTERY control library - behaviour (rewrite Step 5: lift the pure controls into lib/ui.js).  Spec: docs/ARCH-DA-capacitor-structure-2026-10-13.md sec 3 + 5 + 7.

   UIDrawer: the bottom-sheet section picker (v240). Moved here VERBATIM from index.html - same code, same globals (a classic script, so `var UIDrawer` is still
   window.UIDrawer), no behaviour change. It is PURE RENDER FROM DATA: it touches only the DOM (#ui-drawer, .ud-*), document, window and history, and knows nothing about
   ARM, FUEL or the host. The host keeps the ARM adapter (armLiveTabs / armDrawerData / openSectionDrawer) because that is where the host knowledge lives.
   Its styles live in lib/ui.css. Loaded by the documents that use a control from this file (today: the host only). Parse time defines two names and touches no DOM.

   NOT lifted (found while scoping Step 5): the clip card. buildClipCard reaches ARM's credit tables (sourceFor / officialFor), ARM's storeGet / storeSet and
   parent.location.href (cross-frame row 16), so it is not pure; lifting it needs dependency injection, not a move. See the Step 5 note to Q. */
var UIDrawer=(function(){
  var el=null,sheet=null,opened=false,opener=null,viaPop=false,cfg=null,startY=0;
  function esc(t){ return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function tileHtml(src){ return '<span class="ud-tile" aria-hidden="true">'+(src?'<img alt="" decoding="async" src="'+src+'">':'')+'</span>'; }
  function render(){
    if(!sheet||!cfg)return;
    var h='<button type="button" class="ud-grab" aria-label="Expand or collapse the sections list"><i></i></button>'+
      '<div class="ud-head"><b id="ud-title">'+esc(cfg.title||'Sections')+'</b><button type="button" class="ud-x" aria-label="Close sections menu">✕</button></div><div class="ud-body">';
    (cfg.groups||[]).forEach(function(g){
      if(g.label)h+='<div class="ud-glabel">'+esc(g.label)+'</div>';
      (g.items||[]).forEach(function(it){
        h+='<button type="button" class="ud-row" data-id="'+esc(it.id)+'"'+(it.id===cfg.current?' aria-current="true"':'')+' aria-label="'+esc(it.label)+(it.id===cfg.current?', current section':'')+'">'+
          tileHtml(it.img)+'<span class="ud-lb">'+esc(it.label)+'</span>'+(it.id===cfg.current?'<span class="ud-ck" aria-hidden="true">✓</span>':'')+'</button>';
      });
    });
    h+='</div>';
    if(cfg.areas&&cfg.areas.length){
      h+='<div class="ud-area"><div class="ud-glabel">Switch area</div><div class="ud-aw">';
      cfg.areas.forEach(function(a){ h+='<button type="button" data-area="'+esc(a.id)+'"'+(a.current?' aria-current="true"':'')+' aria-label="'+esc(a.label)+(a.current?', current area':'')+'">'+tileHtml(a.img)+'<span>'+esc(a.label)+'</span></button>'; });
      h+='</div></div>';
    }
    sheet.innerHTML=h;
    sheet.querySelectorAll('.ud-row').forEach(function(b){ b.onclick=function(){ var id=b.getAttribute('data-id'); close(); try{ cfg.onSelect&&cfg.onSelect(id); }catch(e){} }; });
    sheet.querySelectorAll('.ud-area button').forEach(function(b){ b.onclick=function(){ var id=b.getAttribute('data-area'); close(); try{ cfg.onArea&&cfg.onArea(id); }catch(e){} }; });
    sheet.querySelector('.ud-x').onclick=function(){ close(); };
    sheet.querySelector('.ud-grab').onclick=function(){ sheet.classList.toggle('large'); };
  }
  function focusables(){ return [].slice.call(sheet.querySelectorAll('button')).filter(function(b){ return b.offsetParent!==null||b===document.activeElement; }); }
  function keydown(e){
    if(!opened)return;
    if(e.key==='Escape'){ e.preventDefault(); close(); return; }
    if(e.key!=='Tab')return;
    var f=focusables(); if(!f.length)return;
    var first=f[0], last=f[f.length-1], a=document.activeElement;
    if(e.shiftKey&&(a===first||!sheet.contains(a))){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey&&(a===last||!sheet.contains(a))){ e.preventDefault(); first.focus(); }
  }
  function touchStart(e){ if(e.touches&&e.touches[0])startY=e.touches[0].clientY; }
  function touchEnd(e){ var t=e.changedTouches&&e.changedTouches[0]; if(!t)return; var dy=t.clientY-startY; if(dy>70)close(); else if(dy<-50)sheet.classList.add('large'); }
  function mount(c){
    cfg=c; el=document.getElementById('ui-drawer'); if(!el)return;
    sheet=el.querySelector('.ud-sheet'); render();
    if(!el._wired){ el._wired=true;
      el.querySelector('.ud-scrim').addEventListener('click',function(){ close(); });
      document.addEventListener('keydown',keydown);
      sheet.addEventListener('touchstart',touchStart,{passive:true}); sheet.addEventListener('touchend',touchEnd,{passive:true});
      window.addEventListener('popstate',function(){ if(opened){ viaPop=true; close(); viaPop=false; } });
    }
  }
  function open(){
    if(!el||opened)return; opened=true; opener=document.activeElement;
    sheet.classList.remove('large'); el.classList.add('show');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.classList.add('on'); }); });
    try{ history.pushState({ud:1},''); }catch(e){}
    setTimeout(function(){ var cur=sheet.querySelector('.ud-row[aria-current="true"]')||sheet.querySelector('.ud-row'); if(cur){ cur.focus(); try{ cur.scrollIntoView({block:'nearest'}); }catch(e){} } },60);
  }
  function close(){
    if(!el||!opened)return; opened=false; el.classList.remove('on');
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(function(){ if(!opened)el.classList.remove('show'); },reduce?0:230);
    try{ if(!viaPop&&history.state&&history.state.ud)history.back(); }catch(e){}
    try{ if(opener&&opener.focus)opener.focus(); }catch(e){} opener=null;
  }
  function isOpen(){ return opened; }
  return { mount:mount, open:open, close:close, update:function(c){ if(c){ for(var k in c)cfg[k]=c[k]; } render(); }, isOpen:isOpen };
})();
window.UIDrawer=UIDrawer;

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
