import { setState } from '../store.js';

const taskTemplates = [
  { name: 'LLM微调训练-通义千问7B', type: '训练' },
  { name: '图像识别模型推理', type: '推理' },
  { name: '语音识别模型训练-Whisper', type: '训练' },
  { name: '自动驾驶数据标注处理', type: '数据处理' },
  { name: '多模态模型预训练', type: '训练' },
  { name: '推荐系统模型推理', type: '推理' },
  { name: 'NLP文本生成训练-GPT2', type: '训练' },
  { name: '视频分析推理服务', type: '推理' },
  { name: 'OCR模型训练-PaddleOCR', type: '训练' },
  { name: '联邦学习数据预处理', type: '数据处理' },
  { name: 'Diffusion模型训练-SDXL', type: '训练' },
  { name: '知识图谱构建处理', type: '数据处理' },
  { name: '大语言模型RLHF训练', type: '训练' },
  { name: '3D点云分割推理', type: '推理' },
  { name: '时序预测模型训练', type: '训练' },
];

const customerIds = ['customer-001', 'customer-002', 'customer-003', 'customer-004', 'customer-005', 'customer-006', 'customer-007', 'customer-008'];
const assignedNodes = ['node-001', 'node-002', 'node-003', 'node-005', 'node-007', 'node-008', 'node-010', 'node-012', 'node-015', 'node-018', 'node-020'];

const tasks = [];

// Running tasks (15)
for (let i = 0; i < 15; i++) {
  const tpl = taskTemplates[i % taskTemplates.length];
  const priority = Math.ceil(Math.random() * 5);
  const gpuReq = [4, 8, 2, 4, 8, 4, 2, 4, 4, 2, 8, 4, 16, 2, 4][i];
  const tflopsReq = gpuReq * (30 + Math.random() * 20);

  tasks.push({
    id: `task-${String(i + 1).padStart(3, '0')}`,
    name: tpl.name,
    customerId: customerIds[i % customerIds.length],
    type: tpl.type,
    priority,
    requiredGPUs: gpuReq,
    requiredTFLOPS: Math.round(tflopsReq),
    status: 'running',
    assignedNode: assignedNodes[i % assignedNodes.length],
    submitTime: `2026-04-${String(25 + Math.floor(Math.random() * 3)).padStart(2, '0')} ${String(8 + Math.floor(Math.random() * 12)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00`,
    startTime: `2026-04-${String(25 + Math.floor(Math.random() * 3)).padStart(2, '0')} ${String(9 + Math.floor(Math.random() * 11)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00`,
    estimatedDuration: ['2h', '4h', '6h', '8h', '12h', '24h', '48h'][Math.floor(Math.random() * 7)],
    progress: 0.1 + Math.random() * 0.8,
  });
}

// Queued tasks (10)
for (let i = 15; i < 25; i++) {
  const tpl = taskTemplates[i % taskTemplates.length];
  const priority = Math.ceil(Math.random() * 5);
  const gpuReq = [4, 8, 2, 16, 4, 8, 4, 2, 4, 8][i - 15];

  tasks.push({
    id: `task-${String(i + 1).padStart(3, '0')}`,
    name: tpl.name + `-V${Math.ceil(Math.random() * 3)}`,
    customerId: customerIds[i % customerIds.length],
    type: tpl.type,
    priority,
    requiredGPUs: gpuReq,
    requiredTFLOPS: Math.round(gpuReq * (30 + Math.random() * 20)),
    status: 'queued',
    assignedNode: null,
    submitTime: `2026-04-${String(27 + Math.floor(Math.random() * 2)).padStart(2, '0')} ${String(6 + Math.floor(Math.random() * 16)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00`,
    startTime: null,
    estimatedDuration: ['4h', '6h', '8h', '12h', '24h', '48h'][Math.floor(Math.random() * 6)],
    progress: 0,
  });
}

// Completed tasks (15)
for (let i = 25; i < 40; i++) {
  const tpl = taskTemplates[i % taskTemplates.length];
  tasks.push({
    id: `task-${String(i + 1).padStart(3, '0')}`,
    name: tpl.name,
    customerId: customerIds[i % customerIds.length],
    type: tpl.type,
    priority: Math.ceil(Math.random() * 5),
    requiredGPUs: [4, 8, 2, 4][i % 4],
    requiredTFLOPS: Math.round([4, 8, 2, 4][i % 4] * (30 + Math.random() * 20)),
    status: 'completed',
    assignedNode: assignedNodes[i % assignedNodes.length],
    submitTime: `2026-04-${String(20 + Math.floor(Math.random() * 7)).padStart(2, '0')} ${String(8 + Math.floor(Math.random() * 10)).padStart(2, '0')}:00:00`,
    startTime: `2026-04-${String(20 + Math.floor(Math.random() * 7)).padStart(2, '0')} ${String(9 + Math.floor(Math.random() * 10)).padStart(2, '0')}:00:00`,
    estimatedDuration: ['2h', '4h', '6h', '8h'][i % 4],
    progress: 1,
  });
}

// Failed tasks (5)
for (let i = 40; i < 45; i++) {
  const tpl = taskTemplates[i % taskTemplates.length];
  tasks.push({
    id: `task-${String(i + 1).padStart(3, '0')}`,
    name: tpl.name,
    customerId: customerIds[i % customerIds.length],
    type: tpl.type,
    priority: Math.ceil(Math.random() * 3),
    requiredGPUs: 4,
    requiredTFLOPS: Math.round(4 * 35),
    status: 'failed',
    assignedNode: assignedNodes[i % assignedNodes.length],
    submitTime: `2026-04-${String(22 + Math.floor(Math.random() * 5)).padStart(2, '0')} ${String(10 + Math.floor(Math.random() * 8)).padStart(2, '0')}:00:00`,
    startTime: `2026-04-${String(22 + Math.floor(Math.random() * 5)).padStart(2, '0')} ${String(11 + Math.floor(Math.random() * 7)).padStart(2, '0')}:00:00`,
    estimatedDuration: '6h',
    progress: 0.3 + Math.random() * 0.4,
  });
}

setState('tasks', tasks);
