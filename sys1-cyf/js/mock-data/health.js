import { setState } from '../store.js';

const healthData = [];
const alerts = [];

// Generate health data for 36 nodes
for (let i = 1; i <= 36; i++) {
  const nodeId = `node-${String(i).padStart(3, '0')}`;
  const isFault = i > 34;
  const isMaint = i > 31 && i <= 34;
  const isWarning = [3, 5, 8, 12, 18].includes(i);

  const gpuTemp = isFault ? 95 + Math.random() * 10 : (isWarning ? 80 + Math.random() * 10 : 55 + Math.random() * 20);
  const cpuTemp = isFault ? 85 + Math.random() * 10 : (isWarning ? 70 + Math.random() * 10 : 45 + Math.random() * 20);
  const cpuLoad = isFault ? 0.95 : (isWarning ? 0.8 + Math.random() * 0.15 : 0.2 + Math.random() * 0.6);
  const memoryUsage = isFault ? 0.98 : (isWarning ? 0.75 + Math.random() * 0.15 : 0.3 + Math.random() * 0.4);
  const diskUsage = 0.2 + Math.random() * 0.5;
  const gpuMemoryUsage = isFault ? 0.99 : (isWarning ? 0.85 + Math.random() * 0.1 : 0.3 + Math.random() * 0.5);

  const nodeAlerts = [];
  if (gpuTemp > 85) {
    nodeAlerts.push({ level: 'critical', message: `GPU温度异常 ${gpuTemp.toFixed(0)}°C`, time: '10:23' });
    alerts.push({ nodeId, level: 'critical', message: `GPU温度异常 ${gpuTemp.toFixed(0)}°C`, time: `2026-04-28 10:${String(15 + i).padStart(2, '0')}` });
  }
  if (cpuLoad > 0.9) {
    nodeAlerts.push({ level: 'warning', message: `CPU负载过高 ${(cpuLoad * 100).toFixed(0)}%`, time: '09:45' });
    alerts.push({ nodeId, level: 'warning', message: `CPU负载过高 ${(cpuLoad * 100).toFixed(0)}%`, time: `2026-04-28 09:${String(30 + i).padStart(2, '0')}` });
  }

  healthData.push({
    nodeId,
    timestamp: '2026-04-28 10:00:00',
    gpuTemp: Math.round(gpuTemp),
    cpuTemp: Math.round(cpuTemp),
    cpuLoad: Math.round(cpuLoad * 100) / 100,
    memoryUsage: Math.round(memoryUsage * 100) / 100,
    diskUsage: Math.round(diskUsage * 100) / 100,
    gpuMemoryUsage: Math.round(gpuMemoryUsage * 100) / 100,
    powerConsumption: `${(500 + Math.random() * 600).toFixed(0)}W`,
    networkLatency: `${(0.1 + Math.random() * 2).toFixed(1)}ms`,
    errorCount: isFault ? Math.floor(Math.random() * 50) : (isWarning ? Math.floor(Math.random() * 5) : 0),
    alerts: nodeAlerts,
    healthStatus: isFault ? 'fault' : (isWarning ? 'warning' : 'healthy'),
  });
}

setState('healthData', healthData);
setState('alerts', alerts);
