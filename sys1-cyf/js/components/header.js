import { icons } from '../utils.js';

export function renderHeader() {
  const header = document.getElementById('header');
  header.innerHTML = `
    <div class="header-left">
      <span class="breadcrumb-sep">首页</span>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-current">节点全景管理</span>
    </div>
    <div class="header-right">
      <div class="header-notification" title="通知">
        ${icons.bell}
        <span class="badge">3</span>
      </div>
      <div class="header-user">
        <div class="header-avatar">管</div>
        <span class="header-username">管理员</span>
      </div>
    </div>
  `;
}
