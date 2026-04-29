import { setState } from '../store.js';

const reservations = [
  { id: 'resv-001', customerId: 'customer-001', nodeIds: ['node-001', 'node-002', 'node-003', 'node-004'], gpuCount: 32, startDate: '2026-04-01', endDate: '2026-06-30', status: 'active', autoRelease: true },
  { id: 'resv-002', customerId: 'customer-002', nodeIds: ['node-005', 'node-006', 'node-007'], gpuCount: 24, startDate: '2026-03-15', endDate: '2026-05-15', status: 'active', autoRelease: true },
  { id: 'resv-003', customerId: 'customer-003', nodeIds: ['node-008', 'node-009'], gpuCount: 16, startDate: '2026-04-10', endDate: '2026-05-01', status: 'active', autoRelease: true },
  { id: 'resv-004', customerId: 'customer-004', nodeIds: ['node-010', 'node-011', 'node-012'], gpuCount: 24, startDate: '2026-05-01', endDate: '2026-08-31', status: 'active', autoRelease: true },
  { id: 'resv-005', customerId: 'customer-005', nodeIds: ['node-013'], gpuCount: 8, startDate: '2026-04-15', endDate: '2026-05-15', status: 'active', autoRelease: false },
  { id: 'resv-006', customerId: 'customer-006', nodeIds: ['node-014', 'node-015'], gpuCount: 8, startDate: '2026-04-20', endDate: '2026-07-20', status: 'active', autoRelease: true },
  { id: 'resv-007', customerId: 'customer-010', nodeIds: ['node-016', 'node-017'], gpuCount: 16, startDate: '2026-05-01', endDate: '2026-10-31', status: 'active', autoRelease: true },
  { id: 'resv-008', customerId: 'customer-007', nodeIds: ['node-018'], gpuCount: 4, startDate: '2026-03-01', endDate: '2026-04-28', status: 'active', autoRelease: true },
  { id: 'resv-009', customerId: 'customer-008', nodeIds: ['node-019', 'node-020'], gpuCount: 8, startDate: '2026-05-15', endDate: '2026-08-15', status: 'active', autoRelease: true },
  { id: 'resv-010', customerId: 'customer-001', nodeIds: ['node-021'], gpuCount: 8, startDate: '2026-06-01', endDate: '2026-12-31', status: 'active', autoRelease: false },
  { id: 'resv-011', customerId: 'customer-009', nodeIds: ['node-022'], gpuCount: 4, startDate: '2026-02-01', endDate: '2026-04-25', status: 'expired', autoRelease: true },
  { id: 'resv-012', customerId: 'customer-012', nodeIds: ['node-023', 'node-024'], gpuCount: 8, startDate: '2026-06-01', endDate: '2026-09-01', status: 'active', autoRelease: true },
];

setState('reservations', reservations);
