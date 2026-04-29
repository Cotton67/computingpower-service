import { setState } from '../store.js';

const datacenters = ['北京数据中心', '上海数据中心', '广州数据中心'];
const models = ['NVIDIA A100 80GB', 'NVIDIA H100 80GB', 'NVIDIA V100 32GB', 'NVIDIA RTX 4090'];
const racks = ['A12', 'A13', 'B05', 'B06', 'C01', 'C02'];
const statuses = ['online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'offline', 'maintenance', 'fault'];

const customers = ['customer-001', 'customer-002', 'customer-003', null, null, 'customer-004', null, 'customer-005', 'customer-001', null, null, 'customer-006'];

const nodes = [];
for (let i = 1; i <= 36; i++) {
  const dcIdx = i <= 14 ? 0 : (i <= 26 ? 1 : 2);
  const rackIdx = (i - 1) % 6;
  const modelIdx = i <= 8 ? 0 : (i <= 16 ? 1 : (i <= 24 ? 2 : 3));
  const statusIdx = i <= 30 ? (i <= 28 ? 1 : 12) : (i <= 33 ? 13 : 14);
  const gpuCount = [8, 8, 4, 4][modelIdx];
  const tflops = [312, 495, 125, 82.6][modelIdx];

  nodes.push({
    id: `node-${String(i).padStart(3, '0')}`,
    name: `${['BJ', 'SH', 'GZ'][dcIdx]}-${racks[rackIdx]}-R${String(Math.ceil(((i - 1) % 6 + 1) / 2)).padStart(2, '0')}-N${((i - 1) % 2) + 1}`,
    datacenter: datacenters[dcIdx],
    rack: racks[rackIdx],
    model: models[modelIdx],
    gpuCount,
    totalTFLOPS: tflops,
    cpuCores: gpuCount === 8 ? 128 : 64,
    memory: gpuCount === 8 ? '1024GB' : '512GB',
    storage: gpuCount === 8 ? '16TB NVMe' : '8TB NVMe',
    status: statuses[statusIdx] || 'online',
    gpuUtilization: statuses[statusIdx] === 'online' ? 0.3 + Math.random() * 0.65 : (statuses[statusIdx] === 'fault' ? 0 : Math.random() * 0.3),
    cpuUtilization: 0.2 + Math.random() * 0.6,
    memoryUtilization: 0.3 + Math.random() * 0.5,
    allocatedTo: customers[(i - 1) % customers.length],
    tasks: [],
  });
}

// Assign some tasks to nodes
const taskAssignments = {
  'node-001': ['task-001', 'task-005'],
  'node-002': ['task-002'],
  'node-003': ['task-003', 'task-010'],
  'node-005': ['task-004'],
  'node-007': ['task-006'],
  'node-008': ['task-007', 'task-012'],
  'node-010': ['task-008'],
  'node-012': ['task-009'],
  'node-015': ['task-011'],
  'node-018': ['task-013'],
  'node-020': ['task-014', 'task-015'],
};

Object.entries(taskAssignments).forEach(([nodeId, taskIds]) => {
  const node = nodes.find(n => n.id === nodeId);
  if (node) node.tasks = taskIds;
});

setState('nodes', nodes);
