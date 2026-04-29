import { setState } from '../store.js';

const customers = [
  { id: 'customer-001', name: '智源研究院', type: '长期租赁', priorityLevel: 5, allocatedGPUs: 32, allocatedTFLOPS: 1980, contractExpiry: '2026-12-31', contactPerson: '张工', contactPhone: '138****5678' },
  { id: 'customer-002', name: '深思创芯', type: '长期租赁', priorityLevel: 4, allocatedGPUs: 24, allocatedTFLOPS: 1488, contractExpiry: '2026-09-30', contactPerson: '李总', contactPhone: '139****1234' },
  { id: 'customer-003', name: '云从科技', type: '短期租赁', priorityLevel: 3, allocatedGPUs: 16, allocatedTFLOPS: 660, contractExpiry: '2026-06-30', contactPerson: '王经理', contactPhone: '137****9876' },
  { id: 'customer-004', name: '旷视科技', type: '长期租赁', priorityLevel: 4, allocatedGPUs: 20, allocatedTFLOPS: 1650, contractExpiry: '2027-03-31', contactPerson: '赵工', contactPhone: '136****5432' },
  { id: 'customer-005', name: '商汤科技', type: '按需', priorityLevel: 3, allocatedGPUs: 8, allocatedTFLOPS: 495, contractExpiry: '2026-05-31', contactPerson: '刘总', contactPhone: '135****7890' },
  { id: 'customer-006', name: '第四范式', type: '短期租赁', priorityLevel: 2, allocatedGPUs: 12, allocatedTFLOPS: 495, contractExpiry: '2026-07-15', contactPerson: '陈工', contactPhone: '133****4567' },
  { id: 'customer-007', name: '依图科技', type: '按需', priorityLevel: 2, allocatedGPUs: 4, allocatedTFLOPS: 330, contractExpiry: '2026-06-01', contactPerson: '孙经理', contactPhone: '131****2345' },
  { id: 'customer-008', name: '明略科技', type: '短期租赁', priorityLevel: 3, allocatedGPUs: 8, allocatedTFLOPS: 330, contractExpiry: '2026-08-31', contactPerson: '周工', contactPhone: '132****6789' },
  { id: 'customer-009', name: '追一科技', type: '按需', priorityLevel: 1, allocatedGPUs: 4, allocatedTFLOPS: 125, contractExpiry: '2026-05-15', contactPerson: '吴总', contactPhone: '130****3456' },
  { id: 'customer-010', name: '云天励飞', type: '长期租赁', priorityLevel: 4, allocatedGPUs: 16, allocatedTFLOPS: 990, contractExpiry: '2027-01-31', contactPerson: '郑工', contactPhone: '188****7891' },
  { id: 'customer-011', name: '奥比中光', type: '按需', priorityLevel: 1, allocatedGPUs: 2, allocatedTFLOPS: 82.6, contractExpiry: '2026-05-30', contactPerson: '黄经理', contactPhone: '186****2345' },
  { id: 'customer-012', name: '虹软科技', type: '短期租赁', priorityLevel: 2, allocatedGPUs: 8, allocatedTFLOPS: 500, contractExpiry: '2026-08-15', contactPerson: '林工', contactPhone: '185****5678' },
];

setState('customers', customers);
