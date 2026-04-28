import { getState } from '../store.js';
import { formatPercent, formatNumber, icons } from '../utils.js';
import { createChart, disposeChart, getColors } from '../components/chart-helper.js';
import { showToast } from '../components/toast.js';

let charts = {};
let currentPeriod = 'week';
let currentView = 'customer';

export const title = '资源使用统计分析';

export function render() {
  return `
    <div class="module-page">
      <div class="toolbar">
        <h2>资源使用统计分析</h2>
        <div class="toolbar-right">
          <div class="period-selector" id="period-selector">
            <button data-period="day">日</button>
            <button data-period="week" class="active">周</button>
            <button data-period="month">月</button>
          </div>
          <button class="btn btn-ghost" id="btn-export">导出报告</button>
        </div>
      </div>

      <div class="stat-cards">
        <div class="stat-card">
          <div class="stat-card-label">总收入</div>
          <div class="stat-card-value blue" id="stat-revenue">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">GPU总使用时长</div>
          <div class="stat-card-value green" id="stat-gpu-hours">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">平均利用率</div>
          <div class="stat-card-value yellow" id="stat-avg-util">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">任务完成率</div>
          <div class="stat-card-value purple" id="stat-completion">--</div>
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-container full">
          <div class="chart-title">收入趋势</div>
          <div id="revenue-chart" style="height:260px;width:100%"></div>
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-container">
          <div class="chart-title">客户使用排行</div>
          <div id="customer-rank-chart" style="height:300px;width:100%"></div>
        </div>
        <div class="chart-container">
          <div class="chart-title">节点利用率热力图</div>
          <div id="heatmap-chart" style="height:300px;width:100%"></div>
        </div>
      </div>

      <div class="card">
        <div class="toolbar" style="margin-bottom:0">
          <h3 class="section-title" style="margin:0">详细统计</h3>
          <div class="view-toggle" id="view-toggle">
            <button data-view="customer" class="active">按客户</button>
            <button data-view="node">按节点</button>
          </div>
        </div>
        <div style="overflow-x:auto">
          <table>
            <thead id="stats-thead"></thead>
            <tbody id="stats-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  updateStats();
  await initRevenueChart();
  await initCustomerRankChart();
  await initHeatmap();
  renderDetailTable();
  bindEvents();
}

export function destroy() {
  Object.keys(charts).forEach(id => disposeChart(id));
  charts = {};
}

function getPeriodData() {
  const dailyStats = getState('dailyStats') || [];
  if (currentPeriod === 'day') return dailyStats.slice(-1);
  if (currentPeriod === 'week') return dailyStats.slice(-7);
  return dailyStats.slice(-30);
}

function updateStats() {
  const data = getPeriodData();
  const totalRevenue = data.reduce((s, d) => s + d.totalRevenue, 0);
  const gpuHours = data.reduce((s, d) => {
    return s + Object.values(d.customerUsage).reduce((ss, u) => ss + u.gpuHours, 0);
  }, 0);
  const avgUtil = data.length > 0 ? data.reduce((s, d) => s + d.averageUtilization, 0) / data.length : 0;
  const completion = data.length > 0 ? data.reduce((s, d) => s + d.taskCompletionRate, 0) / data.length : 0;

  const revEl = document.getElementById('stat-revenue');
  const gpuEl = document.getElementById('stat-gpu-hours');
  const utilEl = document.getElementById('stat-avg-util');
  const compEl = document.getElementById('stat-completion');

  if (revEl) revEl.textContent = `${formatNumber(totalRevenue)}元`;
  if (gpuEl) gpuEl.textContent = formatNumber(gpuHours);
  if (utilEl) utilEl.textContent = formatPercent(avgUtil);
  if (compEl) compEl.textContent = formatPercent(completion);
}

async function initRevenueChart() {
  const data = getPeriodData();
  const dates = data.map(d => d.date.slice(5));
  const revenues = data.map(d => d.totalRevenue);
  const utils = data.map(d => Math.round(d.averageUtilization * 100));

  charts.revenue = await createChart('revenue-chart', {
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0, textStyle: { color: '#9ca3af' } },
    xAxis: { type: 'category', data: dates },
    yAxis: [
      { type: 'value', name: '收入(元)', nameTextStyle: { color: '#9ca3af' } },
      { type: 'value', name: '利用率(%)', max: 100, nameTextStyle: { color: '#9ca3af' } },
    ],
    series: [
      {
        name: '收入',
        type: 'bar',
        data: revenues,
        itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] },
        barWidth: currentPeriod === 'day' ? 40 : undefined,
      },
      {
        name: '利用率',
        type: 'line',
        yAxisIndex: 1,
        data: utils,
        smooth: true,
        lineStyle: { color: '#f59e0b' },
        itemStyle: { color: '#f59e0b' },
      },
    ],
    grid: { top: 30, right: 60, bottom: 40, left: 70 },
  });
}

async function initCustomerRankChart() {
  const customers = getState('customers') || [];
  const data = getPeriodData();
  const customerTotals = {};

  customers.forEach(c => { customerTotals[c.id] = { name: c.name, gpuHours: 0, tflopsHours: 0, cost: 0 }; });

  data.forEach(d => {
    Object.entries(d.customerUsage).forEach(([cid, u]) => {
      if (customerTotals[cid]) {
        customerTotals[cid].gpuHours += u.gpuHours;
        customerTotals[cid].tflopsHours += u.tflopsHours;
        customerTotals[cid].cost += u.cost;
      }
    });
  });

  const sorted = Object.values(customerTotals).sort((a, b) => b.cost - a.cost).slice(0, 10);
  const names = sorted.map(c => c.name);
  const costs = sorted.map(c => c.cost);

  charts.customerRank = await createChart('customer-rank-chart', {
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: names, inverse: true },
    series: [{
      type: 'bar',
      data: costs.map((v, i) => ({
        value: v,
        itemStyle: { color: getColors()[i % getColors().length] },
      })),
      label: { show: true, position: 'right', formatter: '{c}元', color: '#e4e6eb', fontSize: 11 },
    }],
    grid: { top: 10, right: 80, bottom: 10, left: 80 },
  });
}

async function initHeatmap() {
  const nodes = getState('nodes') || [];
  const hourlyData = getState('hourlyData') || [];
  const onlineNodes = nodes.filter(n => n.status === 'online').slice(0, 20);
  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
  const nodeNames = onlineNodes.map(n => n.name);

  charts.heatmap = await createChart('heatmap-chart', {
    tooltip: {
      formatter: (p) => `${nodeNames[p.value[1]]} ${hours[p.value[0]]}<br/>利用率: ${p.value[2]}%`,
    },
    xAxis: { type: 'category', data: hours, splitArea: { show: true } },
    yAxis: { type: 'category', data: nodeNames, splitArea: { show: true } },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: { color: ['#0f1117', '#1e3a5f', '#3b82f6', '#f59e0b', '#ef4444'] },
      textStyle: { color: '#9ca3af' },
    },
    series: [{
      type: 'heatmap',
      data: hourlyData,
      label: { show: false },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } },
    }],
    grid: { top: 10, right: 20, bottom: 50, left: 100 },
  });
}

function renderDetailTable() {
  const thead = document.getElementById('stats-thead');
  const tbody = document.getElementById('stats-tbody');
  if (!thead || !tbody) return;

  const data = getPeriodData();
  const customers = getState('customers') || [];
  const nodes = getState('nodes') || [];

  if (currentView === 'customer') {
    thead.innerHTML = '<tr><th>客户名称</th><th>GPU时长</th><th>TFLOPS时长</th><th>费用</th><th>占比</th></tr>';

    const customerTotals = {};
    customers.forEach(c => { customerTotals[c.id] = { name: c.name, gpuHours: 0, tflopsHours: 0, cost: 0 }; });
    let totalCost = 0;
    data.forEach(d => {
      Object.entries(d.customerUsage).forEach(([cid, u]) => {
        if (customerTotals[cid]) {
          customerTotals[cid].gpuHours += u.gpuHours;
          customerTotals[cid].tflopsHours += u.tflopsHours;
          customerTotals[cid].cost += u.cost;
          totalCost += u.cost;
        }
      });
    });

    const sorted = Object.values(customerTotals).sort((a, b) => b.cost - a.cost);
    tbody.innerHTML = sorted.map(c => `
      <tr>
        <td><strong>${c.name}</strong></td>
        <td>${formatNumber(c.gpuHours)}</td>
        <td>${formatNumber(c.tflopsHours)}</td>
        <td>${formatNumber(c.cost)}元</td>
        <td>${totalCost > 0 ? (c.cost / totalCost * 100).toFixed(1) : 0}%</td>
      </tr>
    `).join('');
  } else {
    thead.innerHTML = '<tr><th>节点名称</th><th>数据中心</th><th>平均利用率</th><th>峰值利用率</th><th>运行任务数</th></tr>';

    const nodeStats = nodes.filter(n => n.status === 'online').map(n => {
      const utils = data.map(d => d.nodeUtilization[n.id] || 0).filter(Boolean);
      const avg = utils.length > 0 ? utils.reduce((a, b) => a + b, 0) / utils.length : 0;
      const peak = utils.length > 0 ? Math.max(...utils) : 0;
      return { ...n, avgUtil: avg, peakUtil: peak };
    }).sort((a, b) => b.avgUtil - a.avgUtil);

    tbody.innerHTML = nodeStats.map(n => `
      <tr>
        <td><strong>${n.name}</strong></td>
        <td>${n.datacenter}</td>
        <td>${formatPercent(n.avgUtil)}</td>
        <td>${formatPercent(n.peakUtil)}</td>
        <td>${n.tasks?.length || 0}</td>
      </tr>
    `).join('');
  }
}

function bindEvents() {
  document.getElementById('period-selector')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-period]');
    if (!btn) return;
    currentPeriod = btn.dataset.period;
    document.querySelectorAll('#period-selector button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateStats();
    disposeChart('revenue-chart');
    disposeChart('customer-rank-chart');
    initRevenueChart();
    initCustomerRankChart();
    renderDetailTable();
  });

  document.getElementById('view-toggle')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-view]');
    if (!btn) return;
    currentView = btn.dataset.view;
    document.querySelectorAll('#view-toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDetailTable();
  });

  document.getElementById('btn-export')?.addEventListener('click', () => {
    showToast('报告已生成（模拟）', 'success');
  });
}

export default { title, render, init, destroy };
