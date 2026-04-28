import { getState, setState, subscribe } from '../store.js';
import { formatPercent, formatNumber, getStatusBadge, getStatusLabel, icons, generateId } from '../utils.js';
import { createChart, disposeChart } from '../components/chart-helper.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

let pieChart = null;

export const title = '客户算力分配';

export function render() {
  const nodes = getState('nodes') || [];
  const customers = getState('customers') || [];
  const totalGPUs = nodes.reduce((s, n) => s + n.gpuCount, 0);
  const allocatedGPUs = nodes.filter(n => n.allocatedTo).reduce((s, n) => s + n.gpuCount, 0);
  const reservedNodes = nodes.filter(n => n.status === 'maintenance').reduce((s, n) => s + n.gpuCount, 0);
  const freeGPUs = totalGPUs - allocatedGPUs - reservedNodes;

  return `
    <div class="module-page">
      <div class="toolbar">
        <h2>客户算力分配</h2>
        <button class="btn btn-primary" id="btn-new-alloc">${icons.plus} 新建分配</button>
      </div>

      <div class="chart-row">
        <div class="chart-container">
          <div class="chart-title">资源池概览</div>
          <div id="pool-chart" style="height:280px;width:100%"></div>
        </div>
        <div class="chart-container">
          <div class="chart-title">资源分配概要</div>
          <div style="padding:var(--space-md)">
            <div class="stat-cards" style="margin-bottom:0">
              <div class="stat-card">
                <div class="stat-card-label">总GPU</div>
                <div class="stat-card-value blue">${totalGPUs}</div>
              </div>
              <div class="stat-card">
                <div class="stat-card-label">已分配</div>
                <div class="stat-card-value green">${allocatedGPUs}</div>
              </div>
              <div class="stat-card">
                <div class="stat-card-label">预留</div>
                <div class="stat-card-value yellow">${reservedNodes}</div>
              </div>
              <div class="stat-card">
                <div class="stat-card-label">空闲</div>
                <div class="stat-card-value blue">${freeGPUs}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top:var(--space-md)">
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>客户名称</th>
                <th>客户类型</th>
                <th>分配GPU数</th>
                <th>分配TFLOPS</th>
                <th>分配节点</th>
                <th>合同到期</th>
                <th>联系人</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody id="alloc-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  renderTable();
  await initPoolChart();
  bindEvents();
}

export function destroy() {
  if (pieChart) { disposeChart('pool-chart'); pieChart = null; }
}

function getAllocations() {
  const nodes = getState('nodes') || [];
  const customers = getState('customers') || [];
  const allocMap = {};

  nodes.filter(n => n.allocatedTo).forEach(n => {
    if (!allocMap[n.allocatedTo]) {
      allocMap[n.allocatedTo] = { nodeId: n.allocatedTo, nodeIds: [], gpuCount: 0, tflops: 0 };
    }
    allocMap[n.allocatedTo].nodeIds.push(n.id);
    allocMap[n.allocatedTo].gpuCount += n.gpuCount;
    allocMap[n.allocatedTo].tflops += n.totalTFLOPS;
  });

  return customers.map(c => ({
    ...c,
    allocNodeIds: allocMap[c.id]?.nodeIds || [],
    allocGPUs: allocMap[c.id]?.gpuCount || 0,
    allocTFLOPS: allocMap[c.id]?.tflops || 0,
  })).filter(c => c.allocGPUs > 0);
}

function renderTable() {
  const allocations = getAllocations();
  const nodes = getState('nodes') || [];
  const tbody = document.getElementById('alloc-tbody');
  if (!tbody) return;

  tbody.innerHTML = allocations.map(a => `
    <tr>
      <td><strong>${a.name}</strong></td>
      <td>${a.type}</td>
      <td>${a.allocGPUs}</td>
      <td>${a.allocTFLOPS} TFLOPS</td>
      <td>
        <div class="tag-list">
          ${a.allocNodeIds.map(nid => {
            const nd = nodes.find(n => n.id === nid);
            return `<span class="tag">${nd ? nd.name : nid}</span>`;
          }).join('')}
        </div>
      </td>
      <td>${a.contractExpiry}</td>
      <td>${a.contactPerson}</td>
      <td class="table-actions">
        <button class="btn btn-ghost btn-sm" data-action="adjust" data-customer="${a.id}">调整</button>
        <button class="btn btn-danger btn-sm" data-action="release" data-customer="${a.id}">释放</button>
      </td>
    </tr>
  `).join('');
}

async function initPoolChart() {
  const nodes = getState('nodes') || [];
  const totalGPUs = nodes.reduce((s, n) => s + n.gpuCount, 0);
  const allocatedGPUs = nodes.filter(n => n.allocatedTo).reduce((s, n) => s + n.gpuCount, 0);
  const reservedGPUs = nodes.filter(n => n.status === 'maintenance').reduce((s, n) => s + n.gpuCount, 0);
  const freeGPUs = totalGPUs - allocatedGPUs - reservedGPUs;

  pieChart = await createChart('pool-chart', {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { bottom: 10, textStyle: { color: '#9ca3af' } },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 6, borderColor: '#1a1d27', borderWidth: 2 },
      label: { show: true, color: '#e4e6eb', formatter: '{b}\n{d}%' },
      data: [
        { value: allocatedGPUs, name: '已分配', itemStyle: { color: '#3b82f6' } },
        { value: reservedGPUs, name: '预留', itemStyle: { color: '#f59e0b' } },
        { value: freeGPUs, name: '空闲', itemStyle: { color: '#22c55e' } },
      ],
    }],
  });
}

function bindEvents() {
  document.getElementById('btn-new-alloc')?.addEventListener('click', showNewAllocModal);

  document.getElementById('alloc-tbody')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const customerId = btn.dataset.customer;
    if (action === 'adjust') showAdjustModal(customerId);
    if (action === 'release') showReleaseConfirm(customerId);
  });
}

function showNewAllocModal() {
  const customers = getState('customers') || [];
  const nodes = getState('nodes') || [];
  const freeNodes = nodes.filter(n => !n.allocatedTo && n.status === 'online');

  openModal({
    title: '新建算力分配',
    content: `
      <div class="form-group">
        <label class="form-label">选择客户</label>
        <select class="form-select" id="alloc-customer">
          <option value="">请选择客户</option>
          ${customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">分配模式</label>
        <div class="alloc-mode-toggle" id="alloc-mode">
          <button class="active" data-mode="gpu">按GPU卡数</button>
          <button data-mode="tflops">按算力性能</button>
        </div>
      </div>
      <div class="form-group" id="alloc-gpu-group">
        <label class="form-label">GPU数量</label>
        <input type="number" class="form-input" id="alloc-gpu-count" min="1" max="${freeNodes.reduce((s, n) => s + n.gpuCount, 0)}" value="4">
        <div class="text-xs text-muted mt-sm">可用GPU: ${freeNodes.reduce((s, n) => s + n.gpuCount, 0)}</div>
      </div>
      <div class="form-group" id="alloc-tflops-group" style="display:none">
        <label class="form-label">算力需求 (TFLOPS)</label>
        <input type="number" class="form-input" id="alloc-tflops" min="1" value="312">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">开始时间</label>
          <input type="date" class="form-input" id="alloc-start" value="2026-04-28">
        </div>
        <div class="form-group">
          <label class="form-label">结束时间</label>
          <input type="date" class="form-input" id="alloc-end" value="2026-07-28">
        </div>
      </div>
    `,
    onConfirm: () => {
      const customerId = document.getElementById('alloc-customer')?.value;
      if (!customerId) { showToast('请选择客户', 'warning'); return false; }

      const gpuCount = parseInt(document.getElementById('alloc-gpu-count')?.value) || 0;
      if (gpuCount <= 0) { showToast('请输入有效的GPU数量', 'warning'); return false; }

      const nodes = getState('nodes') || [];
      const freeNodes = nodes.filter(n => !n.allocatedTo && n.status === 'online');
      let remaining = gpuCount;

      for (const node of freeNodes) {
        if (remaining <= 0) break;
        node.allocatedTo = customerId;
        remaining -= node.gpuCount;
      }

      setState('nodes', nodes);
      showToast('算力分配成功', 'success');
      renderTable();
      initPoolChart();
      return true;
    },
  });

  // Mode toggle
  setTimeout(() => {
    document.querySelectorAll('#alloc-mode button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#alloc-mode button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        document.getElementById('alloc-gpu-group').style.display = mode === 'gpu' ? '' : 'none';
        document.getElementById('alloc-tflops-group').style.display = mode === 'tflops' ? '' : 'none';
      });
    });
  }, 50);
}

function showAdjustModal(customerId) {
  const customers = getState('customers') || [];
  const nodes = getState('nodes') || [];
  const customer = customers.find(c => c.id === customerId);
  const customerNodes = nodes.filter(n => n.allocatedTo === customerId);
  const currentGPUs = customerNodes.reduce((s, n) => s + n.gpuCount, 0);

  openModal({
    title: `调整分配 - ${customer?.name}`,
    content: `
      <div class="form-group">
        <label class="form-label">当前分配GPU数</label>
        <div style="font-size:20px;font-weight:700;color:var(--accent-blue)">${currentGPUs}</div>
      </div>
      <div class="form-group">
        <label class="form-label">调整后GPU数</label>
        <input type="number" class="form-input" id="adjust-gpu-count" min="1" value="${currentGPUs}">
      </div>
    `,
    onConfirm: () => {
      const newCount = parseInt(document.getElementById('adjust-gpu-count')?.value) || 0;
      if (newCount <= 0) { showToast('请输入有效的GPU数量', 'warning'); return false; }

      if (newCount > currentGPUs) {
        const diff = newCount - currentGPUs;
        const freeNodes = nodes.filter(n => !n.allocatedTo && n.status === 'online');
        let remaining = diff;
        for (const node of freeNodes) {
          if (remaining <= 0) break;
          node.allocatedTo = customerId;
          remaining -= node.gpuCount;
        }
      } else if (newCount < currentGPUs) {
        let toRelease = currentGPUs - newCount;
        for (const node of [...customerNodes].reverse()) {
          if (toRelease <= 0) break;
          node.allocatedTo = null;
          toRelease -= node.gpuCount;
        }
      }

      setState('nodes', nodes);
      showToast('分配调整成功', 'success');
      renderTable();
      initPoolChart();
      return true;
    },
  });
}

function showReleaseConfirm(customerId) {
  const customers = getState('customers') || [];
  const customer = customers.find(c => c.id === customerId);

  openModal({
    title: '确认释放',
    content: `<p>确定要释放 <strong>${customer?.name}</strong> 的所有算力分配吗？此操作不可撤销。</p>`,
    onConfirm: () => {
      const nodes = getState('nodes') || [];
      nodes.filter(n => n.allocatedTo === customerId).forEach(n => { n.allocatedTo = null; });
      setState('nodes', nodes);
      showToast('算力分配已释放', 'success');
      renderTable();
      initPoolChart();
      return true;
    },
  });
}

export default { title, render, init, destroy };
