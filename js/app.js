import { renderSidebar } from './components/sidebar.js';
import { renderHeader } from './components/header.js';
import { registerRoute, startRouter } from './router.js';

import panorama from './modules/panorama.js';
import allocation from './modules/allocation.js';
import scheduling from './modules/scheduling.js';
import elastic from './modules/elastic.js';
import loadBalance from './modules/load-balance.js';
import health from './modules/health.js';
import statistics from './modules/statistics.js';
import reservation from './modules/reservation.js';

// Init mock data into store
import './mock-data/nodes.js';
import './mock-data/customers.js';
import './mock-data/tasks.js';
import './mock-data/reservations.js';
import './mock-data/health.js';
import './mock-data/statistics.js';

renderSidebar();
renderHeader();

registerRoute('/panorama', panorama);
registerRoute('/allocation', allocation);
registerRoute('/scheduling', scheduling);
registerRoute('/elastic', elastic);
registerRoute('/load-balance', loadBalance);
registerRoute('/health', health);
registerRoute('/statistics', statistics);
registerRoute('/reservation', reservation);

startRouter();
