import { getState, setState, subscribe } from '../store.js';
import { formatPercent, formatNumber, getStatusBadge, getStatusLabel, icons, getUtilizationClass } from '../utils.js';
import { createChart, disposeChart, getColors } from '../components/chart-helper.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

let charts = {};
let liveInterval = null;

export const title = '算力节点全景管理';

export function render() {
  const nodes = getState('nodes') || [];
  const customers = getState('customers') || [];
  const total = nodes.length;
  const online = nodes.filter(n => n.status === 'online').length;
  const offline = nodes.filter(n => n.status === 'offline').length;
  const maintenance = nodes.filter(n => n.status === 'maintenance').length;
  const fault = nodes.filter(n => n.status === 'fault').length;

  const datacenters = [...new Set(nodes.map(n => n.datacenter))];
  const racks = [...new Set(nodes.map(n => n.rack))];
  const models = [...new Set(nodes.map(n => n.model))];

  return `
    <div class="module-page">
      <div class="module-title">
        <h2>算力节点全景管理</h2>
      </div>

      <div class="filter-bar">
        <select class="form-select" id="filter-dc">
          <option value="">全部机房</option>
          ${datacenters.map(dc => `<option value="${dc}">${dc}</option>`).join('')}
        </select>
        <select class="form-select" id="filter-rack">
          <option value="">全部机柜</option>
          ${racks.map(r => `<option value="${r}">${r}</option>`).join('')}
        </select>
        <select class="form-select" id="filter-model">
          <option value="">全部型号</option>
          ${models.map(m => `<option value="${m}">${m}</option>`).join('')}
        </select>
        <select class="form-select" id="filter-status">
          <option value="">全部状态</option>
          <option value="online">在线</option>
          <option value="offline">离线</option>
          <option value="maintenance">维护中</option>
          <option value="fault">故障</option>
        </select>
      </div>

      <div class="stat-cards">
        <div class="stat-card" data-filter="all">
          <div class="stat-card-label">总节点数</div>
          <div class="stat-card-value blue">${total}</div>
        </div>
        <div class="stat-card" data-filter="online">
          <div class="stat-card-label">在线</div>
          <div class="stat-card-value green">${online}</div>
        </div>
        <div class="stat-card" data-filter="offline">
          <div class="stat-card-label">离线</div>
          <div class="stat-card-value yellow">${offline}</div>
        </div>
        <div class="stat-card" data-filter="fault">
          <div class="stat-card-label">故障</div>
          <div class="stat-card-value red">${fault}</div>
        </div>
        <div class="stat-card" data-filter="maintenance">
          <div class="stat-card-label">维护中</div>
          <div class="stat-card-value purple">${maintenance}</div>
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-container">
          <div class="chart-title">集群GPU利用率</div>
          <div id="gauge-chart" style="height:260px;width:100%"></div>
        </div>
        <div class="chart-container">
          <div class="chart-title">24小时利用率趋势</div>
          <div id="trend-chart" style="height:260px;width:100%"></div>
        </div>
      </div>

      <div class="card">
        <div style="overflow-x:auto">
          <table id="node-table">
            <thead>
              <tr>
                <th data-sort="name">节点名称</th>
                <th data-sort="datacenter">机房</th>
                <th data-sort="rack">机柜</th>
                <th data-sort="model">GPU型号</th>
                <th data-sort="gpuCount">GPU数</th>
                <th data-sort="gpuUtilization">GPU利用率</th>
                <th data-sort="cpuUtilization">CPU利用率</th>
                <th data-sort="memoryUtilization">内存利用率</th>
                <th data-sort="status">状态</th>
                <th>分配客户</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody id="node-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  renderTable();
  await initCharts();
  bindFilters();
  startLiveUpdates();
}

export function destroy() {
  Object.keys(charts).forEach(id => disposeChart(id));
  charts = {};
  if (liveInterval) clearInterval(liveInterval);
  liveInterval = null;
}

function getFilteredNodes() {
  const nodes = getState('nodes') || [];
  const dc = document.getElementById('filter-dc')?.value;
  const rack = document.getElementById('filter-rack')?.value;
  const model = document.getElementById('filter-model')?.value;
  const status = document.getElementById('filter-status')?.value;

  return nodes.filter(n => {
    if (dc && n.datacenter !== dc) return false;
    if (rack && n.rack !== rack) return false;
    if (model && n.model !== model) return false;
    if (status && n.status !== status) return false;
    return true;
  });
}

function renderTable() {
  const customers = getState('customers') || [];
  const nodes = getFilteredNodes();
  const tbody = document.getElementById('node-tbody');
  if (!tbody) return;

  tbody.innerHTML = nodes.map(n => {
    const customer = customers.find(c => c.id === n.allocatedTo);
    const isIdle = n.status === 'online' && n.gpuUtilization < 0.2;
    const isOverloaded = n.gpuUtilization > 0.9;

    return `
      <tr class="${isIdle ? 'node-highlight-idle' : ''} ${isOverloaded ? 'node-highlight-overloaded' : ''}">
        <td><strong>${n.name}</strong></td>
        <td>${n.datacenter}</td>
        <td>${n.rack}</td>
        <td>${n.model}</td>
        <td>${n.gpuCount}</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <div class="progress-bar" style="width:80px">
              <div class="progress-bar-fill ${getUtilizationClass(n.gpuUtilization)}" style="width:${n.gpuUtilization * 100}%"></div>
            </div>
            <span>${formatPercent(n.gpuUtilization)}</span>
          </div>
        </td>
        <td>${formatPercent(n.cpuUtilization)}</td>
        <td>${formatPercent(n.memoryUtilization)}</td>
        <td><span class="badge ${getStatusBadge(n.status)}">${getStatusLabel(n.status)}</span></td>
        <td>${customer ? customer.name : '<span class="text-muted">未分配</span>'}</td>
        <td class="table-actions">
          <button class="btn btn-ghost btn-sm" data-action="detail" data-id="${n.id}">${icons.eye}</button>
          <button class="btn btn-ghost btn-sm" data-action="allocate" data-id="${n.id}" ${n.allocatedTo ? 'disabled' : ''}>分配</button>
        </td>
      </tr>
    `;
  }).join('');
}

async function initCharts() {
  const nodes = getState('nodes') || [];
  const onlineNodes = nodes.filter(n => n.status === 'online');
  const avgUtil = onlineNodes.length > 0
    ? onlineNodes.reduce((s, n) => s + n.gpuUtilization, 0) / onlineNodes.length
    : 0;

  // Gauge chart
  charts.gauge = await createChart('gauge-chart', {
    series: [{
      type: 'gauge',
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 100,
      detail: { formatter: '{value}%', fontSize: 24, color: '#303133', offsetCenter: [0, '60%'] },
      data: [{ value: Math.round(avgUtil * 100), name: 'GPU利用率' }],
      axisLine: {
        lineStyle: {
          width: 16,
          color: [[0.4, '#f56c6c'], [0.7, '#e6a23c'], [1, '#67c23a']],
        },
      },
      axisTick: { show: false },
      splitLine: { length: 10, lineStyle: { width: 2, color: '#999' } },
      axisLabel: { distance: 20, color: '#909399', fontSize: 10 },
      pointer: { width: 5 },
      title: { show: true, offsetCenter: [0, '80%'], color: '#909399', fontSize: 12 },
    }],
  });

  // Trend chart
  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
  const trendData = hours.map(() => Math.round((avgUtil * 0.8 + Math.random() * 0.2) * 100));

  charts.trend = await createChart('trend-chart', {
    xAxis: { type: 'category', data: hours },
    yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
    series: [{
      type: 'line',
      data: trendData,
      smooth: true,
      areaStyle: { color: 'rgba(64,158,255,0.15)' },
      lineStyle: { color: '#409eff', width: 2 },
      itemStyle: { color: '#409eff' },
    }],
    grid: { top: 20, right: 20, bottom: 30, left: 50 },
  });
}

function bindFilters() {
  const filters = ['filter-dc', 'filter-rack', 'filter-model', 'filter-status'];
  filters.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', renderTable);
  });

  // Stat cards click to filter
  document.querySelectorAll('.stat-card[data-filter]').forEach(card => {
    card.addEventListener('click', () => {
      const filter = card.dataset.filter;
      const statusEl = document.getElementById('filter-status');
      if (filter === 'all') {
        if (statusEl) statusEl.value = '';
      } else {
        if (statusEl) statusEl.value = filter;
      }
      renderTable();
    });
  });

  // Table actions
  document.getElementById('node-tbody')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const nodeId = btn.dataset.id;
    if (action === 'detail') showNodeDetail(nodeId);
    if (action === 'allocate') {
      window.location.hash = '/allocation';
    }
  });
}

function showNodeDetail(nodeId) {
  const nodes = getState('nodes') || [];
  const customers = getState('customers') || [];
  const node = nodes.find(n => n.id === nodeId);
  if (!node) return;

  const customer = customers.find(c => c.id === node.allocatedTo);

  openModal({
    title: `节点详情 - ${node.name}`,
    wide: true,
    content: `
      <div class="form-row">
        <div class="form-group">
          <div class="form-label">节点ID</div>
          <div>${node.id}</div>
        </div>
        <div class="form-group">
          <div class="form-label">节点名称</div>
          <div>${node.name}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <div class="form-label">数据中心</div>
          <div>${node.datacenter}</div>
        </div>
        <div class="form-group">
          <div class="form-label">机柜</div>
          <div>${node.rack}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <div class="form-label">GPU型号</div>
          <div>${node.model}</div>
        </div>
        <div class="form-group">
          <div class="form-label">GPU数量</div>
          <div>${node.gpuCount}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <div class="form-label">总算力</div>
          <div>${node.totalTFLOPS} TFLOPS</div>
        </div>
        <div class="form-group">
          <div class="form-label">CPU核心</div>
          <div>${node.cpuCores}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <div class="form-label">内存</div>
          <div>${node.memory}</div>
        </div>
        <div class="form-group">
          <div class="form-label">存储</div>
          <div>${node.storage}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <div class="form-label">状态</div>
          <div><span class="badge ${getStatusBadge(node.status)}">${getStatusLabel(node.status)}</span></div>
        </div>
        <div class="form-group">
          <div class="form-label">分配客户</div>
          <div>${customer ? customer.name : '<span class="text-muted">未分配</span>'}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <div class="form-label">GPU利用率</div>
          <div>
            <div class="progress-bar" style="width:200px">
              <div class="progress-bar-fill ${getUtilizationClass(node.gpuUtilization)}" style="width:${node.gpuUtilization * 100}%"></div>
            </div>
            <span class="text-sm">${formatPercent(node.gpuUtilization)}</span>
          </div>
        </div>
        <div class="form-group">
          <div class="form-label">CPU利用率</div>
          <div>${formatPercent(node.cpuUtilization)}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <div class="form-label">运行任务</div>
          <div>${node.tasks.length > 0 ? node.tasks.join(', ') : '无'}</div>
        </div>
        <div class="form-group">
          <div class="form-label">内存利用率</div>
          <div>${formatPercent(node.memoryUtilization)}</div>
        </div>
      </div>
    `,
    footer: false,
  });
}

function startLiveUpdates() {
  liveInterval = setInterval(() => {
    const nodes = getState('nodes') || [];
    nodes.forEach(n => {
      if (n.status === 'online') {
        n.gpuUtilization = Math.min(1, Math.max(0, n.gpuUtilization + (Math.random() - 0.5) * 0.04));
        n.cpuUtilization = Math.min(1, Math.max(0, n.cpuUtilization + (Math.random() - 0.5) * 0.03));
        n.memoryUtilization = Math.min(1, Math.max(0, n.memoryUtilization + (Math.random() - 0.5) * 0.02));
      }
    });
    setState('nodes', nodes);
    renderTable();
  }, 10000);
}

export default { title, render, init, destroy };
