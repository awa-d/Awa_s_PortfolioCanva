
// ============== Global (Shared) JS ==============
// Active link highlighting
(function(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('.nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if((path === '' && href.endsWith('index.html')) || href.endsWith(path)){
      a.classList.add('active');
    }
  });
})();

// Mobile nav toggle (very lightweight)
(function() {
  // On récupère le bouton (☰) et le menu de navigation
  const btn = document.querySelector('#navToggle');
  const menu = document.querySelector('#navMenu');

  // Si l'un des deux n'existe pas, on stoppe le script
  if (!btn || !menu) return;

  // Ajoute un événement au clic sur le bouton
  btn.addEventListener('click', () => {
    // Bascule la classe "open" sur le menu
    menu.classList.toggle('open');
  });
})();


// Scroll-to-top button
(function(){
  const btn = document.getElementById('backToTop');
  if(!btn) return;
  window.addEventListener('scroll',()=>{
    if(window.scrollY>500) btn.classList.add('show'); else btn.classList.remove('show');
  });
  btn.addEventListener('click',()=> window.scrollTo({top:0, behavior:'smooth'}));
})();

// Shared lightbox open helper (images, PDFs, videos)
export function openLightbox(html){
  let lb = document.querySelector('.lightbox');
  if(!lb){
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `<div class="lightbox__content card"><button class="lightbox__close" aria-label="Close">✕</button><div class="p-4"></div></div>`;
    document.body.appendChild(lb);
    lb.addEventListener('click', (e)=>{
      if(e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox__close')){
        lb.classList.remove('open');
        lb.querySelector('.p-4').innerHTML='';
      }
    });
  }
  lb.querySelector('.p-4').innerHTML = html;
  lb.classList.add('open');
}

// Utility: delegate event
export function on(el, evt, sel, handler){
  el.addEventListener(evt, e=>{
    if(e.target.closest(sel)) handler(e);
  });
}

document.getElementById('mailLink').addEventListener('click', function(e){
  // If default was prevented by something else, force it:
  if(e.defaultPrevented){
    window.location.href = this.href;
  }
});
