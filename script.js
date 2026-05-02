const pageMeta = {
  dashboard: ["性能监测驾驶舱", "面向运维人员的一站式算力性能监测、诊断与优化平台。"],
  realtime: ["实时性能监测", "实时监测 GPU、CPU、内存、网络带宽等核心性能指标。"],
  diagnosis: ["性能瓶颈诊断", "自动识别性能瓶颈并生成诊断报告。"],
  optimization: ["算力优化建议", "针对瓶颈提供可落地的优化建议。"],
  task: ["任务性能分析", "分析训练/推理任务运行性能。"],
  history: ["历史性能统计", "按时间段统计集群性能变化规律。"],
  alarm: ["性能告警管理", "管理性能阈值、异常告警和处理状态。"],
  calibration: ["硬件性能校准", "对比标称性能与实际性能。"],
  tracking: ["优化效果跟踪", "记录优化操作后的性能变化。"],
  benchmark: ["行业性能对标", "对比行业标准算力性能数据。"]
};

let charts = [];
let currentPage = "dashboard";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function destroyCharts() {
  charts.forEach((chart) => chart.destroy());
  charts = [];
}

function notify(message) {
  window.alert(message);
}

function getEl(id) {
  return document.getElementById(id);
}

function chartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#5f7488" } }
    },
    scales: {
      x: { ticks: { color: "#7b8fa3" }, grid: { color: "#edf3f8" } },
      y: { ticks: { color: "#7b8fa3" }, grid: { color: "#edf3f8" } }
    }
  };
}

function canRenderChart(canvasId) {
  const canvas = getEl(canvasId);
  if (!canvas) return null;
  if (!window.Chart) {
    const wrap = canvas.closest(".chart-wrap");
    if (wrap) {
      wrap.innerHTML = '<div class="chart-fallback">图表组件加载失败，请确认网络可访问 Chart.js CDN。</div>';
    }
    return null;
  }
  return canvas;
}

function openPage(page) {
  const pageContainer = getEl("pageContainer");
  const pageTitle = getEl("pageTitle");
  const pageDesc = getEl("pageDesc");
  const template = getEl(`${page}Page`);

  if (!pageContainer || !pageTitle || !pageDesc || !template || !pageMeta[page]) {
    console.warn(`页面 ${page} 不存在`);
    return;
  }

  currentPage = page;
  destroyCharts();
  $$(".menu-item").forEach((button) => button.classList.toggle("active", button.dataset.page === page));
  pageContainer.innerHTML = template.innerHTML;
  pageTitle.textContent = pageMeta[page][0];
  pageDesc.textContent = pageMeta[page][1];

  bindJumpLinks();

  if (page === "realtime") {
    renderRealtime();
    renderNodes();
  }
  if (page === "diagnosis") {
    renderDiagnosisChart();
    renderDiagnosisTable();
  }
  if (page === "optimization") {
    bindOptimize();
    renderOptTable();
  }
  if (page === "task") renderTasks();
  if (page === "history") {
    renderHistory();
    renderHistoryTable();
  }
  if (page === "alarm") renderAlarms();
  if (page === "calibration") {
    renderCalibration();
    renderCalTable();
  }
  if (page === "tracking") renderTrackTable();
}

function bindJumpLinks() {
  $$('[data-jump]').forEach((element) => {
    element.addEventListener("click", () => openPage(element.dataset.jump));
  });
}

function renderRealtime() {
  const canvas = canRenderChart("realtimeChart");
  if (!canvas) return;

  charts.push(new Chart(canvas, {
    type: "line",
    data: {
      labels: ["09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00"],
      datasets: [
        { label: "GPU利用率", data: [76, 81, 84, 79, 88, 86, 82], borderColor: "#1689e8", backgroundColor: "rgba(22,137,232,.12)", fill: true, tension: .35 },
        { label: "CPU负载", data: [58, 62, 65, 59, 66, 63, 61], borderColor: "#39c76c", backgroundColor: "rgba(57,199,108,.1)", fill: true, tension: .35 },
        { label: "内存占用", data: [64, 66, 67, 69, 72, 70, 68], borderColor: "#ff9f1a", backgroundColor: "rgba(255,159,26,.1)", fill: true, tension: .35 }
      ]
    },
    options: chartOptions()
  }));
}

function renderDiagnosisChart() {
  const canvas = canRenderChart("diagnosisChart");
  if (!canvas) return;

  charts.push(new Chart(canvas, {
    type: "line",
    data: {
      labels: ["09:00", "09:20", "09:40", "10:00", "10:20", "10:40"],
      datasets: [
        { label: "通信耗时占比", data: [8.2, 9.4, 10.1, 11.8, 10.6, 9.7], borderColor: "#e64b58", backgroundColor: "rgba(230,75,88,.1)", fill: true, tension: .35 },
        { label: "显存占用", data: [78, 83, 87, 91, 88, 85], borderColor: "#ff9f1a", backgroundColor: "rgba(255,159,26,.1)", fill: true, tension: .35 },
        { label: "CPU等待比例", data: [12, 14, 16, 18, 15, 13], borderColor: "#1689e8", backgroundColor: "rgba(22,137,232,.1)", fill: true, tension: .35 }
      ]
    },
    options: chartOptions()
  }));
}

function renderHistory() {
  const canvas = canRenderChart("historyChart");
  if (!canvas) return;

  charts.push(new Chart(canvas, {
    type: "bar",
    data: {
      labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      datasets: [
        { label: "GPU平均利用率", data: [78, 81, 85, 83, 88, 86, 84], backgroundColor: "#1689e8" },
        { label: "任务完成效率", data: [70, 74, 76, 80, 83, 85, 87], backgroundColor: "#39c76c" }
      ]
    },
    options: chartOptions()
  }));
}

function renderCalibration() {
  const canvas = canRenderChart("calibrationChart");
  if (!canvas) return;

  charts.push(new Chart(canvas, {
    type: "radar",
    data: {
      labels: ["单卡算力", "显存带宽", "网络吞吐", "CPU调度", "存储IO", "稳定性"],
      datasets: [
        { label: "实际性能", data: [94, 89, 92, 86, 90, 96], borderColor: "#1689e8", backgroundColor: "rgba(22,137,232,.16)" },
        { label: "目标性能", data: [100, 100, 100, 100, 100, 100], borderColor: "#ff9f1a", backgroundColor: "rgba(255,159,26,.08)" }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: "#5f7488" } } },
      scales: {
        r: {
          pointLabels: { color: "#5f7488" },
          ticks: { backdropColor: "transparent", color: "#7b8fa3" },
          grid: { color: "#edf3f8" },
          angleLines: { color: "#edf3f8" },
          min: 0,
          max: 100
        }
      }
    }
  }));
}

function renderTasks() {
  const taskTable = getEl("taskTable");
  if (!taskTable) return;

  const names = ["图像识别训练", "大模型微调", "批量推理", "语音识别训练", "向量检索构建"];
  const customers = ["星河智能", "云启科技", "天枢实验室", "蓝海算法", "智算客户A"];

  taskTable.innerHTML = Array.from({ length: 8 }).map((_, index) => {
    const usage = Math.floor(Math.random() * 32) + 62;
    const latency = (Math.random() * 9 + 3).toFixed(1);
    const warning = usage > 88 || Number(latency) > 10;
    const suggestion = Number(latency) > 10 ? "优化通信" : usage < 70 ? "迁移任务" : "保持策略";

    return `<tr>
      <td>TASK-${20260428 + index}</td>
      <td>${customers[index % customers.length]}</td>
      <td>${names[index % names.length]}</td>
      <td>${[4, 8, 16, 32][index % 4]}卡</td>
      <td>${(Math.random() * 6 + 2).toFixed(2)} iter/s</td>
      <td>${usage}%</td>
      <td>${latency} ms</td>
      <td>${suggestion}</td>
      <td><span class="status ${warning ? "warning" : "running"}">${warning ? "需优化" : "运行中"}</span></td>
    </tr>`;
  }).join("");
}

function renderAlarms() {
  const alarmTable = getEl("alarmTable");
  if (!alarmTable) return;

  const data = [
    ["10:12:31", "NODE-A17", "网络延迟过高", "6.3 μs", "≥5 μs", "高", "处理中"],
    ["10:08:14", "GPU-B300-08", "显存占用过高", "91%", "≥90%", "中", "待处理"],
    ["09:56:02", "NODE-C02", "GPU利用率过低", "24%", "≤30%", "低", "已通知"],
    ["09:43:45", "NODE-B11", "CPU负载过高", "89%", "≥85%", "中", "处理中"]
  ];

  alarmTable.innerHTML = data.map((item) => `<tr>
    <td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td><td>${item[3]}</td><td>${item[4]}</td><td>${item[5]}</td>
    <td><span class="status ${item[5] === "高" ? "danger" : item[5] === "中" ? "warning" : "running"}">${item[6]}</span></td>
  </tr>`).join("");
}

function renderNodes() {
  const nodeTable = getEl("nodeTable");
  if (!nodeTable) return;

  const data = [
    ["B300-A01", "B300 8卡", "82%", "71%", "63%", "810Gbps", "正常"],
    ["B300-A17", "B300 8卡", "91%", "88%", "74%", "760Gbps", "高负载"],
    ["H200-B06", "H200 8卡", "57%", "49%", "52%", "620Gbps", "正常"],
    ["H200-C02", "H200 4卡", "24%", "35%", "41%", "510Gbps", "低利用"]
  ];

  nodeTable.innerHTML = data.map((item) => `<tr>
    <td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td><td>${item[3]}</td><td>${item[4]}</td><td>${item[5]}</td>
    <td><span class="status ${item[6] === "正常" ? "running" : item[6] === "高负载" ? "warning" : "danger"}">${item[6]}</span></td>
  </tr>`).join("");
}

function renderDiagnosisTable() {
  const diagnosisTable = getEl("diagnosisTable");
  if (!diagnosisTable) return;

  const data = [
    ["10:12", "NODE-A17", "网络通信瓶颈", "训练任务 3 个", "检查 RDMA / 交换机队列", "处理中"],
    ["10:08", "TASK-0428-03", "显存占用偏高", "B300-A17", "开启混合精度", "待处理"],
    ["09:56", "H200-C02", "GPU利用率过低", "推理池", "迁移低负载任务", "已通知"],
    ["09:40", "TASK-0428-07", "CPU调度滞后", "数据预处理", "增加加载线程", "已完成"]
  ];

  diagnosisTable.innerHTML = data.map((item) => `<tr>
    <td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td><td>${item[3]}</td><td>${item[4]}</td>
    <td><span class="status ${item[5] === "已完成" ? "running" : item[5] === "处理中" ? "warning" : "danger"}">${item[5]}</span></td>
  </tr>`).join("");
}

function renderOptTable() {
  const optTable = getEl("optTable");
  if (!optTable) return;

  const data = [
    ["OPT-001", "NODE-A17", "网络链路复测", "延迟降低 1.2μs", "运维A", "60%"],
    ["OPT-002", "TASK-0428-03", "开启混合精度", "显存释放 12%", "运维B", "30%"],
    ["OPT-003", "H200-C02", "任务迁移", "GPU利用率提升 18%", "运维A", "80%"]
  ];

  optTable.innerHTML = data.map((item) => `<tr><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td><td>${item[3]}</td><td>${item[4]}</td><td>${item[5]}</td></tr>`).join("");
}

function renderHistoryTable() {
  const historyTable = getEl("historyTable");
  if (!historyTable) return;

  const data = [
    ["集群周报", "近7天", "B300/H200", "2026-04-28 10:20", "查看"],
    ["任务性能月报", "近30天", "全部节点", "2026-04-27 18:00", "查看"],
    ["网络延迟统计", "今日", "训练池", "2026-04-28 09:30", "查看"]
  ];

  historyTable.innerHTML = data.map((item) => `<tr><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td><td>${item[3]}</td><td><span class="status running">${item[4]}</span></td></tr>`).join("");
}

function renderCalTable() {
  const calTable = getEl("calTable");
  if (!calTable) return;

  const data = [
    ["GPU-B300-08", "单卡算力/显存带宽", "明日 10:00", "运维A", "待执行"],
    ["NODE-A17", "网络吞吐/稳定性", "明日 14:00", "运维B", "待执行"],
    ["GPU-H200-12", "全项复测", "后天 09:30", "运维C", "已安排"]
  ];

  calTable.innerHTML = data.map((item) => `<tr><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td><td>${item[3]}</td><td><span class="status warning">${item[4]}</span></td></tr>`).join("");
}

function renderTrackTable() {
  const trackTable = getEl("trackTable");
  if (!trackTable) return;

  const data = [
    ["10:20", "NODE-A17", "网络配置优化", "延迟 6.3μs", "延迟 4.9μs", "明显改善"],
    ["09:50", "TASK-0428-03", "混合精度训练", "显存 91%", "显存 78%", "已达标"],
    ["09:10", "H200-C02", "任务迁移", "GPU 24%", "GPU 61%", "利用率提升"]
  ];

  trackTable.innerHTML = data.map((item) => `<tr><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td><td>${item[3]}</td><td>${item[4]}</td><td><span class="status running">${item[5]}</span></td></tr>`).join("");
}

function bindOptimize() {
  const button = getEl("quickOptimize");
  const status = getEl("quickStatus");

  if (!button || !status) return;
  button.addEventListener("click", () => {
    status.textContent = "已优化";
    status.style.color = "#17a662";
    notify("已模拟执行优化，性能指标已记录到优化效果跟踪。");
  });
}

function init() {
  const menu = getEl("menu");
  const refreshBtn = getEl("refreshBtn");

  if (menu) {
    menu.addEventListener("click", (event) => {
      const button = event.target.closest(".menu-item");
      if (button) openPage(button.dataset.page);
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      openPage(currentPage);
      notify("已刷新模拟数据。");
    });
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".product-card button,.diag-card button");
    if (!button || button.id === "quickOptimize") return;
    notify("当前为前端原型，已模拟提交操作。");
  });

  openPage("dashboard");
}

document.addEventListener("DOMContentLoaded", init);
