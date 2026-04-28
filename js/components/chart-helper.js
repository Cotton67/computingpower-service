const chartInstances = [];

const darkTheme = {
  backgroundColor: 'transparent',
  textStyle: { color: '#9ca3af' },
  legend: { textStyle: { color: '#9ca3af' } },
  tooltip: {
    backgroundColor: '#1a1d27',
    borderColor: '#2a2d3a',
    textStyle: { color: '#e4e6eb', fontSize: 12 },
  },
  grid: {
    top: 40,
    right: 20,
    bottom: 30,
    left: 50,
    containLabel: true,
  },
  xAxis: {
    axisLine: { lineStyle: { color: '#2a2d3a' } },
    axisLabel: { color: '#9ca3af' },
    splitLine: { lineStyle: { color: '#1f2937' } },
  },
  yAxis: {
    axisLine: { lineStyle: { color: '#2a2d3a' } },
    axisLabel: { color: '#9ca3af' },
    splitLine: { lineStyle: { color: '#1f2937' } },
  },
};

const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'];

function waitForEcharts(timeout = 10000) {
  return new Promise((resolve) => {
    if (typeof echarts !== 'undefined') return resolve(true);
    const start = Date.now();
    const check = setInterval(() => {
      if (typeof echarts !== 'undefined') { clearInterval(check); resolve(true); }
      else if (Date.now() - start > timeout) { clearInterval(check); resolve(false); }
    }, 100);
  });
}

export async function createChart(containerId, option) {
  const loaded = await waitForEcharts();
  if (!loaded) {
    console.error('ECharts 加载超时，图表无法渲染');
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted)">图表加载失败</div>';
    return null;
  }

  const container = document.getElementById(containerId);
  if (!container) return null;

  // 确保容器有明确宽度
  container.style.width = '100%';

  const chart = echarts.init(container, null, { renderer: 'canvas' });
  chartInstances.push({ id: containerId, chart });

  const mergedOption = mergeDeep({}, darkTheme, option);
  chart.setOption(mergedOption);

  // 延迟 resize 确保布局已完成
  setTimeout(() => { try { chart.resize(); } catch(e) {} }, 50);

  return chart;
}

export function updateChart(containerId, option) {
  const entry = chartInstances.find(c => c.id === containerId);
  if (entry) {
    entry.chart.setOption(option);
  }
}

export function disposeChart(containerId) {
  const idx = chartInstances.findIndex(c => c.id === containerId);
  if (idx !== -1) {
    try { chartInstances[idx].chart.dispose(); } catch(e) {}
    chartInstances.splice(idx, 1);
  }
}

export function disposeAllCharts() {
  chartInstances.forEach(({ chart }) => { try { chart.dispose(); } catch(e) {} });
  chartInstances.length = 0;
}

export function getColors() { return colors; }

export function resizeAll() {
  chartInstances.forEach(({ chart }) => {
    try { chart.resize(); } catch(e) {}
  });
}

window.addEventListener('resize', () => {
  resizeAll();
});

function mergeDeep(target, ...sources) {
  for (const src of sources) {
    if (!src || typeof src !== 'object') continue;
    for (const key of Object.keys(src)) {
      if (src[key] && typeof src[key] === 'object' && !Array.isArray(src[key])) {
        target[key] = target[key] || {};
        mergeDeep(target[key], src[key]);
      } else {
        target[key] = src[key];
      }
    }
  }
  return target;
}
