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
