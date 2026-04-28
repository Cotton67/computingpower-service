import { getState, setState } from '../store.js';
import { formatPercent, formatNumber, icons, generateId } from '../utils.js';
import { createChart, disposeChart } from '../components/chart-helper.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

let charts = {};

export const title = '算力负载均衡';

export function render() {
  return `
    <div class="module-page">
      <div class="toolbar">
        <h2>算力负载均衡</h2>
        <button class="btn btn-success" id="btn-rebalance">${icons.refresh} 执行均衡</button>
      </div>

      <div class="stat-cards">
        <div class="stat-card">
          <div class="stat-card-label">集群平均利用率</div>
          <div class="stat-card-value blue" id="avg-util">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">过载节点 (>90%)</div>
          <div class="stat-card-value red" id="overload-count">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">空闲节点 (<30%)</div>
          <div class="stat-card-value green" id="idle-count">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">目标利用率</div>
          <div class="stat-card-value yellow">≥85%</div>
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-container full">
          <div class="chart-title">各节点GPU负载</div>
          <div id="load-chart" style="height:300px;width:100%"></div>
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-container">
          <div class="chart-title">整体利用率</div>
          <div id="gauge-chart" style="height:240px;width:100%"></div>
        </div>
        <div class="chart-container">
          <div class="chart-title">负载均衡规则</div>
          <div style="padding:var(--space-md)">
            <div id="rules-list"></div>
            <button class="btn btn-ghost btn-sm mt-md" id="btn-add-rule">${icons.plus} 添加规则</button>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="section-title">最近均衡事件</h3>
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>时间</th>
                <th>源节点</th>
                <th>目标节点</th>
                <th>迁移任务</th>
                <th>原因</th>
              </tr>
            </thead>
            <tbody id="event-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

const defaultRules = [
  { id: 'lr-001', name: '过载迁移', condition: '节点利用率 > 90%', action: '迁移最低优先级任务到空闲节点', enabled: true },
  { id: 'lr-002', name: '空闲标记', condition: '节点利用率 < 30%', action: '标记为空闲节点，优先接收迁移任务', enabled: true },
  { id: 'lr-003', name: '故障转移', condition: '节点状态变为故障', action: '自动迁移该节点所有任务', enabled: true },
];

const defaultEvents = [
  { id: 'le-001', time: '2026-04-28 10:23', sourceNode: 'node-003', targetNode: 'node-022', task: 'task-003', reason: '源节点GPU利用率95%' },
  { id: 'le-002', time: '2026-04-28 09:15', sourceNode: 'node-008', targetNode: 'node-023', task: 'task-007', reason: '源节点CPU负载过高' },
  { id: 'le-003', time: '2026-04-27 22:30', sourceNode: 'node-020', targetNode: 'node-024', task: 'task-014', reason: '负载均衡策略执行' },
];

export async function init() {
  if (!getState('lbRules')) setState('lbRules', defaultRules);
  if (!getState('lbEvents')) setState('lbEvents', defaultEvents);
  updateStats();
  initLoadChart();
  initGauge();
  renderRules();
  renderEvents();
  bindEvents();
}

export function destroy() {
  Object.keys(charts).forEach(id => disposeChart(id));
  charts = {};
}

function updateStats() {
  const nodes = getState('nodes') || [];
  const onlineNodes = nodes.filter(n => n.status === 'online');
  const avgUtil = onlineNodes.length > 0 ? onlineNodes.reduce((s, n) => s + n.gpuUtilization, 0) / onlineNodes.length : 0;
  const overloads = onlineNodes.filter(n => n.gpuUtilization > 0.9).length;
  const idle = onlineNodes.filter(n => n.gpuUtilization < 0.3).length;

  const avgEl = document.getElementById('avg-util');
  const overEl = document.getElementById('overload-count');
  const idleEl = document.getElementById('idle-count');
  if (avgEl) avgEl.textContent = formatPercent(avgUtil);
  if (overEl) overEl.textContent = overloads;
  if (idleEl) idleEl.textContent = idle;
}

async function initLoadChart() {
  const nodes = getState('nodes') || [];
  const onlineNodes = nodes.filter(n => n.status === 'online');
  const names = onlineNodes.map(n => n.name);
  const values = onlineNodes.map(n => Math.round(n.gpuUtilization * 100));
  const colors = onlineNodes.map(n => n.gpuUtilization > 0.9 ? '#ef4444' : (n.gpuUtilization > 0.7 ? '#f59e0b' : '#22c55e'));

  charts.load = await createChart('load-chart', {
    xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
    yAxis: { type: 'category', data: names, inverse: true },
    series: [{
      type: 'bar',
      data: values.map((v, i) => ({ value: v, itemStyle: { color: colors[i] } })),
      barWidth: 12,
      label: { show: true, position: 'right', formatter: '{c}%', color: '#e4e6eb', fontSize: 11 },
    }],
    grid: { top: 10, right: 60, bottom: 10, left: 120 },
  });
}

async function initGauge() {
  const nodes = getState('nodes') || [];
  const onlineNodes = nodes.filter(n => n.status === 'online');
  const avgUtil = onlineNodes.length > 0 ? onlineNodes.reduce((s, n) => s + n.gpuUtilization, 0) / onlineNodes.length : 0;

  charts.gauge = await createChart('gauge-chart', {
    series: [{
      type: 'gauge',
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 100,
      detail: { formatter: '{value}%', fontSize: 24, color: '#e4e6eb', offsetCenter: [0, '60%'] },
      data: [{ value: Math.round(avgUtil * 100), name: '利用率' }],
      axisLine: {
        lineStyle: {
          width: 16,
          color: [[0.85, '#ef4444'], [1, '#22c55e']],
        },
      },
      axisTick: { show: false },
      splitLine: { length: 10, lineStyle: { width: 2, color: '#999' } },
      axisLabel: { distance: 20, color: '#9ca3af', fontSize: 10 },
      pointer: { width: 5 },
      title: { show: true, offsetCenter: [0, '80%'], color: '#9ca3af', fontSize: 12 },
    }],
  });
}

function renderRules() {
  const rules = getState('lbRules') || [];
  const container = document.getElementById('rules-list');
  if (!container) return;

  container.innerHTML = rules.map(r => `
    <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)">
      <label class="form-switch">
        <input type="checkbox" ${r.enabled ? 'checked' : ''} data-rule-id="${r.id}">
        <span class="switch-track"></span>
      </label>
      <div style="flex:1">
        <div style="font-weight:500;font-size:13px">${r.name}</div>
        <div class="text-xs text-muted">${r.condition} → ${r.action}</div>
      </div>
      <button class="btn btn-ghost btn-sm" data-action="delete-rule" data-id="${r.id}">${icons.trash}</button>
    </div>
  `).join('');
}

function renderEvents() {
  const events = getState('lbEvents') || [];
  const nodes = getState('nodes') || [];
  const tbody = document.getElementById('event-tbody');
  if (!tbody) return;

  tbody.innerHTML = events.map(e => {
    const src = nodes.find(n => n.id === e.sourceNode);
    const tgt = nodes.find(n => n.id === e.targetNode);
    return `
      <tr>
        <td>${e.time}</td>
        <td>${src?.name || e.sourceNode}</td>
        <td>${tgt?.name || e.targetNode}</td>
        <td>${e.task}</td>
        <td>${e.reason}</td>
      </tr>
    `;
  }).join('');
}

function bindEvents() {
  document.getElementById('btn-rebalance')?.addEventListener('click', executeRebalance);
  document.getElementById('btn-add-rule')?.addEventListener('click', showAddRuleModal);

  document.getElementById('rules-list')?.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && e.target.dataset.ruleId) {
      const rules = getState('lbRules') || [];
      const rule = rules.find(r => r.id === e.target.dataset.ruleId);
      if (rule) {
        rule.enabled = e.target.checked;
        setState('lbRules', rules);
        showToast(`规则已${rule.enabled ? '启用' : '禁用'}`, 'info');
      }
    }
  });

  document.getElementById('rules-list')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="delete-rule"]');
    if (btn) {
      const rules = (getState('lbRules') || []).filter(r => r.id !== btn.dataset.id);
      setState('lbRules', rules);
      renderRules();
      showToast('规则已删除', 'info');
    }
  });
}

async function executeRebalance() {
  const nodes = getState('nodes') || [];
  const tasks = getState('tasks') || [];
  const events = getState('lbEvents') || [];

  const overloads = nodes.filter(n => n.status === 'online' && n.gpuUtilization > 0.9);
  const idleNodes = nodes.filter(n => n.status === 'online' && n.gpuUtilization < 0.3);

  let migrated = 0;

  for (const overloaded of overloads) {
    if (idleNodes.length === 0) break;
    const runningTasks = tasks.filter(t => t.assignedNode === overloaded.id && t.status === 'running');
    const lowPrioTask = runningTasks.sort((a, b) => a.priority - b.priority)[0];
    if (!lowPrioTask) continue;

    const target = idleNodes.find(n => n.gpuCount >= lowPrioTask.requiredGPUs);
    if (!target) continue;

    const srcName = overloaded.name;
    const tgtName = target.name;

    lowPrioTask.assignedNode = target.id;
    overloaded.allocatedTo = null;
    target.allocatedTo = lowPrioTask.customerId;

    events.unshift({
      id: generateId('le'),
      time: new Date().toISOString().replace('T', ' ').slice(0, 16),
      sourceNode: overloaded.id,
      targetNode: target.id,
      task: lowPrioTask.id,
      reason: `源节点GPU利用率${(overloaded.gpuUtilization * 100).toFixed(0)}%`,
    });

    overloaded.gpuUtilization = Math.max(0.3, overloaded.gpuUtilization - 0.3);
    target.gpuUtilization = Math.min(0.9, target.gpuUtilization + 0.3);
    migrated++;
  }

  setState('nodes', nodes);
  setState('tasks', tasks);
  setState('lbEvents', events);

  showToast(`均衡完成，已迁移 ${migrated} 个任务`, migrated > 0 ? 'success' : 'info');
  updateStats();
  await initLoadChart();
  await initGauge();
  renderEvents();
}

function showAddRuleModal() {
  openModal({
    title: '添加均衡规则',
    content: `
      <div class="form-group">
        <label class="form-label">规则名称</label>
        <input type="text" class="form-input" id="rule-name" placeholder="规则名称">
      </div>
      <div class="form-group">
        <label class="form-label">触发条件</label>
        <input type="text" class="form-input" id="rule-condition" placeholder="如：节点利用率 > 90%">
      </div>
      <div class="form-group">
        <label class="form-label">执行动作</label>
        <input type="text" class="form-input" id="rule-action" placeholder="如：迁移最低优先级任务">
      </div>
    `,
    onConfirm: () => {
      const name = document.getElementById('rule-name')?.value;
      const condition = document.getElementById('rule-condition')?.value;
      const action = document.getElementById('rule-action')?.value;
      if (!name || !condition || !action) { showToast('请填写完整信息', 'warning'); return false; }

      const rules = getState('lbRules') || [];
      rules.push({ id: generateId('lr'), name, condition, action, enabled: true });
      setState('lbRules', rules);
      showToast('规则已添加', 'success');
      renderRules();
      return true;
    },
  });
}

export default { title, render, init, destroy };
