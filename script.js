// 模拟实时性能数据
function generatePerformanceData() {
    return {
        gpu: Math.floor(Math.random() * 100),
        cpu: Math.floor(Math.random() * 100),
    };
}

// 更新Chart.js图表
function updateCharts(gpuChart, cpuChart) {
    const data = generatePerformanceData();

    if (gpuChart.data.labels.length > 20) {
        gpuChart.data.labels.shift();
        gpuChart.data.datasets[0].data.shift();
        cpuChart.data.datasets[0].data.shift();
    }

    const timeLabel = new Date().toLocaleTimeString();
    gpuChart.data.labels.push(timeLabel);
    gpuChart.data.datasets[0].data.push(data.gpu);
    cpuChart.data.labels.push(timeLabel);
    cpuChart.data.datasets[0].data.push(data.cpu);

    gpuChart.update();
    cpuChart.update();

    updateBottlenecks(data);
    updateAlerts(data);
}

// 初始化Chart.js
const ctxGpu = document.getElementById('gpuChart').getContext('2d');
const ctxCpu = document.getElementById('cpuChart').getContext('2d');

const gpuChart = new Chart(ctxGpu, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'GPU利用率 (%)',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true
        }]
    },
    options: {responsive: true, animation: false}
});

const cpuChart = new Chart(ctxCpu, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'CPU利用率 (%)',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true
        }]
    },
    options: {responsive: true, animation: false}
});

// 模拟性能瓶颈
function updateBottlenecks(data) {
    const list = document.getElementById('bottleneckList');
    list.innerHTML = '';
    if (data.gpu > 80) list.innerHTML += '<li>GPU利用率过高，可能出现瓶颈</li>';
    if (data.cpu > 75) list.innerHTML += '<li>CPU负载高，可能影响任务性能</li>';
    if (data.gpu < 20 && data.cpu < 20) list.innerHTML += '<li>当前性能良好，无明显瓶颈</li>';
}

// 模拟优化建议
function updateOptimizationList() {
    const suggestions = [
        '优化任务并行策略',
        '增加网络带宽',
        '调整GPU分配',
        '清理内存缓存'
    ];
    const list = document.getElementById('optimizationList');
    list.innerHTML = '';
    suggestions.forEach(s => {
        const li = document.createElement('li');
        li.textContent = s;
        list.appendChild(li);
    });
}

// 模拟一键优化
document.getElementById('optimizeBtn').addEventListener('click', () => {
    alert('已模拟执行优化操作，性能指标将改善');
});

// 模拟任务性能表格
function generateTaskData() {
    const tbody = document.getElementById('taskTable');
    tbody.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>TASK${i}</td>
            <td>${(Math.random()*5+1).toFixed(2)} iter/s</td>
            <td>${Math.floor(Math.random()*100)}%</td>
            <td>${Math.floor(Math.random()*10)} ms</td>
        `;
        tbody.appendChild(tr);
    }
}

// 模拟性能告警
function updateAlerts(data) {
    const alerts = document.getElementById('alertList');
    alerts.innerHTML = '';
    if (data.gpu > 90) alerts.innerHTML += '<li style="color:red">GPU过载告警！</li>';
    if (data.cpu > 90) alerts.innerHTML += '<li style="color:red">CPU过载告警！</li>';
}

// 初始化
updateOptimizationList();
generateTaskData();
setInterval(() => {
    updateCharts(gpuChart, cpuChart);
    generateTaskData();
}, 2000);