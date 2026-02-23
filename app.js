function toggleMenu(){
  const menu = document.getElementById('menu');
  if (!menu) return;
  menu.classList.toggle('open');
}

function setupMobileSubmenu(){
  const serviciosLink = document.getElementById('serviciosLink');
  const submenuServicios = document.getElementById('submenuServicios');

  if (!serviciosLink || !submenuServicios) return;

  serviciosLink.addEventListener('click', function(e){
    if (window.innerWidth <= 900) {
      e.preventDefault();
      submenuServicios.classList.toggle('show');
    }
  });
}

function setupTabsActiveOnScroll(){
  const tabs = Array.from(document.querySelectorAll('.tab'));
  if (!tabs.length) return;

  const sections = tabs
    .map(t => document.querySelector(t.getAttribute('href')))
    .filter(Boolean);

  const setActive = () => {
    let current = sections[0];
    for (const s of sections) {
      const rect = s.getBoundingClientRect();
      if (rect.top <= 140) current = s; // margen por nav+tabs
    }
    tabs.forEach(t => t.classList.remove('active'));
    const active = tabs.find(t => t.getAttribute('href') === '#'+current.id);
    if (active) active.classList.add('active');
  };

  window.addEventListener('scroll', setActive, { passive:true });
  setActive();
}

function closeMenuOnOutsideClick(){
  const menu = document.getElementById('menu');
  if (!menu) return;

  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const clickedInsideNav = nav.contains(e.target);
    if (!clickedInsideNav && menu.classList.contains('open')) {
      menu.classList.remove('open');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileSubmenu();
  setupTabsActiveOnScroll();
  closeMenuOnOutsideClick();
});