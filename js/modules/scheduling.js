import { getState, setState } from '../store.js';
import { formatPercent, formatNumber, getStatusBadge, getStatusLabel, getPriorityLabel, getPriorityClass, icons, generateId } from '../utils.js';
import { createChart, disposeChart } from '../components/chart-helper.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

let charts = {};
let liveInterval = null;
let currentTab = 'running';

export const title = '任务调度与优先级管理';

export function render() {
  const tasks = getState('tasks') || [];
  const running = tasks.filter(t => t.status === 'running').length;
  const queued = tasks.filter(t => t.status === 'queued').length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const failed = tasks.filter(t => t.status === 'failed').length;

  return `
    <div class="module-page">
      <div class="toolbar">
        <h2>任务调度与优先级管理</h2>
        <div class="toolbar-right">
          <button class="btn btn-success" id="btn-auto-schedule">${icons.play} 自动调度</button>
          <button class="btn btn-primary" id="btn-new-task">${icons.plus} 提交新任务</button>
        </div>
      </div>

      <div class="stat-cards">
        <div class="stat-card ${currentTab === 'running' ? 'active' : ''}" data-tab="running">
          <div class="stat-card-label">运行中</div>
          <div class="stat-card-value green">${running}</div>
        </div>
        <div class="stat-card ${currentTab === 'queued' ? 'active' : ''}" data-tab="queued">
          <div class="stat-card-label">排队中</div>
          <div class="stat-card-value blue">${queued}</div>
        </div>
        <div class="stat-card ${currentTab === 'completed' ? 'active' : ''}" data-tab="completed">
          <div class="stat-card-label">已完成</div>
          <div class="stat-card-value green">${completed}</div>
        </div>
        <div class="stat-card ${currentTab === 'failed' ? 'active' : ''}" data-tab="failed">
          <div class="stat-card-label">失败</div>
          <div class="stat-card-value red">${failed}</div>
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-container">
          <div class="chart-title">优先级分布</div>
          <div id="priority-chart" style="height:220px;width:100%"></div>
        </div>
        <div class="chart-container">
          <div class="chart-title">任务完成趋势 (7天)</div>
          <div id="completion-chart" style="height:220px;width:100%"></div>
        </div>
      </div>

      <div class="card">
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>任务ID</th>
                <th>任务名称</th>
                <th>客户</th>
                <th>类型</th>
                <th>优先级</th>
                <th>GPU需求</th>
                <th>分配节点</th>
                <th>进度</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody id="task-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  renderTable();
  await initCharts();
  bindEvents();
  startLiveUpdates();
}

export function destroy() {
  Object.keys(charts).forEach(id => disposeChart(id));
  charts = {};
  if (liveInterval) clearInterval(liveInterval);
  liveInterval = null;
}

function renderTable() {
  const tasks = getState('tasks') || [];
  const customers = getState('customers') || [];
  const nodes = getState('nodes') || [];
  const filtered = tasks.filter(t => t.status === currentTab);
  const tbody = document.getElementById('task-tbody');
  if (!tbody) return;

  tbody.innerHTML = filtered.map(t => {
    const customer = customers.find(c => c.id === t.customerId);
    const node = nodes.find(n => n.id === t.assignedNode);

    return `
      <tr>
        <td class="text-sm">${t.id}</td>
        <td><strong>${t.name}</strong></td>
        <td>${customer ? customer.name : t.customerId}</td>
        <td>${t.type}</td>
        <td><span class="badge ${getPriorityClass(t.priority)}">${getPriorityLabel(t.priority)}</span></td>
        <td>${t.requiredGPUs}</td>
        <td>${node ? node.name : '<span class="text-muted">待分配</span>'}</td>
        <td>
          ${t.status === 'running' || t.status === 'queued' ? `
            <div style="display:flex;align-items:center;gap:8px">
              <div class="progress-bar" style="width:80px">
                <div class="progress-bar-fill ${t.progress > 0.8 ? 'green' : 'blue'}" style="width:${t.progress * 100}%"></div>
              </div>
              <span class="text-sm">${(t.progress * 100).toFixed(1)}%</span>
            </div>
          ` : formatPercent(t.progress)}
        </td>
        <td><span class="badge ${getStatusBadge(t.status)}">${getStatusLabel(t.status)}</span></td>
        <td class="table-actions">
          <button class="btn btn-ghost btn-sm" data-action="detail" data-id="${t.id}">${icons.eye}</button>
          ${t.status === 'running' ? `<button class="btn btn-warning btn-sm" data-action="pause" data-id="${t.id}">暂停</button>` : ''}
          ${t.status === 'queued' ? `<button class="btn btn-danger btn-sm" data-action="cancel" data-id="${t.id}">取消</button>` : ''}
        </td>
      </tr>
    `;
  }).join('');

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="text-center text-muted" style="padding:24px">暂无${getStatusLabel(currentTab)}的任务</td></tr>`;
  }
}

async function initCharts() {
  const tasks = getState('tasks') || [];

  // Priority distribution
  const priorityCounts = [1, 2, 3, 4, 5].map(p => tasks.filter(t => t.priority === p && (t.status === 'running' || t.status === 'queued')).length);

  charts.priority = await createChart('priority-chart', {
    xAxis: { type: 'category', data: ['P1', 'P2', 'P3', 'P4', 'P5'] },
    yAxis: { type: 'value' },
    series: [{
      type: 'bar',
      data: priorityCounts.map((v, i) => ({
        value: v,
        itemStyle: { color: ['#6b7280', '#3b82f6', '#f59e0b', '#f97316', '#ef4444'][i] },
      })),
      barWidth: 30,
    }],
    grid: { top: 10, right: 10, bottom: 30, left: 40 },
  });

  // Completion trend
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2026, 3, 22 + i);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });

  charts.completion = await createChart('completion-chart', {
    xAxis: { type: 'category', data: days },
    yAxis: { type: 'value' },
    series: [
      {
        name: '完成',
        type: 'line',
        data: [8, 12, 6, 15, 10, 9, 13],
        smooth: true,
        lineStyle: { color: '#22c55e' },
        itemStyle: { color: '#22c55e' },
        areaStyle: { color: 'rgba(34,197,94,0.1)' },
      },
      {
        name: '提交',
        type: 'line',
        data: [10, 14, 8, 16, 12, 11, 15],
        smooth: true,
        lineStyle: { color: '#3b82f6' },
        itemStyle: { color: '#3b82f6' },
        areaStyle: { color: 'rgba(59,130,246,0.1)' },
      },
    ],
    legend: { bottom: 0, textStyle: { color: '#9ca3af' } },
    grid: { top: 10, right: 10, bottom: 40, left: 40 },
  });
}

function bindEvents() {
  // Tab switching via stat cards
  document.querySelectorAll('.stat-card[data-tab]').forEach(card => {
    card.addEventListener('click', () => {
      currentTab = card.dataset.tab;
      document.querySelectorAll('.stat-card[data-tab]').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      renderTable();
    });
  });

  // New task
  document.getElementById('btn-new-task')?.addEventListener('click', showNewTaskModal);

  // Auto schedule
  document.getElementById('btn-auto-schedule')?.addEventListener('click', autoSchedule);

  // Table actions
  document.getElementById('task-tbody')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const taskId = btn.dataset.id;
    if (action === 'detail') showTaskDetail(taskId);
    if (action === 'pause') pauseTask(taskId);
    if (action === 'cancel') cancelTask(taskId);
  });
}

function showNewTaskModal() {
  const customers = getState('customers') || [];

  openModal({
    title: '提交新任务',
    content: `
      <div class="form-group">
        <label class="form-label">任务名称</label>
        <input type="text" class="form-input" id="task-name" placeholder="请输入任务名称">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">客户</label>
          <select class="form-select" id="task-customer">
            <option value="">请选择</option>
            ${customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">任务类型</label>
          <select class="form-select" id="task-type">
            <option value="训练">训练</option>
            <option value="推理">推理</option>
            <option value="数据处理">数据处理</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">优先级</label>
          <select class="form-select" id="task-priority">
            <option value="1">P1 - 最低 (1x)</option>
            <option value="2">P2 - 低 (1.5x)</option>
            <option value="3" selected>P3 - 中 (2x)</option>
            <option value="4">P4 - 高 (2.5x)</option>
            <option value="5">P5 - 最高 (3x)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">GPU需求</label>
          <input type="number" class="form-input" id="task-gpus" min="1" value="4">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">预估时长</label>
        <select class="form-select" id="task-duration">
          <option value="2h">2小时</option>
          <option value="4h">4小时</option>
          <option value="6h" selected>6小时</option>
          <option value="8h">8小时</option>
          <option value="12h">12小时</option>
          <option value="24h">24小时</option>
          <option value="48h">48小时</option>
        </select>
      </div>
    `,
    onConfirm: () => {
      const name = document.getElementById('task-name')?.value;
      const customerId = document.getElementById('task-customer')?.value;
      if (!name || !customerId) { showToast('请填写完整信息', 'warning'); return false; }

      const tasks = getState('tasks') || [];
      const newTask = {
        id: generateId('task'),
        name,
        customerId,
        type: document.getElementById('task-type')?.value || '训练',
        priority: parseInt(document.getElementById('task-priority')?.value) || 3,
        requiredGPUs: parseInt(document.getElementById('task-gpus')?.value) || 4,
        requiredTFLOPS: 150,
        status: 'queued',
        assignedNode: null,
        submitTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
        startTime: null,
        estimatedDuration: document.getElementById('task-duration')?.value || '6h',
        progress: 0,
      };

      tasks.push(newTask);
      setState('tasks', tasks);
      showToast('任务已提交，等待调度', 'success');
      renderTable();
      initCharts();
      return true;
    },
  });
}

function autoSchedule() {
  const tasks = getState('tasks') || [];
  const nodes = getState('nodes') || [];
  const queued = tasks.filter(t => t.status === 'queued').sort((a, b) => b.priority - a.priority);
  let scheduled = 0;

  for (const task of queued) {
    const freeNode = nodes.find(n => n.status === 'online' && !n.allocatedTo && n.gpuCount >= task.requiredGPUs);
    if (freeNode) {
      task.status = 'running';
      task.assignedNode = freeNode.id;
      task.startTime = new Date().toISOString().replace('T', ' ').slice(0, 19);
      freeNode.allocatedTo = task.customerId;
      scheduled++;
    }
  }

  setState('tasks', tasks);
  setState('nodes', nodes);
  showToast(`自动调度完成，已调度 ${scheduled} 个任务`, scheduled > 0 ? 'success' : 'info');
  renderTable();
  initCharts();
}

function pauseTask(taskId) {
  const tasks = getState('tasks') || [];
  const nodes = getState('nodes') || [];
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'paused';
    const node = nodes.find(n => n.id === task.assignedNode);
    if (node) node.allocatedTo = null;
    setState('tasks', tasks);
    setState('nodes', nodes);
    showToast('任务已暂停', 'info');
    renderTable();
  }
}

function cancelTask(taskId) {
  openModal({
    title: '确认取消',
    content: '<p>确定要取消该任务吗？此操作不可撤销。</p>',
    onConfirm: () => {
      const tasks = getState('tasks') || [];
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        task.status = 'cancelled';
        setState('tasks', tasks);
        showToast('任务已取消', 'info');
        renderTable();
        initCharts();
      }
      return true;
    },
  });
}

function showTaskDetail(taskId) {
  const tasks = getState('tasks') || [];
  const customers = getState('customers') || [];
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  const customer = customers.find(c => c.id === task.customerId);

  openModal({
    title: `任务详情 - ${task.name}`,
    wide: true,
    content: `
      <div class="form-row">
        <div class="form-group"><div class="form-label">任务ID</div><div>${task.id}</div></div>
        <div class="form-group"><div class="form-label">任务名称</div><div>${task.name}</div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><div class="form-label">客户</div><div>${customer?.name || '-'}</div></div>
        <div class="form-group"><div class="form-label">类型</div><div>${task.type}</div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><div class="form-label">优先级</div><div><span class="badge ${getPriorityClass(task.priority)}">${getPriorityLabel(task.priority)}</span></div></div>
        <div class="form-group"><div class="form-label">GPU需求</div><div>${task.requiredGPUs}</div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><div class="form-label">状态</div><div><span class="badge ${getStatusBadge(task.status)}">${getStatusLabel(task.status)}</span></div></div>
        <div class="form-group"><div class="form-label">分配节点</div><div>${task.assignedNode || '未分配'}</div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><div class="form-label">提交时间</div><div>${task.submitTime}</div></div>
        <div class="form-group"><div class="form-label">开始时间</div><div>${task.startTime || '-'}</div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><div class="form-label">预估时长</div><div>${task.estimatedDuration}</div></div>
        <div class="form-group"><div class="form-label">进度</div><div>${(task.progress * 100).toFixed(1)}%</div></div>
      </div>
      <div style="margin-top:var(--space-md)">
        <div class="form-label">运行日志</div>
        <div style="background:var(--bg-primary);border-radius:var(--radius);padding:var(--space-md);font-family:var(--font-mono);font-size:12px;color:var(--text-secondary);max-height:160px;overflow-y:auto">
          <div>[INFO] ${task.submitTime} 任务已提交</div>
          ${task.startTime ? `<div>[INFO] ${task.startTime} 任务开始执行</div>` : ''}
          ${task.status === 'running' ? `<div>[INFO] 模型加载完成，开始训练...</div><div>[INFO] Epoch 1/10 - Loss: ${(Math.random() * 2).toFixed(4)}</div><div>[INFO] Epoch 2/10 - Loss: ${(Math.random() * 1.5).toFixed(4)}</div>` : ''}
          ${task.status === 'completed' ? '<div>[INFO] 任务执行完成</div>' : ''}
          ${task.status === 'failed' ? '<div>[ERROR] CUDA out of memory. Tried to allocate 2.00 GiB</div>' : ''}
        </div>
      </div>
    `,
    footer: false,
  });
}

function startLiveUpdates() {
  liveInterval = setInterval(() => {
    const tasks = getState('tasks') || [];
    let changed = false;
    tasks.filter(t => t.status === 'running').forEach(t => {
      t.progress = Math.min(1, t.progress + Math.random() * 0.02);
      if (t.progress >= 1) {
        t.status = 'completed';
        t.progress = 1;
      }
      changed = true;
    });
    if (changed) {
      setState('tasks', tasks);
      renderTable();
    }
  }, 10000);
}

export default { title, render, init, destroy };
