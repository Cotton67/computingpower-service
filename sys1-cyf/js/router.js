let currentModule = null;

const routes = {};

export function registerRoute(path, module) {
  routes[path] = module;
}

export function navigate(path) {
  window.location.hash = path;
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || '/panorama';
  const path = hash.startsWith('/') ? hash : '/' + hash;

  const mod = routes[path];
  if (!mod) {
    if (routes['/panorama']) {
      window.location.hash = '/panorama';
    }
    return;
  }

  if (currentModule && currentModule.destroy) {
    currentModule.destroy();
  }

  currentModule = mod;

  const content = document.getElementById('main-content');
  content.innerHTML = mod.render();

  // 双重 rAF 确保布局完成后再初始化图表
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (mod.init) mod.init();
    });
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    const itemPath = item.dataset.route;
    item.classList.toggle('active', itemPath === path);
  });

  const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
  if (breadcrumbCurrent && mod.title) {
    breadcrumbCurrent.textContent = mod.title;
  }
}

export function startRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
