import { getState, setState } from '../store.js';
import { formatPercent, formatNumber, icons, generateId, simulateLiveValue } from '../utils.js';
import { createChart, disposeChart } from '../components/chart-helper.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

let charts = {};
let alertInterval = null;

export const title = '算力节点健康诊断';

export function render() {
  const healthData = getState('healthData') || [];
  const healthy = healthData.filter(h => h.healthStatus === 'healthy').length;
  const warning = healthData.filter(h => h.healthStatus === 'warning').length;
  const fault = healthData.filter(h => h.healthStatus === 'fault').length;
  const maintenance = healthData.filter(h => h.healthStatus === 'maintenance').length;

  return `
    <div class="module-page">
      <div class="module-title">
        <h2>算力节点健康诊断</h2>
      </div>

      <div class="stat-cards">
        <div class="stat-card">
          <div class="stat-card-label">健康节点</div>
          <div class="stat-card-value green">${healthy}</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">告警节点</div>
          <div class="stat-card-value yellow">${warning}</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">故障节点</div>
          <div class="stat-card-value red">${fault}</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">维护中</div>
          <div class="stat-card-value purple">${maintenance}</div>
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-container">
          <div class="chart-title">实时告警</div>
          <div class="alert-list" id="alert-list"></div>
        </div>
        <div class="chart-container">
          <div class="chart-title">节点健康状态网格</div>
          <div class="node-grid" id="health-grid"></div>
        </div>
      </div>

      <div class="card">
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>节点</th>
                <th>GPU温度</th>
                <th>CPU温度</th>
                <th>内存占用</th>
                <th>GPU显存</th>
                <th>错误数</th>
                <th>健康状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody id="health-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  renderAlerts();
  renderGrid();
  renderTable();
  bindEvents();
  startAlertSimulation();
}

export function destroy() {
  Object.keys(charts).forEach(id => disposeChart(id));
  charts = {};
  if (alertInterval) clearInterval(alertInterval);
  alertInterval = null;
}

function renderAlerts() {
  const alerts = getState('alerts') || [];
  const container = document.getElementById('alert-list');
  if (!container) return;

  const recent = alerts.slice(0, 8);
  container.innerHTML = recent.map(a => `
    <div class="alert-item" data-node="${a.nodeId}">
      <span class="alert-dot ${a.level}"></span>
      <span>${a.message}</span>
      <span class="alert-time">${a.time.split(' ')[1] || a.time}</span>
    </div>
  `).join('');

  if (recent.length === 0) {
    container.innerHTML = '<div class="text-muted text-center" style="padding:16px">暂无告警</div>';
  }
}

function renderGrid() {
  const healthData = getState('healthData') || [];
  const container = document.getElementById('health-grid');
  if (!container) return;

  container.innerHTML = healthData.map(h => `
    <div class="node-grid-cell ${h.healthStatus}" data-node="${h.nodeId}" title="${h.nodeId} - ${h.healthStatus === 'healthy' ? '健康' : h.healthStatus === 'warning' ? '告警' : h.healthStatus === 'fault' ? '故障' : '维护'}">
      ${h.nodeId.slice(-2)}
    </div>
  `).join('');
}

function renderTable() {
  const healthData = getState('healthData') || [];
  const nodes = getState('nodes') || [];
  const tbody = document.getElementById('health-tbody');
  if (!tbody) return;

  tbody.innerHTML = healthData.map(h => {
    const node = nodes.find(n => n.id === h.nodeId);
    const tempClass = h.gpuTemp > 85 ? 'danger' : (h.gpuTemp > 75 ? 'warning' : 'normal');
    const statusMap = { healthy: 'badge-healthy', warning: 'badge-warning', fault: 'badge-fault', maintenance: 'badge-maintenance' };
    const statusLabel = { healthy: '健康', warning: '告警', fault: '故障', maintenance: '维护中' };

    return `
      <tr>
        <td><strong>${node?.name || h.nodeId}</strong></td>
        <td><span class="temp-indicator ${tempClass}">${h.gpuTemp}°C</span></td>
        <td>${h.cpuTemp}°C</td>
        <td>${formatPercent(h.memoryUsage)}</td>
        <td>${formatPercent(h.gpuMemoryUsage)}</td>
        <td>${h.errorCount > 0 ? `<span style="color:var(--accent-red)">${h.errorCount}</span>` : '0'}</td>
        <td><span class="badge ${statusMap[h.healthStatus]}">${statusLabel[h.healthStatus]}</span></td>
        <td class="table-actions">
          <button class="btn btn-ghost btn-sm" data-action="detail" data-id="${h.nodeId}">${icons.eye}</button>
          <button class="btn btn-ghost btn-sm" data-action="diagnose" data-id="${h.nodeId}">${icons.refresh}</button>
          ${h.healthStatus !== 'fault' ? `<button class="btn btn-danger btn-sm" data-action="mark-fault" data-id="${h.nodeId}">标记故障</button>` : ''}
          ${h.healthStatus !== 'maintenance' ? `<button class="btn btn-warning btn-sm" data-action="mark-maint" data-id="${h.nodeId}">维护</button>` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

function bindEvents() {
  document.getElementById('alert-list')?.addEventListener('click', (e) => {
    const item = e.target.closest('.alert-item');
    if (item) showNodeDetail(item.dataset.node);
  });

  document.getElementById('health-grid')?.addEventListener('click', (e) => {
    const cell = e.target.closest('.node-grid-cell');
    if (cell) showNodeDetail(cell.dataset.node);
  });

  document.getElementById('health-tbody')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const nodeId = btn.dataset.id;
    if (action === 'detail') showNodeDetail(nodeId);
    if (action === 'diagnose') runDiagnose(nodeId);
    if (action === 'mark-fault') markAsFault(nodeId);
    if (action === 'mark-maint') markAsMaintenance(nodeId);
  });
}

async function showNodeDetail(nodeId) {
  const healthData = getState('healthData') || [];
  const nodes = getState('nodes') || [];
  const hd = healthData.find(h => h.nodeId === nodeId);
  const node = nodes.find(n => n.id === nodeId);
  if (!hd) return;

  // Generate 24h temp history
  const tempHistory = Array.from({ length: 24 }, (_, i) => Math.round(hd.gpuTemp - 10 + Math.random() * 15));
  const tempChartId = `temp-chart-${Date.now()}`;

  openModal({
    title: `节点诊断 - ${node?.name || nodeId}`,
    wide: true,
    content: `
      <div class="form-row">
        <div class="form-group"><div class="form-label">GPU温度</div><div><span class="temp-indicator ${hd.gpuTemp > 85 ? 'danger' : (hd.gpuTemp > 75 ? 'warning' : 'normal')}">${hd.gpuTemp}°C</span></div></div>
        <div class="form-group"><div class="form-label">CPU温度</div><div>${hd.cpuTemp}°C</div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><div class="form-label">CPU负载</div><div>${formatPercent(hd.cpuLoad)}</div></div>
        <div class="form-group"><div class="form-label">内存占用</div><div>${formatPercent(hd.memoryUsage)}</div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><div class="form-label">GPU显存</div><div>${formatPercent(hd.gpuMemoryUsage)}</div></div>
        <div class="form-group"><div class="form-label">磁盘占用</div><div>${formatPercent(hd.diskUsage)}</div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><div class="form-label">功耗</div><div>${hd.powerConsumption}</div></div>
        <div class="form-group"><div class="form-label">网络延迟</div><div>${hd.networkLatency}</div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><div class="form-label">错误计数</div><div>${hd.errorCount}</div></div>
        <div class="form-group"><div class="form-label">健康状态</div><div>${hd.healthStatus}</div></div>
      </div>
      <div style="margin-top:var(--space-md)">
        <div class="form-label">24小时GPU温度趋势</div>
        <div id="${tempChartId}" style="height:200px;width:100%"></div>
      </div>
      ${hd.healthStatus === 'fault' ? `
        <div style="margin-top:var(--space-md)">
          <button class="btn btn-primary" id="btn-create-ticket">联动运维系统 - 创建工单</button>
        </div>
      ` : ''}
    `,
    footer: false,
  });

  // Init temp chart after modal renders
  setTimeout(async () => {
    const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
    await createChart(tempChartId, {
      xAxis: { type: 'category', data: hours },
      yAxis: { type: 'value', name: '°C', nameTextStyle: { color: '#9ca3af' } },
      series: [{
        type: 'line',
        data: tempHistory,
        smooth: true,
        lineStyle: { color: hd.gpuTemp > 85 ? '#ef4444' : '#f59e0b' },
        areaStyle: { color: hd.gpuTemp > 85 ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)' },
        itemStyle: { color: hd.gpuTemp > 85 ? '#ef4444' : '#f59e0b' },
        markLine: { data: [{ yAxis: 85, name: '告警线', lineStyle: { color: '#ef4444', type: 'dashed' } }] },
      }],
      grid: { top: 20, right: 20, bottom: 30, left: 50 },
    });

    // Create ticket button
    document.getElementById('btn-create-ticket')?.addEventListener('click', () => {
      openModal({
        title: '创建运维工单',
        content: `
          <div class="form-group">
            <label class="form-label">工单标题</label>
            <input type="text" class="form-input" value="[故障] ${node?.name || nodeId} - GPU温度异常">
          </div>
          <div class="form-group">
            <label class="form-label">问题描述</label>
            <textarea class="form-input" rows="3" style="resize:vertical">节点 ${node?.name || nodeId} GPU温度异常 ${hd.gpuTemp}°C，错误计数 ${hd.errorCount}，请及时处理。</textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">优先级</label>
              <select class="form-select">
                <option>紧急</option>
                <option>高</option>
                <option>中</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">处理人</label>
              <select class="form-select">
                <option>运维组-张工</option>
                <option>运维组-李工</option>
                <option>运维组-王工</option>
              </select>
            </div>
          </div>
        `,
        onConfirm: () => {
          showToast('运维工单已创建', 'success');
          return true;
        },
      });
    });
  }, 100);
}

function runDiagnose(nodeId) {
  showToast('正在运行诊断...', 'info');
  setTimeout(() => {
    const healthData = getState('healthData') || [];
    const hd = healthData.find(h => h.nodeId === nodeId);
    if (hd) {
      hd.gpuTemp = Math.round(40 + Math.random() * 30);
      hd.cpuTemp = Math.round(35 + Math.random() * 25);
      hd.cpuLoad = Math.round(Math.random() * 80) / 100;
      hd.memoryUsage = Math.round(0.2 + Math.random() * 0.5) / 1;
      hd.errorCount = Math.random() > 0.8 ? 1 : 0;
      hd.healthStatus = hd.errorCount > 0 ? 'warning' : 'healthy';
      setState('healthData', healthData);
    }
    showToast('诊断完成', 'success');
    renderTable();
    renderGrid();
  }, 2000);
}

function markAsFault(nodeId) {
  openModal({
    title: '确认标记为故障',
    content: '<p>标记为故障后，该节点将暂停接收新任务。确定继续吗？</p>',
    onConfirm: () => {
      const nodes = getState('nodes') || [];
      const healthData = getState('healthData') || [];
      const node = nodes.find(n => n.id === nodeId);
      const hd = healthData.find(h => h.nodeId === nodeId);
      if (node) node.status = 'fault';
      if (hd) hd.healthStatus = 'fault';
      setState('nodes', nodes);
      setState('healthData', healthData);
      showToast('节点已标记为故障，已暂停分配任务', 'warning');
      renderTable();
      renderGrid();
      return true;
    },
  });
}

function markAsMaintenance(nodeId) {
  openModal({
    title: '确认标记为维护',
    content: '<p>标记为维护中后，该节点将暂时离线。确定继续吗？</p>',
    onConfirm: () => {
      const nodes = getState('nodes') || [];
      const healthData = getState('healthData') || [];
      const node = nodes.find(n => n.id === nodeId);
      const hd = healthData.find(h => h.nodeId === nodeId);
      if (node) node.status = 'maintenance';
      if (hd) hd.healthStatus = 'maintenance';
      setState('nodes', nodes);
      setState('healthData', healthData);
      showToast('节点已标记为维护中', 'info');
      renderTable();
      renderGrid();
      return true;
    },
  });
}

function startAlertSimulation() {
  alertInterval = setInterval(() => {
    const alerts = getState('alerts') || [];
    const healthData = getState('healthData') || [];
    const warningNodes = healthData.filter(h => h.healthStatus === 'warning' || h.healthStatus === 'fault');
    if (warningNodes.length > 0 && Math.random() > 0.5) {
      const node = warningNodes[Math.floor(Math.random() * warningNodes.length)];
      const messages = [
        `GPU温度异常 ${70 + Math.floor(Math.random() * 25)}°C`,
        `CPU负载持续偏高 ${(80 + Math.floor(Math.random() * 18))}%`,
        `内存占用过高 ${(85 + Math.floor(Math.random() * 13))}%`,
        `GPU显存溢出风险`,
      ];
      const levels = ['critical', 'warning', 'info'];
      const now = new Date();
      alerts.unshift({
        nodeId: node.nodeId,
        level: levels[Math.floor(Math.random() * levels.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        time: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      });
      if (alerts.length > 30) alerts.length = 30;
      setState('alerts', alerts);
      renderAlerts();
    }
  }, 15000);
}

export default { title, render, init, destroy };
