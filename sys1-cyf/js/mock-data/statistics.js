import { setState } from '../store.js';

const customerIds = ['customer-001', 'customer-002', 'customer-003', 'customer-004', 'customer-005', 'customer-006', 'customer-007', 'customer-008', 'customer-009', 'customer-010'];
const nodeIds = [];
for (let i = 1; i <= 36; i++) nodeIds.push(`node-${String(i).padStart(3, '0')}`);

const dailyStats = [];

for (let d = 30; d >= 0; d--) {
  const date = new Date(2026, 3, 28 - d);
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const nodeUtilization = {};
  nodeIds.forEach(id => {
    nodeUtilization[id] = 0.4 + Math.random() * 0.5;
  });

  const customerUsage = {};
  const prices = { 'customer-001': 50, 'customer-002': 50, 'customer-003': 55, 'customer-004': 50, 'customer-005': 60, 'customer-006': 55, 'customer-007': 60, 'customer-008': 55, 'customer-009': 60, 'customer-010': 50 };

  customerIds.forEach(id => {
    const gpuHours = 24 * (4 + Math.floor(Math.random() * 28));
    const tflopsHours = Math.round(gpuHours * (30 + Math.random() * 20));
    const cost = Math.round(gpuHours * (prices[id] || 50));
    customerUsage[id] = { gpuHours, tflopsHours, cost };
  });

  const totalRevenue = Object.values(customerUsage).reduce((sum, u) => sum + u.cost, 0);
  const utilValues = Object.values(nodeUtilization);
  const averageUtilization = utilValues.reduce((a, b) => a + b, 0) / utilValues.length;

  dailyStats.push({
    date: dateStr,
    nodeUtilization,
    customerUsage,
    totalRevenue,
    averageUtilization: Math.round(averageUtilization * 100) / 100,
    peakUtilization: Math.round(Math.max(...utilValues) * 100) / 100,
    taskCompletionRate: 0.88 + Math.random() * 0.1,
  });
}

// Hourly data for heatmap (last 24h)
const hourlyData = [];
for (let h = 0; h < 24; h++) {
  nodeIds.forEach((nodeId, idx) => {
    if (Math.random() > 0.6) return;
    hourlyData.push([h, idx, Math.round((0.3 + Math.random() * 0.65) * 100)]);
  });
}

setState('dailyStats', dailyStats);
setState('hourlyData', hourlyData);
