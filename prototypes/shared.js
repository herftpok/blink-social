const Proto = window.Proto = {
  show(phone,id){ phone.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active', s.dataset.screen===id)); }
};
window.blinkAv = function(n){ return 'assets/faces/av'+n+'.jpg'; };
document.addEventListener('click', e=>{
  const g=e.target.closest('[data-goto]'); if(g){ const p=g.closest('.phone'); if(p) Proto.show(p,g.dataset.goto); return; }
  const sb=e.target.closest('[data-sheet]'); if(sb){ const p=sb.closest('.phone'); const sh=p&&p.querySelector('[data-sheet-id="'+sb.dataset.sheet+'"]');
    if(sh){ const open=!sh.classList.contains('open'); sh.classList.toggle('open',open); const bd=p.querySelector('.backdrop'); if(bd) bd.classList.toggle('show',open);} return; }
  const sc=e.target.closest('[data-sheet-close]'); if(sc){ const p=sc.closest('.phone'); p.querySelectorAll('.sheet.open').forEach(s=>s.classList.remove('open')); const bd=p.querySelector('.backdrop'); if(bd) bd.classList.remove('show'); return; }
  const bd=e.target.closest('.backdrop'); if(bd){ const p=bd.closest('.phone'); p.querySelectorAll('.sheet.open').forEach(s=>s.classList.remove('open')); bd.classList.remove('show'); return; }
  const tg=e.target.closest('[data-toggle]'); if(tg){ const p=tg.closest('.phone'); const t=p&&p.querySelector(tg.dataset.toggle); if(t) t.classList.toggle(tg.dataset.cls||'on'); return; }
  const sd=e.target.closest('[data-send]'); if(sd){ Proto.send(sd); return; }
});
Proto.send=function(btn){ const comp=btn.closest('.composer'); const input=comp.querySelector('[data-input]'); const sc=btn.closest('.screen'); const msgs=sc.querySelector('.msgs'); if(!input||!msgs) return;
  const v=(input.value||'').trim(); if(!v) return; const row=document.createElement('div'); row.className='row me msg-enter'; const b=document.createElement('div'); b.className='bubble me'; b.textContent=v; row.appendChild(b); msgs.appendChild(row); input.value=''; msgs.scrollTop=msgs.scrollHeight; };
document.addEventListener('keydown', e=>{ if(e.key==='Enter'){ const inp=e.target.closest('.composer [data-input]'); if(inp){ e.preventDefault(); const b=inp.closest('.composer').querySelector('[data-send]'); if(b) Proto.send(b);} }});

/* standalone на мобиле: прототип на весь экран, без рамок мокапа */
(function(){
  if(window.self!==window.top) return; // внутри дека остаёмся в мокапе
  function fit(){
    var mob=window.innerWidth<=640;
    document.body.classList.toggle('m-full', mob);
    document.querySelectorAll('.phonewrap').forEach(function(w){
      var ph=w.querySelector('.phone'); if(!ph) return;
      if(mob){
        var s=Math.min(window.innerWidth/390, window.innerHeight/844);
        ph.style.transform='scale('+s+')';
        w.style.width=(390*s)+'px'; w.style.height=(844*s)+'px';
      } else {
        ph.style.transform=''; w.style.width=''; w.style.height='';
      }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', fit); else fit();
  window.addEventListener('resize', fit);
})();
