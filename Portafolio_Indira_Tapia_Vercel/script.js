'use strict';

const projects = {
  ecolim: {
    type: 'PROYECTO ACADÉMICO · INCLUIDO EN MI CV',
    title: 'EcolimApp',
    intro: 'Aplicación Android orientada al registro de tipos de residuos y cantidades en kilogramos.',
    what: 'La propuesta académica busca facilitar el registro organizado de residuos, distinguiendo categorías y cantidades para visualizar mejor la información recogida.',
    learning: 'Es una oportunidad para practicar cómo llevar una necesidad cotidiana a una aplicación móvil y organizar información con una interfaz comprensible.',
    tags: ['Android', 'Registro de residuos', 'Aplicación móvil'],
    note: 'Este proyecto figura en mi CV. Las imágenes mostradas en el portafolio son mockups ilustrativos y no capturas de la aplicación.'
  },
  chat: {
    type: 'EJERCICIO ACADÉMICO · INCLUIDO EN MI CV',
    title: 'Chat en tiempo real',
    intro: 'Ejercicio académico de comunicación en línea realizado con Node.js y Socket.IO.',
    what: 'Una práctica enfocada en el intercambio de mensajes entre participantes en tiempo real, para conocer mejor la comunicación entre cliente y servidor.',
    learning: 'Me ayudó a familiarizarme con herramientas de JavaScript del lado del servidor y con una tecnología de eventos como Socket.IO.',
    tags: ['Node.js', 'Socket.IO', 'Comunicación en tiempo real'],
    note: 'El ejercicio está mencionado en mi CV. La interfaz mostrada es una ilustración, no una captura real ni un enlace a una demo.'
  },
  semana: {
    type: 'IDEA CONCEPTUAL · TODAVÍA NO DESARROLLADA',
    title: 'Mi Semana — Organizador',
    intro: 'Propuesta de aplicación simple para organizar entregas, tareas y hábitos de estudio.',
    what: 'Me gustaría diseñar una interfaz para registrar tareas, asignarles fechas, marcarlas como terminadas y ver el avance de cada semana.',
    learning: 'La utilizaría para practicar diseño de interfaces, formularios, persistencia de información y organización de funciones pequeñas.',
    tags: ['Concepto', 'Diseño de interfaz', 'Organización'],
    note: 'Es una idea creada para mostrar intereses de aprendizaje, no un proyecto finalizado. El mockup es ilustrativo.'
  },
  studymate: {
    type: 'IDEA CONCEPTUAL · TODAVÍA NO DESARROLLADA',
    title: 'StudyMate — Asistente de estudio',
    intro: 'Idea para explorar la inteligencia artificial como apoyo al aprendizaje.',
    what: 'Imagino una herramienta que permita ordenar apuntes, crear preguntas de repaso y presentar explicaciones breves, siempre verificando la información.',
    learning: 'Quisiera conocer de manera progresiva cómo se integran herramientas de IA a una aplicación y qué cuidados son necesarios al presentar resultados.',
    tags: ['Concepto', 'IA aplicada', 'Educación'],
    note: 'Este concepto no implica que ya haya desarrollado o integrado un modelo de IA. Es una propuesta para futuras prácticas.'
  }
};

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const projectCount = document.getElementById('project-count');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visible = 0;
    filterButtons.forEach(b => { b.classList.toggle('is-active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    projectCards.forEach(card => {
      const matches = filter === 'todos' || card.dataset.category === filter;
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    projectCount.textContent = `Mostrando ${visible} ${visible === 1 ? 'proyecto' : 'proyectos'}`;
  });
});

const modal = document.getElementById('project-modal');
const modalPanel = modal.querySelector('.modal-panel');
const closeModalButton = document.getElementById('modal-close');
let previousFocus = null;
function openProject(key) {
  const project = projects[key];
  if (!project) return;
  previousFocus = document.activeElement;
  document.getElementById('modal-overline').textContent = project.type;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-intro').textContent = project.intro;
  document.getElementById('modal-what').textContent = project.what;
  document.getElementById('modal-learning').textContent = project.learning;
  document.getElementById('modal-note').textContent = project.note;
  document.getElementById('modal-tags').replaceChildren(...project.tags.map(tag => {
    const span = document.createElement('span');
    span.textContent = tag;
    return span;
  }));
  modal.hidden = false;
  document.body.classList.add('modal-open');
  closeModalButton.focus();
}
function closeProject() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  previousFocus?.focus();
}
document.querySelectorAll('[data-project]').forEach(btn => btn.addEventListener('click', () => openProject(btn.dataset.project)));
closeModalButton.addEventListener('click', closeProject);
modal.querySelector('.modal-backdrop').addEventListener('click', closeProject);
document.addEventListener('keydown', event => {
  if (modal.hidden) return;
  if (event.key === 'Escape') closeProject();
  if (event.key === 'Tab') {
    const focusables = [closeModalButton];
    const index = focusables.indexOf(document.activeElement);
    if (event.shiftKey && index === 0) { event.preventDefault(); focusables[focusables.length - 1].focus(); }
    else if (!event.shiftKey && index === focusables.length - 1) { event.preventDefault(); focusables[0].focus(); }
  }
});

const menuButton = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu() { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Abrir menú'); }
menuButton.addEventListener('click', () => {
  const shouldOpen = mobileNav.hidden;
  mobileNav.hidden = !shouldOpen;
  menuButton.setAttribute('aria-expanded', String(shouldOpen));
  menuButton.setAttribute('aria-label', shouldOpen ? 'Cerrar menú' : 'Abrir menú');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });

const themeButton = document.getElementById('theme-toggle');
const storedTheme = (() => { try { return localStorage.getItem('indira-theme'); } catch { return null; } })();
if (storedTheme === 'light') document.documentElement.dataset.theme = 'light';
themeButton.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  if (nextTheme === 'dark') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = 'light';
  try { localStorage.setItem('indira-theme', nextTheme); } catch {}
});

const toast = document.getElementById('toast');
let toastTimeout;
function showToast(message) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2600);
}
document.getElementById('copy-email').addEventListener('click', async () => {
  const email = document.getElementById('copy-email').dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    showToast('Correo copiado al portapapeles ✓');
  } catch {
    const helper = document.createElement('textarea'); helper.value = email; helper.style.position = 'fixed'; helper.style.opacity = '0';
    document.body.appendChild(helper); helper.select();
    const copied = document.execCommand('copy'); helper.remove();
    showToast(copied ? 'Correo copiado al portapapeles ✓' : `Correo: ${email}`);
  }
});

document.getElementById('year').textContent = String(new Date().getFullYear());
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
} else { document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible')); }
