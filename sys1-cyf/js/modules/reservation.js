import { getState, setState } from '../store.js';
import { formatNumber, getStatusBadge, getStatusLabel, icons, generateId } from '../utils.js';
import { createChart, disposeChart, getColors } from '../components/chart-helper.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

let ganttChart = null;

export const title = '算力预留管理';

export function render() {
  return `
    <div class="module-page">
      <div class="toolbar">
        <h2>算力预留管理</h2>
        <button class="btn btn-primary" id="btn-new-resv">${icons.plus} 新建预留</button>
      </div>

      <div class="card mb-lg" id="expiring-section">
        <h3 class="section-title" style="color:var(--accent-yellow)">即将到期提醒</h3>
        <div id="expiring-list"></div>
      </div>

      <div class="chart-row">
        <div class="chart-container full">
          <div class="chart-title">预留时间线</div>
          <div id="gantt-chart" style="height:300px;width:100%"></div>
        </div>
      </div>

      <div class="card">
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>预留ID</th>
                <th>客户</th>
                <th>节点</th>
                <th>GPU数量</th>
                <th>开始日期</th>
                <th>结束日期</th>
                <th>自动释放</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody id="resv-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  renderExpiring();
  renderTable();
  await initGantt();
  bindEvents();
  checkAutoRelease();
}

export function destroy() {
  if (ganttChart) { disposeChart('gantt-chart'); ganttChart = null; }
}

function renderExpiring() {
  const reservations = getState('reservations') || [];
  const customers = getState('customers') || [];
  const today = new Date('2026-04-28');
  const soonExpiring = reservations.filter(r => {
    if (r.status !== 'active') return false;
    const end = new Date(r.endDate);
    const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return daysLeft >= 0 && daysLeft <= 7;
  });

  const container = document.getElementById('expiring-list');
  const section = document.getElementById('expiring-section');
  if (!container) return;

  if (soonExpiring.length === 0) {
    if (section) section.style.display = 'none';
    return;
  }

  container.innerHTML = soonExpiring.map(r => {
    const customer = customers.find(c => c.id === r.customerId);
    const end = new Date(r.endDate);
    const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return `
      <div class="reservation-upcoming">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="alert-dot warning" style="width:8px;height:8px;border-radius:50%;background:var(--accent-yellow)"></span>
          <span class="text-sm"><strong>${customer?.name || r.customerId}</strong> 的预留 ${r.id} 将于 <strong>${daysLeft}天后</strong>到期，将释放 ${r.gpuCount} 个GPU</span>
          <button class="btn btn-ghost btn-sm" data-action="renew" data-id="${r.id}" style="margin-left:auto">续期</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderTable() {
  const reservations = getState('reservations') || [];
  const customers = getState('customers') || [];
  const nodes = getState('nodes') || [];
  const tbody = document.getElementById('resv-tbody');
  if (!tbody) return;

  tbody.innerHTML = reservations.map(r => {
    const customer = customers.find(c => c.id === r.customerId);
    return `
      <tr>
        <td class="text-sm">${r.id}</td>
        <td><strong>${customer?.name || r.customerId}</strong></td>
        <td>
          <div class="tag-list">
            ${r.nodeIds.map(nid => {
              const nd = nodes.find(n => n.id === nid);
              return `<span class="tag">${nd ? nd.name : nid}</span>`;
            }).join('')}
          </div>
        </td>
        <td>${r.gpuCount}</td>
        <td>${r.startDate}</td>
        <td>${r.endDate}</td>
        <td>${r.autoRelease ? '是' : '否'}</td>
        <td><span class="badge ${getStatusBadge(r.status)}">${getStatusLabel(r.status)}</span></td>
        <td class="table-actions">
          ${r.status === 'active' ? `
            <button class="btn btn-ghost btn-sm" data-action="edit" data-id="${r.id}">${icons.edit}</button>
            <button class="btn btn-ghost btn-sm" data-action="renew" data-id="${r.id}">续期</button>
            <button class="btn btn-danger btn-sm" data-action="cancel" data-id="${r.id}">取消</button>
          ` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

async function initGantt() {
  const reservations = getState('reservations') || [];
  const customers = getState('customers') || [];

  const colors = getColors();
  const today = new Date('2026-04-28');

  // Build gantt data
  const activeResvs = reservations.filter(r => r.status === 'active' || r.status === 'expired');
  const yAxisData = activeResvs.map(r => {
    const customer = customers.find(c => c.id === r.customerId);
    return `${r.id} (${customer?.name || ''})`;
  });

  const seriesData = activeResvs.map((r, i) => {
    const start = new Date(r.startDate);
    const end = new Date(r.endDate);
    const startDay = Math.round((start - new Date('2026-03-01')) / (1000 * 60 * 60 * 24));
    const duration = Math.round((end - start) / (1000 * 60 * 60 * 24));

    const isExpired = r.status === 'expired';
    const daysLeft = r.status === 'active' ? Math.ceil((end - today) / (1000 * 60 * 60 * 24)) : 0;
    const isExpiring = daysLeft > 0 && daysLeft <= 7;

    return {
      value: [startDay, startDay + duration, duration, r.id],
      itemStyle: {
        color: isExpired ? '#c0c4cc' : (isExpiring ? '#e6a23c' : colors[i % colors.length]),
      },
    };
  });

  // Generate month axis
  const months = [];
  for (let m = 3; m <= 12; m++) {
    months.push(`2026-${String(m).padStart(2, '0')}`);
  }

  ganttChart = await createChart('gantt-chart', {
    tooltip: {
      formatter: (p) => {
        const r = activeResvs[p.dataIndex];
        return `${r.id}<br/>开始: ${r.startDate}<br/>结束: ${r.endDate}<br/>GPU: ${r.gpuCount}`;
      },
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 365,
      axisLabel: {
        formatter: (v) => {
          const d = new Date('2026-03-01');
          d.setDate(d.getDate() + v);
          return `${d.getMonth() + 1}月`;
        },
      },
    },
    yAxis: { type: 'category', data: yAxisData, inverse: true },
    series: [{
      type: 'custom',
      renderItem: (params, api) => {
        const start = api.value(0);
        const end = api.value(1);
        const height = api.size([0, 1])[1] * 0.6;
        const y = api.coord([0, api.value(3) === undefined ? params.dataIndex : params.dataIndex])[1];

        const startCoord = api.coord([start, 0]);
        const endCoord = api.coord([end, 0]);

        return {
          type: 'rect',
          shape: { x: startCoord[0], y: y - height / 2, width: endCoord[0] - startCoord[0], height },
          style: api.style({ fill: seriesData[params.dataIndex].itemStyle.color }),
        };
      },
      data: seriesData,
      encode: { x: [0, 1], y: 0 },
    }],
    grid: { top: 10, right: 20, bottom: 30, left: 180 },
  });
}

function bindEvents() {
  document.getElementById('btn-new-resv')?.addEventListener('click', showNewResvModal);

  document.getElementById('resv-tbody')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    if (action === 'edit') showEditResvModal(id);
    if (action === 'renew') showRenewModal(id);
    if (action === 'cancel') cancelReservation(id);
  });

  document.getElementById('expiring-list')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="renew"]');
    if (btn) showRenewModal(btn.dataset.id);
  });
}

function showNewResvModal() {
  const customers = getState('customers') || [];
  const nodes = getState('nodes') || [];
  const onlineNodes = nodes.filter(n => n.status === 'online');

  openModal({
    title: '新建预留',
    wide: true,
    content: `
      <div class="form-group">
        <label class="form-label">客户</label>
        <select class="form-select" id="resv-customer">
          <option value="">请选择</option>
          ${customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">选择节点 (多选)</label>
        <div style="max-height:160px;overflow-y:auto;background:var(--bg-tertiary);border-radius:var(--radius);padding:var(--space-sm)">
          ${onlineNodes.map(n => `
            <label style="display:flex;align-items:center;gap:8px;padding:4px 8px;cursor:pointer">
              <input type="checkbox" value="${n.id}" class="resv-node-check">
              <span class="text-sm">${n.name} (${n.model}, ${n.gpuCount}GPU)</span>
            </label>
          `).join('')}
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">开始日期</label>
          <input type="date" class="form-input" id="resv-start" value="2026-05-01">
        </div>
        <div class="form-group">
          <label class="form-label">结束日期</label>
          <input type="date" class="form-input" id="resv-end" value="2026-08-01">
        </div>
      </div>
      <div class="form-group">
        <label class="form-switch">
          <input type="checkbox" id="resv-auto-release" checked>
          <span class="switch-track"></span>
          <span class="text-sm">到期自动释放</span>
        </label>
      </div>
    `,
    onConfirm: () => {
      const customerId = document.getElementById('resv-customer')?.value;
      if (!customerId) { showToast('请选择客户', 'warning'); return false; }

      const selectedNodes = [...document.querySelectorAll('.resv-node-check:checked')].map(cb => cb.value);
      if (selectedNodes.length === 0) { showToast('请选择至少一个节点', 'warning'); return false; }

      const startDate = document.getElementById('resv-start')?.value;
      const endDate = document.getElementById('resv-end')?.value;
      if (!startDate || !endDate) { showToast('请选择日期范围', 'warning'); return false; }

      const allNodes = getState('nodes') || [];
      const gpuCount = selectedNodes.reduce((s, nid) => {
        const nd = allNodes.find(n => n.id === nid);
        return s + (nd?.gpuCount || 0);
      }, 0);

      const reservations = getState('reservations') || [];
      reservations.push({
        id: generateId('resv'),
        customerId,
        nodeIds: selectedNodes,
        gpuCount,
        startDate,
        endDate,
        status: 'active',
        autoRelease: document.getElementById('resv-auto-release')?.checked ?? true,
      });
      setState('reservations', reservations);
      showToast('预留已创建', 'success');
      renderTable();
      renderExpiring();
      if (ganttChart) { disposeChart('gantt-chart'); ganttChart = null; }
      initGantt();
      return true;
    },
  });
}

function showEditResvModal(resvId) {
  const reservations = getState('reservations') || [];
  const r = reservations.find(rv => rv.id === resvId);
  if (!r) return;

  openModal({
    title: `编辑预留 - ${r.id}`,
    content: `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">开始日期</label>
          <input type="date" class="form-input" id="edit-resv-start" value="${r.startDate}">
        </div>
        <div class="form-group">
          <label class="form-label">结束日期</label>
          <input type="date" class="form-input" id="edit-resv-end" value="${r.endDate}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-switch">
          <input type="checkbox" id="edit-resv-auto-release" ${r.autoRelease ? 'checked' : ''}>
          <span class="switch-track"></span>
          <span class="text-sm">到期自动释放</span>
        </label>
      </div>
    `,
    onConfirm: () => {
      r.startDate = document.getElementById('edit-resv-start')?.value || r.startDate;
      r.endDate = document.getElementById('edit-resv-end')?.value || r.endDate;
      r.autoRelease = document.getElementById('edit-resv-auto-release')?.checked ?? r.autoRelease;
      setState('reservations', reservations);
      showToast('预留已更新', 'success');
      renderTable();
      renderExpiring();
      if (ganttChart) { disposeChart('gantt-chart'); ganttChart = null; }
      initGantt();
      return true;
    },
  });
}

function showRenewModal(resvId) {
  const reservations = getState('reservations') || [];
  const r = reservations.find(rv => rv.id === resvId);
  if (!r) return;

  const end = new Date(r.endDate);
  end.setMonth(end.getMonth() + 3);
  const newEnd = end.toISOString().slice(0, 10);

  openModal({
    title: `续期 - ${r.id}`,
    content: `
      <div class="form-group">
        <label class="form-label">当前结束日期</label>
        <div>${r.endDate}</div>
      </div>
      <div class="form-group">
        <label class="form-label">新结束日期</label>
        <input type="date" class="form-input" id="renew-end" value="${newEnd}">
      </div>
    `,
    onConfirm: () => {
      r.endDate = document.getElementById('renew-end')?.value || newEnd;
      r.status = 'active';
      setState('reservations', reservations);
      showToast('预留已续期', 'success');
      renderTable();
      renderExpiring();
      if (ganttChart) { disposeChart('gantt-chart'); ganttChart = null; }
      initGantt();
      return true;
    },
  });
}

function cancelReservation(resvId) {
  openModal({
    title: '确认取消',
    content: '<p>确定要取消该预留吗？预留的节点将被释放。</p>',
    onConfirm: () => {
      const reservations = getState('reservations') || [];
      const r = reservations.find(rv => rv.id === resvId);
      if (r) r.status = 'cancelled';
      setState('reservations', reservations);
      showToast('预留已取消', 'info');
      renderTable();
      renderExpiring();
      if (ganttChart) { disposeChart('gantt-chart'); ganttChart = null; }
      initGantt();
      return true;
    },
  });
}

function checkAutoRelease() {
  const reservations = getState('reservations') || [];
  const today = new Date('2026-04-28');
  let released = false;

  reservations.forEach(r => {
    if (r.status === 'active' && r.autoRelease) {
      const end = new Date(r.endDate);
      if (end < today) {
        r.status = 'expired';
        released = true;
      }
    }
  });

  if (released) {
    setState('reservations', reservations);
  }
}

export default { title, render, init, destroy };
