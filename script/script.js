
// Theme toggle + persistence
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function setTheme(theme){
  if(theme === 'light'){
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    themeIcon.className = 'fa-solid fa-sun';
    localStorage.setItem('theme','light');
  } else {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    themeIcon.className = 'fa-solid fa-moon';
    localStorage.setItem('theme','dark');
  }
}

// initialize
const saved = localStorage.getItem('theme') || 'dark';
setTheme(saved);

themeToggle.addEventListener('click', ()=>{
  const next = body.classList.contains('light-theme') ? 'dark' : 'light';
  setTheme(next);
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.querySelector('.nav');
navToggle.addEventListener('click', ()=>{
  const open = nav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 300) backToTop.classList.add('show'); else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

// Improve project card equal heights on load/resize
function normalizeProjectHeights(){
  const cards = Array.from(document.querySelectorAll('.project-card'));
  let max = 0;
  cards.forEach(c => { c.style.minHeight = '0'; const h = c.getBoundingClientRect().height; if(h > max) max = h; });
  cards.forEach(c => c.style.minHeight = max + 'px');
}
window.addEventListener('load', normalizeProjectHeights);
window.addEventListener('resize', ()=>{ setTimeout(normalizeProjectHeights,120); });

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// Small accessibility enhancement: add focus-visible on keyboard users
(function(){
  function handleFirstTab(e){
    if(e.key === 'Tab'){
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
})();
