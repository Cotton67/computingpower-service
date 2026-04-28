import { icons } from '../utils.js';

const navItems = [
  { group: '资源管理', items: [
    { path: '/panorama', icon: icons.server, label: '节点全景管理' },
    { path: '/allocation', icon: icons.allocation, label: '客户算力分配' },
    { path: '/reservation', icon: icons.reservation, label: '算力预留管理' },
  ]},
  { group: '调度运维', items: [
    { path: '/scheduling', icon: icons.scheduling, label: '任务调度管理' },
    { path: '/elastic', icon: icons.elastic, label: '弹性扩缩容' },
    { path: '/load-balance', icon: icons.balance, label: '负载均衡' },
    { path: '/health', icon: icons.health, label: '健康诊断' },
  ]},
  { group: '数据分析', items: [
    { path: '/statistics', icon: icons.statistics, label: '统计分析' },
  ]},
];

export function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      </div>
      <span class="sidebar-title">算力调度管理</span>
    </div>
    <nav class="sidebar-nav">
      ${navItems.map(group => `
        <div class="nav-group-label">${group.group}</div>
        ${group.items.map(item => `
          <div class="nav-item" data-route="${item.path}">
            ${item.icon}
            <span>${item.label}</span>
          </div>
        `).join('')}
      `).join('')}
    </nav>
  `;

  sidebar.addEventListener('click', (e) => {
    const navItem = e.target.closest('.nav-item');
    if (navItem) {
      const route = navItem.dataset.route;
      window.location.hash = route;
    }
  });
}
