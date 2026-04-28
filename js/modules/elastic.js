import { getState, setState } from '../store.js';
import { formatPercent, formatNumber, icons, generateId } from '../utils.js';
import { createChart, disposeChart } from '../components/chart-helper.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

let charts = {};

export const title = '资源弹性扩缩容';

export function render() {
  return `
    <div class="module-page">
      <div class="toolbar">
        <h2>资源弹性扩缩容</h2>
        <button class="btn btn-primary" id="btn-new-policy">${icons.plus} 新建弹性策略</button>
      </div>

      <div class="chart-row">
        <div class="chart-container full">
          <div class="chart-title">7天GPU分配变化</div>
          <div id="elastic-timeline" style="height:260px;width:100%"></div>
        </div>
      </div>

      <div class="card mb-lg">
        <h3 class="section-title">弹性策略列表</h3>
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>客户</th>
                <th>当前GPU</th>
                <th>弹性范围</th>
                <th>策略类型</th>
                <th>扩容阈值</th>
                <th>缩容阈值</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody id="policy-tbody"></tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h3 class="section-title">即将执行的调整</h3>
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>客户</th>
                <th>调整类型</th>
                <th>GPU变化</th>
                <th>计划时间</th>
                <th>预计费用变化</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody id="adjustment-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

const defaultPolicies = [
  { id: 'ep-001', customerId: 'customer-001', currentGPUs: 32, minGPUs: 16, maxGPUs: 48, strategyType: '按天', scaleUpThreshold: 85, scaleDownThreshold: 40, status: 'active' },
  { id: 'ep-002', customerId: 'customer-002', currentGPUs: 24, minGPUs: 16, maxGPUs: 32, strategyType: '按小时', scaleUpThreshold: 90, scaleDownThreshold: 30, status: 'active' },
  { id: 'ep-003', customerId: 'customer-004', currentGPUs: 20, minGPUs: 12, maxGPUs: 32, strategyType: '按天', scaleUpThreshold: 80, scaleDownThreshold: 35, status: 'active' },
  { id: 'ep-004', customerId: 'customer-005', currentGPUs: 8, minGPUs: 4, maxGPUs: 16, strategyType: '按小时', scaleUpThreshold: 90, scaleDownThreshold: 30, status: 'paused' },
];

const defaultAdjustments = [
  { id: 'ea-001', customerId: 'customer-001', type: '扩容', gpuChange: '+8', scheduledTime: '2026-04-29 08:00', costChange: '+9,600元/天' },
  { id: 'ea-002', customerId: 'customer-002', type: '缩容', gpuChange: '-4', scheduledTime: '2026-04-29 20:00', costChange: '-4,800元/天' },
  { id: 'ea-003', customerId: 'customer-004', type: '扩容', gpuChange: '+4', scheduledTime: '2026-04-30 08:00', costChange: '+4,800元/天' },
];

export async function init() {
  if (!getState('elasticPolicies')) setState('elasticPolicies', defaultPolicies);
  if (!getState('elasticAdjustments')) setState('elasticAdjustments', defaultAdjustments);
  renderPolicies();
  renderAdjustments();
  await initTimeline();
  bindEvents();
}

export function destroy() {
  Object.keys(charts).forEach(id => disposeChart(id));
  charts = {};
}

function renderPolicies() {
  const policies = getState('elasticPolicies') || [];
  const customers = getState('customers') || [];
  const tbody = document.getElementById('policy-tbody');
  if (!tbody) return;

  tbody.innerHTML = policies.map(p => {
    const customer = customers.find(c => c.id === p.customerId);
    return `
      <tr>
        <td><strong>${customer?.name || p.customerId}</strong></td>
        <td>${p.currentGPUs}</td>
        <td>${p.minGPUs} - ${p.maxGPUs}</td>
        <td>${p.strategyType}</td>
        <td>利用率 > ${p.scaleUpThreshold}%</td>
        <td>利用率 < ${p.scaleDownThreshold}%</td>
        <td><span class="badge ${p.status === 'active' ? 'badge-active' : 'badge-paused'}">${p.status === 'active' ? '生效中' : '已暂停'}</span></td>
        <td class="table-actions">
          <button class="btn btn-ghost btn-sm" data-action="adjust-now" data-id="${p.id}">立即调整</button>
          <button class="btn btn-ghost btn-sm" data-action="edit" data-id="${p.id}">${icons.edit}</button>
          <button class="btn btn-danger btn-sm" data-action="delete" data-id="${p.id}">${icons.trash}</button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAdjustments() {
  const adjustments = getState('elasticAdjustments') || [];
  const customers = getState('customers') || [];
  const tbody = document.getElementById('adjustment-tbody');
  if (!tbody) return;

  tbody.innerHTML = adjustments.map(a => {
    const customer = customers.find(c => c.id === a.customerId);
    return `
      <tr>
        <td><strong>${customer?.name || a.customerId}</strong></td>
        <td><span class="badge ${a.type === '扩容' ? 'badge-running' : 'badge-warning'}">${a.type}</span></td>
        <td style="color:${a.type === '扩容' ? 'var(--accent-green)' : 'var(--accent-red)'}; font-weight:600">${a.gpuChange}</td>
        <td>${a.scheduledTime}</td>
        <td style="color:${a.type === '扩容' ? 'var(--accent-yellow)' : 'var(--accent-green)'}">${a.costChange}</td>
        <td class="table-actions">
          <button class="btn btn-ghost btn-sm" data-action="cancel-adj" data-id="${a.id}">取消</button>
        </td>
      </tr>
    `;
  }).join('');
}

async function initTimeline() {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2026, 3, 22 + i);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });

  const baseData = [180, 192, 188, 200, 196, 204, 192];
  const scaleUpMarks = { '4/25': '+8', '4/27': '+12' };
  const scaleDownMarks = { '4/24': '-4', '4/26': '-8' };

  charts.timeline = await createChart('elastic-timeline', {
    xAxis: { type: 'category', data: days },
    yAxis: { type: 'value', name: 'GPU数', nameTextStyle: { color: '#9ca3af' } },
    series: [{
      type: 'line',
      data: baseData,
      smooth: true,
      lineStyle: { color: '#3b82f6', width: 2 },
      areaStyle: { color: 'rgba(59,130,246,0.1)' },
      itemStyle: { color: '#3b82f6' },
      markPoint: {
        data: [
          { coord: [3, 200], value: '+12', itemStyle: { color: '#22c55e' } },
          { coord: [5, 204], value: '+12', itemStyle: { color: '#22c55e' } },
          { coord: [1, 192], value: '-4', itemStyle: { color: '#ef4444' } },
        ],
        symbolSize: 40,
        label: { color: '#fff', fontSize: 11 },
      },
    }],
    grid: { top: 40, right: 20, bottom: 30, left: 60 },
  });
}

function bindEvents() {
  document.getElementById('btn-new-policy')?.addEventListener('click', showNewPolicyModal);

  document.getElementById('policy-tbody')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    if (action === 'adjust-now') showAdjustNowModal(id);
    if (action === 'edit') showEditPolicyModal(id);
    if (action === 'delete') deletePolicy(id);
  });

  document.getElementById('adjustment-tbody')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    if (btn.dataset.action === 'cancel-adj') cancelAdjustment(btn.dataset.id);
  });
}

function showNewPolicyModal() {
  const customers = getState('customers') || [];

  openModal({
    title: '新建弹性策略',
    content: `
      <div class="form-group">
        <label class="form-label">客户</label>
        <select class="form-select" id="ep-customer">
          <option value="">请选择</option>
          ${customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">基础GPU数</label>
          <input type="number" class="form-input" id="ep-base-gpu" min="1" value="8">
        </div>
        <div class="form-group">
          <label class="form-label">策略类型</label>
          <select class="form-select" id="ep-type">
            <option value="按小时">按小时</option>
            <option value="按天">按天</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">最小GPU数</label>
          <input type="number" class="form-input" id="ep-min-gpu" min="1" value="4">
        </div>
        <div class="form-group">
          <label class="form-label">最大GPU数</label>
          <input type="number" class="form-input" id="ep-max-gpu" min="1" value="32">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">扩容阈值 (%)</label>
          <input type="number" class="form-input" id="ep-scale-up" min="50" max="100" value="85">
        </div>
        <div class="form-group">
          <label class="form-label">缩容阈值 (%)</label>
          <input type="number" class="form-input" id="ep-scale-down" min="10" max="60" value="35">
        </div>
      </div>
    `,
    onConfirm: () => {
      const customerId = document.getElementById('ep-customer')?.value;
      if (!customerId) { showToast('请选择客户', 'warning'); return false; }

      const policies = getState('elasticPolicies') || [];
      policies.push({
        id: generateId('ep'),
        customerId,
        currentGPUs: parseInt(document.getElementById('ep-base-gpu')?.value) || 8,
        minGPUs: parseInt(document.getElementById('ep-min-gpu')?.value) || 4,
        maxGPUs: parseInt(document.getElementById('ep-max-gpu')?.value) || 32,
        strategyType: document.getElementById('ep-type')?.value || '按天',
        scaleUpThreshold: parseInt(document.getElementById('ep-scale-up')?.value) || 85,
        scaleDownThreshold: parseInt(document.getElementById('ep-scale-down')?.value) || 35,
        status: 'active',
      });
      setState('elasticPolicies', policies);
      showToast('弹性策略已创建', 'success');
      renderPolicies();
      return true;
    },
  });
}

function showAdjustNowModal(policyId) {
  const policies = getState('elasticPolicies') || [];
  const customers = getState('customers') || [];
  const policy = policies.find(p => p.id === policyId);
  if (!policy) return;
  const customer = customers.find(c => c.id === policy.customerId);

  openModal({
    title: `立即调整 - ${customer?.name}`,
    content: `
      <div class="form-group">
        <label class="form-label">当前GPU数</label>
        <div style="font-size:20px;font-weight:700;color:var(--accent-blue)">${policy.currentGPUs}</div>
      </div>
      <div class="form-group">
        <label class="form-label">调整后GPU数 (${policy.minGPUs} - ${policy.maxGPUs})</label>
        <input type="number" class="form-input" id="adj-gpu" min="${policy.minGPUs}" max="${policy.maxGPUs}" value="${policy.currentGPUs}">
      </div>
      <div class="billing-preview" id="billing-preview"></div>
    `,
    onConfirm: () => {
      const newGPUs = parseInt(document.getElementById('adj-gpu')?.value) || policy.currentGPUs;
      if (newGPUs < policy.minGPUs || newGPUs > policy.maxGPUs) {
        showToast(`GPU数必须在 ${policy.minGPUs}-${policy.maxGPUs} 范围内`, 'warning');
        return false;
      }
      const diff = newGPUs - policy.currentGPUs;
      policy.currentGPUs = newGPUs;
      policy.status = 'active';
      setState('elasticPolicies', policies);
      showToast(`${diff > 0 ? '扩容' : '缩容'}成功: ${diff > 0 ? '+' : ''}${diff} GPU`, 'success');
      renderPolicies();
      return true;
    },
  });

  // Billing preview
  setTimeout(() => {
    const input = document.getElementById('adj-gpu');
    if (input) {
      const updatePreview = () => {
        const newGPUs = parseInt(input.value) || policy.currentGPUs;
        const diff = newGPUs - policy.currentGPUs;
        const costPerGPU = 50;
        const hours = policy.strategyType === '按小时' ? 1 : 24;
        const cost = Math.abs(diff) * costPerGPU * hours;
        const preview = document.getElementById('billing-preview');
        if (preview) {
          preview.innerHTML = `
            <div class="billing-row"><span>GPU变化</span><span>${diff > 0 ? '+' : ''}${diff} GPU</span></div>
            <div class="billing-row"><span>单价</span><span>${costPerGPU}元/GPU/${policy.strategyType === '按小时' ? '小时' : '天'}</span></div>
            <div class="billing-row"><span>计算周期</span><span>${hours}小时</span></div>
            <div class="billing-row total"><span>费用变化</span><span>${diff > 0 ? '+' : '-'}${formatNumber(cost)}元</span></div>
          `;
        }
      };
      input.addEventListener('input', updatePreview);
      updatePreview();
    }
  }, 50);
}

function showEditPolicyModal(policyId) {
  const policies = getState('elasticPolicies') || [];
  const policy = policies.find(p => p.id === policyId);
  if (!policy) return;

  openModal({
    title: '编辑弹性策略',
    content: `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">最小GPU数</label>
          <input type="number" class="form-input" id="edit-min-gpu" value="${policy.minGPUs}">
        </div>
        <div class="form-group">
          <label class="form-label">最大GPU数</label>
          <input type="number" class="form-input" id="edit-max-gpu" value="${policy.maxGPUs}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">扩容阈值 (%)</label>
          <input type="number" class="form-input" id="edit-scale-up" value="${policy.scaleUpThreshold}">
        </div>
        <div class="form-group">
          <label class="form-label">缩容阈值 (%)</label>
          <input type="number" class="form-input" id="edit-scale-down" value="${policy.scaleDownThreshold}">
        </div>
      </div>
    `,
    onConfirm: () => {
      policy.minGPUs = parseInt(document.getElementById('edit-min-gpu')?.value) || policy.minGPUs;
      policy.maxGPUs = parseInt(document.getElementById('edit-max-gpu')?.value) || policy.maxGPUs;
      policy.scaleUpThreshold = parseInt(document.getElementById('edit-scale-up')?.value) || policy.scaleUpThreshold;
      policy.scaleDownThreshold = parseInt(document.getElementById('edit-scale-down')?.value) || policy.scaleDownThreshold;
      setState('elasticPolicies', policies);
      showToast('策略已更新', 'success');
      renderPolicies();
      return true;
    },
  });
}

function deletePolicy(policyId) {
  openModal({
    title: '确认删除',
    content: '<p>确定要删除该弹性策略吗？</p>',
    onConfirm: () => {
      const policies = (getState('elasticPolicies') || []).filter(p => p.id !== policyId);
      setState('elasticPolicies', policies);
      showToast('策略已删除', 'info');
      renderPolicies();
      return true;
    },
  });
}

function cancelAdjustment(adjId) {
  const adjustments = (getState('elasticAdjustments') || []).filter(a => a.id !== adjId);
  setState('elasticAdjustments', adjustments);
  showToast('调整已取消', 'info');
  renderAdjustments();
}

export default { title, render, init, destroy };
