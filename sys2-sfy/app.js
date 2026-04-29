// 模拟数据存储
let appData = {
    equipment: [],
    workOrders: [],
    inspections: [],
    maintenance: [],
    accessLogs: [],
    systemLogs: [],
    coolingData: {},
    powerData: {},
    environmentData: {},
    alertHistory: [],
    lastAlertTime: {}
};

// 初始化数据
function initData() {
    // 模拟设备数据
    const equipmentTypes = ['server', 'switch', 'cdud', 'pdu'];
    const serverModels = ['H100-SXM4-80GB', 'A100-SXM4-80GB', 'V100-32GB', 'RTX-4090-24GB'];
    const switchModels = ['S5248F-ON', 'S4128F-ON', 'S3048-ON'];
    const cdudModels = ['CDU-2000', 'CDU-1500', 'CDU-3000'];
    const pduModels = ['PDU-16A', 'PDU-32A', 'PDU-48A'];
    const rooms = ['机房A', '机房B', '机房C'];

    for (let i = 1; i <= 20; i++) {
        const type = equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)];
        let model;
        switch(type) {
            case 'server':
                model = serverModels[Math.floor(Math.random() * serverModels.length)];
                break;
            case 'switch':
                model = switchModels[Math.floor(Math.random() * switchModels.length)];
                break;
            case 'cdud':
                model = cdudModels[Math.floor(Math.random() * cdudModels.length)];
                break;
            case 'pdu':
                model = pduModels[Math.floor(Math.random() * pduModels.length)];
                break;
        }

        const installDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
        const warrantyDate = new Date(installDate.getTime() + 3 * 365 * 24 * 60 * 60 * 1000);

        appData.equipment.push({
            id: `EQ${String(i).padStart(4, '0')}`,
            name: `${type.toUpperCase()}-${i}`,
            type: type,
            model: model,
            sn: `SN${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            location: `${rooms[Math.floor(Math.random() * rooms.length)]}-机柜${Math.floor(Math.random() * 10) + 1}-U${(Math.random() * 42 + 1).toFixed(0)}`,
            installDate: installDate.toISOString().split('T')[0],
            warrantyDate: warrantyDate.toISOString().split('T')[0],
            status: Math.random() > 0.1 ? 'online' : 'offline'
        });
    }

    // 模拟工单数据
    const workOrderTitles = [
        '服务器温度异常',
        '网络连接问题',
        '电源模块故障',
        '冷却系统告警',
        '存储空间不足',
        '内存泄漏问题',
        '防火墙配置更新',
        '数据库性能优化',
        '备份系统检查',
        '安全漏洞修复'
    ];

    const statuses = ['pending', 'processing', 'completed'];
    const priorities = ['high', 'medium', 'low'];
    const assignees = ['张三', '李四', '王五', '赵六', '孙七'];

    for (let i = 1; i <= 15; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const createDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);

        appData.workOrders.push({
            id: `WO${String(i).padStart(4, '0')}`,
            title: workOrderTitles[Math.floor(Math.random() * workOrderTitles.length)],
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            description: '设备运行异常，需要立即处理。检查相关参数并进行故障排除。',
            assignee: assignees[Math.floor(Math.random() * assignees.length)],
            status: status,
            createTime: createDate.toLocaleString('zh-CN'),
            updateTime: new Date(createDate.getTime() + Math.random() * 24 * 60 * 60 * 1000).toLocaleString('zh-CN')
        });
    }

    // 模拟巡检数据
    const inspectionTypes = ['daily', 'weekly', 'monthly'];
    const inspectionNames = [
        '机房日常巡检',
        '设备状态检查',
        '电力系统巡检',
        '冷却系统维护',
        '网络设备检查'
    ];

    for (let i = 1; i <= 8; i++) {
        const type = inspectionTypes[Math.floor(Math.random() * inspectionTypes.length)];
        const frequency = ['once', 'daily', 'weekly', 'monthly'][Math.floor(Math.random() * 4)];

        appData.inspections.push({
            id: `INS${String(i).padStart(4, '0')}`,
            name: inspectionNames[Math.floor(Math.random() * inspectionNames.length)],
            type: type,
            content: '检查所有设备运行状态，记录温度、电压等关键参数，确认告警系统正常工作。',
            person: assignees[Math.floor(Math.random() * assignees.length)],
            frequency: frequency,
            lastCheck: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString('zh-CN'),
            status: Math.random() > 0.3 ? 'completed' : 'pending'
        });
    }

    // 模拟维修数据
    const faultTypes = ['gpu', 'server', 'switch', 'other'];

    for (let i = 1; i <= 10; i++) {
        const faultType = faultTypes[Math.floor(Math.random() * faultTypes.length)];
        const status = ['pending', 'processing', 'completed'][Math.floor(Math.random() * 3)];
        const reportTime = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);

        appData.maintenance.push({
            id: `MT${String(i).padStart(4, '0')}`,
            equipment: appData.equipment[Math.floor(Math.random() * appData.equipment.length)].name,
            type: faultType,
            description: '设备出现异常，经检测确认为硬件故障，需要更换配件。',
            reportTime: reportTime.toLocaleString('zh-CN'),
            status: status,
            cost: status === 'completed' ? Math.floor(Math.random() * 10000 + 1000) : 0
        });
    }

    // 模拟访问日志
    const events = ['进入机房', '离开机房', '权限验证', '门禁开启'];
    const reasons = ['例行巡检', '设备维护', '故障处理', '客户参观', '系统升级'];

    for (let i = 1; i <= 20; i++) {
        const eventTime = new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000);

        appData.accessLogs.push({
            time: eventTime.toLocaleString('zh-CN'),
            person: assignees[Math.floor(Math.random() * assignees.length)],
            role: ['管理员', '运维人员', '客户'][Math.floor(Math.random() * 3)],
            event: events[Math.floor(Math.random() * events.length)],
            reason: reasons[Math.floor(Math.random() * reasons.length)]
        });
    }

    // 模拟系统日志
    const logTypes = ['operation', 'alert', 'equipment'];
    const logMessages = [
        '系统自动备份完成',
        '设备状态检查正常',
        '温度超出阈值，告警触发',
        '网络连接恢复',
        '用户登录系统',
        '设备重启成功',
        '存储空间使用率超过80%',
        '冷却系统参数调整'
    ];

    for (let i = 1; i <= 30; i++) {
        const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
        const logTime = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);

        appData.systemLogs.push({
            id: i,
            time: logTime.toLocaleString('zh-CN'),
            type: logType,
            message: logMessages[Math.floor(Math.random() * logMessages.length)],
            details: '操作ID: ' + Math.random().toString(36).substr(2, 9)
        });
    }

    // 初始化实时数据
    updateRealTimeData();
}

// 更新实时数据
function updateRealTimeData() {
    // 液冷系统数据
    appData.coolingData = {
        cdu1: {
            inTemp: (20 + Math.random() * 5).toFixed(1),
            outTemp: (25 + Math.random() * 5).toFixed(1),
            flow: (10 + Math.random() * 5).toFixed(1),
            pressure: (2 + Math.random() * 1).toFixed(1),
            leak: Math.random() > 0.95 ? 'warning' : 'normal',
            coldPlateStatus: Math.random() > 0.9 ? 'warning' : 'normal',
            coolantStatus: Math.random() > 0.9 ? 'low' : 'normal',
            pumpSpeed: (2000 + Math.random() * 500).toFixed(0),
            coolantLevel: (80 + Math.random() * 15).toFixed(1)
        },
        cdu2: {
            inTemp: (20 + Math.random() * 5).toFixed(1),
            outTemp: (25 + Math.random() * 5).toFixed(1),
            flow: (10 + Math.random() * 5).toFixed(1),
            pressure: (2 + Math.random() * 1).toFixed(1),
            leak: Math.random() > 0.95 ? 'warning' : 'normal',
            coldPlateStatus: Math.random() > 0.9 ? 'warning' : 'normal',
            coolantStatus: Math.random() > 0.9 ? 'low' : 'normal',
            pumpSpeed: (2000 + Math.random() * 500).toFixed(0),
            coolantLevel: (80 + Math.random() * 15).toFixed(1)
        },
        cdu3: {
            inTemp: (20 + Math.random() * 5).toFixed(1),
            outTemp: (25 + Math.random() * 5).toFixed(1),
            flow: (10 + Math.random() * 5).toFixed(1),
            pressure: (2 + Math.random() * 1).toFixed(1),
            leak: Math.random() > 0.95 ? 'warning' : 'normal',
            coldPlateStatus: Math.random() > 0.9 ? 'warning' : 'normal',
            coolantStatus: Math.random() > 0.9 ? 'low' : 'normal',
            pumpSpeed: (2000 + Math.random() * 500).toFixed(0),
            coolantLevel: (80 + Math.random() * 15).toFixed(1)
        }
    };

    // 供电系统数据
    const mainVoltage = (220 + Math.random() * 5).toFixed(1);
    const mainCurrent = (50 + Math.random() * 20).toFixed(1);
    const pduAVoltage = (220 + Math.random() * 5).toFixed(1);
    const pduACurrent = (20 + Math.random() * 10).toFixed(1);
    const pduBVoltage = (220 + Math.random() * 5).toFixed(1);
    const pduBCurrent = (20 + Math.random() * 10).toFixed(1);

    // 服务器级电力数据
    const serverPowerData = Array.from({length: 5}, (_, i) => {
        const voltage = (220 + Math.random() * 10 - 5).toFixed(1);
        const current = (5 + Math.random() * 8).toFixed(1);
        return {
            id: `SERVER-${String(i + 1).padStart(2, '0')}`,
            voltage: voltage,
            current: current,
            power: ((parseFloat(voltage) * parseFloat(current)) / 1000).toFixed(2),
            status: Math.random() > 0.95 ? 'warning' : 'normal'
        };
    });

    appData.powerData = {
        main: {
            voltage: mainVoltage,
            current: mainCurrent,
            power: ((parseFloat(mainVoltage) * parseFloat(mainCurrent)) / 1000).toFixed(2)
        },
        pduA: {
            voltage: pduAVoltage,
            current: pduACurrent,
            power: ((parseFloat(pduAVoltage) * parseFloat(pduACurrent)) / 1000).toFixed(2)
        },
        pduB: {
            voltage: pduBVoltage,
            current: pduBCurrent,
            power: ((parseFloat(pduBVoltage) * parseFloat(pduBCurrent)) / 1000).toFixed(2)
        },
        servers: serverPowerData
    };

    // 环境监控数据
    appData.environmentData = {
        temp: (20 + Math.random() * 5).toFixed(1),
        humidity: (45 + Math.random() * 15).toFixed(0),
        cleanliness: 'ISO 6',
        smoke: Math.random() > 0.98 ? 'warning' : 'normal',
        access: Math.random() > 0.98 ? 'warning' : 'normal'
    };
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initData();
    updateUI();
    setupEventListeners();
    startRealTimeUpdates();
});

// 设置事件监听
function setupEventListeners() {
    // 导航点击事件
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // 工单标签切换
    const workorderTabs = document.querySelectorAll('.workorder-tab');
    workorderTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterWorkOrdersByStatus(filter);
        });
    });
}

// 切换标签页
function switchTab(tabId) {
    // 更新导航状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        }
    });

    // 更新内容显示
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // 更新页面标题
    const pageTitle = document.getElementById('page-title');
    const titles = {
        'overview': '系统概览',
        'equipment': '设备管理',
        'cooling': '液冷系统',
        'power': '供电系统',
        'environment': '环境监控',
        'workorders': '运维工单',
        'inspection': '巡检管理',
        'maintenance': '故障维修',
        'security': '安全管理',
        'logs': '运维日志'
    };

    if (pageTitle && titles[tabId]) {
        pageTitle.textContent = titles[tabId];
    }
}

// 更新UI
function updateUI() {
    updateStats();
    updateCoolingSystem();
    updatePowerSystem();
    updateEnvironment();
    updateWorkOrders();
    updateEquipmentTable();
    updateInspectionList();
    updateMaintenanceTable();
    updateSecurityData();
    updateSystemLogs();
    updateTime();
    populateEquipmentSelect();
}

// 更新统计数据
function updateStats() {
    const totalEquipment = appData.equipment.length;
    const totalAlerts = countAlerts();
    const pendingWorkOrders = appData.workOrders.filter(w => w.status === 'pending').length;

    document.getElementById('total-equipment').textContent = totalEquipment;
    document.getElementById('total-alerts').textContent = totalAlerts;
    document.getElementById('pending-workorders').textContent = pendingWorkOrders;
}

// 统计告警数量
function countAlerts() {
    let count = 0;
    if (appData.coolingData.cdu1.leak === 'warning') count++;
    if (appData.coolingData.cdu2.leak === 'warning') count++;
    if (appData.coolingData.cdu3.leak === 'warning') count++;
    if (parseFloat(appData.environmentData.temp) > 25) count++;
    if (appData.environmentData.smoke === 'warning') count++;
    if (appData.environmentData.access === 'warning') count++;
    return count;
}

// 更新液冷系统
function updateCoolingSystem() {
    const cdu1 = appData.coolingData.cdu1;
    const cdu2 = appData.coolingData.cdu2;
    const cdu3 = appData.coolingData.cdu3;

    // CDU-01 概览
    document.getElementById('cdu1-in-temp').textContent = cdu1.inTemp;
    document.getElementById('cdu1-out-temp').textContent = cdu1.outTemp;
    document.getElementById('cdu1-flow').textContent = cdu1.flow;
    document.getElementById('cdu1-pressure').textContent = cdu1.pressure;
    document.getElementById('cdu1-leak').textContent = cdu1.leak === 'normal' ? '正常' : '异常';
    document.getElementById('cdu1-leak').className = `monitor-value ${cdu1.leak}`;

    // CDU-01 详情页
    document.getElementById('cooling-cdu1-in').textContent = cdu1.inTemp;
    document.getElementById('cooling-cdu1-out').textContent = cdu1.outTemp;
    document.getElementById('cooling-cdu1-flow').textContent = cdu1.flow;
    document.getElementById('cooling-cdu1-pressure').textContent = cdu1.pressure;
    document.getElementById('cooling-cdu1-leak').textContent = cdu1.leak === 'normal' ? '正常' : '异常';
    document.getElementById('cooling-cdu1-leak').className = `monitor-value ${cdu1.leak}`;
    document.getElementById('cooling-cdu1-coldplate').textContent = cdu1.coldPlateStatus === 'normal' ? '正常' : '异常';
    document.getElementById('cooling-cdu1-coldplate').className = `monitor-value ${cdu1.coldPlateStatus}`;
    document.getElementById('cooling-cdu1-coolant').textContent = cdu1.coolantStatus === 'normal' ? '正常' : (cdu1.coolantStatus === 'low' ? '偏低' : '异常');
    document.getElementById('cooling-cdu1-coolant').className = `monitor-value ${cdu1.coolantStatus}`;
    document.getElementById('cooling-cdu1-pump').textContent = cdu1.pumpSpeed;
    document.getElementById('cooling-cdu1-level').textContent = cdu1.coolantLevel;

    // CDU-02 概览
    document.getElementById('cdu2-in-temp').textContent = cdu2.inTemp;
    document.getElementById('cdu2-out-temp').textContent = cdu2.outTemp;
    document.getElementById('cdu2-flow').textContent = cdu2.flow;
    document.getElementById('cdu2-pressure').textContent = cdu2.pressure;
    document.getElementById('cdu2-leak').textContent = cdu2.leak === 'normal' ? '正常' : '异常';
    document.getElementById('cdu2-leak').className = `monitor-value ${cdu2.leak}`;

    // CDU-02 详情页
    document.getElementById('cooling-cdu2-in').textContent = cdu2.inTemp;
    document.getElementById('cooling-cdu2-out').textContent = cdu2.outTemp;
    document.getElementById('cooling-cdu2-flow').textContent = cdu2.flow;
    document.getElementById('cooling-cdu2-pressure').textContent = cdu2.pressure;
    document.getElementById('cooling-cdu2-leak').textContent = cdu2.leak === 'normal' ? '正常' : '异常';
    document.getElementById('cooling-cdu2-leak').className = `monitor-value ${cdu2.leak}`;
    document.getElementById('cooling-cdu2-coldplate').textContent = cdu2.coldPlateStatus === 'normal' ? '正常' : '异常';
    document.getElementById('cooling-cdu2-coldplate').className = `monitor-value ${cdu2.coldPlateStatus}`;
    document.getElementById('cooling-cdu2-coolant').textContent = cdu2.coolantStatus === 'normal' ? '正常' : (cdu2.coolantStatus === 'low' ? '偏低' : '异常');
    document.getElementById('cooling-cdu2-coolant').className = `monitor-value ${cdu2.coolantStatus}`;
    document.getElementById('cooling-cdu2-pump').textContent = cdu2.pumpSpeed;
    document.getElementById('cooling-cdu2-level').textContent = cdu2.coolantLevel;

    // CDU-03 概览
    document.getElementById('cdu3-in-temp').textContent = cdu3.inTemp;
    document.getElementById('cdu3-out-temp').textContent = cdu3.outTemp;
    document.getElementById('cdu3-flow').textContent = cdu3.flow;
    document.getElementById('cdu3-pressure').textContent = cdu3.pressure;
    document.getElementById('cdu3-leak').textContent = cdu3.leak === 'normal' ? '正常' : '异常';
    document.getElementById('cdu3-leak').className = `monitor-value ${cdu3.leak}`;

    // CDU-03 详情页
    document.getElementById('cooling-cdu3-in').textContent = cdu3.inTemp;
    document.getElementById('cooling-cdu3-out').textContent = cdu3.outTemp;
    document.getElementById('cooling-cdu3-flow').textContent = cdu3.flow;
    document.getElementById('cooling-cdu3-pressure').textContent = cdu3.pressure;
    document.getElementById('cooling-cdu3-leak').textContent = cdu3.leak === 'normal' ? '正常' : '异常';
    document.getElementById('cooling-cdu3-leak').className = `monitor-value ${cdu3.leak}`;
    document.getElementById('cooling-cdu3-coldplate').textContent = cdu3.coldPlateStatus === 'normal' ? '正常' : '异常';
    document.getElementById('cooling-cdu3-coldplate').className = `monitor-value ${cdu3.coldPlateStatus}`;
    document.getElementById('cooling-cdu3-coolant').textContent = cdu3.coolantStatus === 'normal' ? '正常' : (cdu3.coolantStatus === 'low' ? '偏低' : '异常');
    document.getElementById('cooling-cdu3-coolant').className = `monitor-value ${cdu3.coolantStatus}`;
    document.getElementById('cooling-cdu3-pump').textContent = cdu3.pumpSpeed;
    document.getElementById('cooling-cdu3-level').textContent = cdu3.coolantLevel;
}

// 更新供电系统
function updatePowerSystem() {
    const main = appData.powerData.main;
    const pduA = appData.powerData.pduA;
    const pduB = appData.powerData.pduB;

    // 总配电 概览
    document.getElementById('main-voltage').textContent = main.voltage;
    document.getElementById('main-current').textContent = main.current;
    document.getElementById('main-power').textContent = main.power;

    // 总配电 详情页
    document.getElementById('detail-main-voltage').textContent = main.voltage;
    document.getElementById('detail-main-current').textContent = main.current;
    document.getElementById('detail-main-power').textContent = main.power;

    // PDU-A路 概览
    document.getElementById('pdu-a-voltage').textContent = pduA.voltage;
    document.getElementById('pdu-a-current').textContent = pduA.current;
    document.getElementById('pdu-a-power').textContent = pduA.power;

    // PDU-A路 详情页
    document.getElementById('detail-pdu-a-voltage').textContent = pduA.voltage;
    document.getElementById('detail-pdu-a-current').textContent = pduA.current;
    document.getElementById('detail-pdu-a-power').textContent = pduA.power;

    // PDU-B路 概览
    document.getElementById('pdu-b-voltage').textContent = pduB.voltage;
    document.getElementById('pdu-b-current').textContent = pduB.current;
    document.getElementById('pdu-b-power').textContent = pduB.power;

    // PDU-B路 详情页
    document.getElementById('detail-pdu-b-voltage').textContent = pduB.voltage;
    document.getElementById('detail-pdu-b-current').textContent = pduB.current;
    document.getElementById('detail-pdu-b-power').textContent = pduB.power;

    // 更新服务器级电力监控
    updateServerPowerTable();
}

// 更新环境监控
function updateEnvironment() {
    const env = appData.environmentData;

    // 概览页面
    document.getElementById('env-temp').textContent = env.temp;
    document.getElementById('env-humidity').textContent = env.humidity;
    document.getElementById('env-cleanliness').textContent = env.cleanliness;

    const tempValue = parseFloat(env.temp);
    const tempElement = document.getElementById('env-temp');
    if (tempValue > 25) {
        tempElement.style.color = '#ef5350';
    } else if (tempValue > 22) {
        tempElement.style.color = '#ffa726';
    } else {
        tempElement.style.color = '#66bb6a';
    }

    document.getElementById('sensor-smoke').textContent = env.smoke === 'normal' ? '正常' : '异常';
    document.getElementById('sensor-smoke').className = `sensor-status ${env.smoke}`;
    document.getElementById('sensor-access').textContent = env.access === 'normal' ? '正常' : '异常';
    document.getElementById('sensor-access').className = `sensor-status ${env.access}`;

    // 详情页面
    document.getElementById('detail-env-temp').textContent = env.temp;
    document.getElementById('detail-env-humidity').textContent = env.humidity;
    document.getElementById('detail-env-cleanliness').textContent = env.cleanliness;

    const detailTempElement = document.getElementById('detail-env-temp');
    if (tempValue > 25) {
        detailTempElement.style.color = '#ef5350';
    } else if (tempValue > 22) {
        detailTempElement.style.color = '#ffa726';
    } else {
        detailTempElement.style.color = '#66bb6a';
    }

    document.getElementById('detail-sensor-smoke').textContent = env.smoke === 'normal' ? '正常' : '异常';
    document.getElementById('detail-sensor-smoke').className = `sensor-status ${env.smoke}`;
    document.getElementById('detail-sensor-access').textContent = env.access === 'normal' ? '正常' : '异常';
    document.getElementById('detail-sensor-access').className = `sensor-status ${env.access}`;
}

// 更新工单列表
function updateWorkOrders() {
    const pendingList = document.getElementById('pending-workorders-list');
    const processingList = document.getElementById('processing-workorders-list');
    const completedList = document.getElementById('completed-workorders-list');
    const overviewList = document.getElementById('workorder-list');

    // 清空列表
    if (pendingList) pendingList.innerHTML = '';
    if (processingList) processingList.innerHTML = '';
    if (completedList) completedList.innerHTML = '';
    if (overviewList) overviewList.innerHTML = '';

    // 更新概览工单列表
    if (overviewList) {
        const pendingOrders = appData.workOrders.filter(w => w.status === 'pending').slice(0, 5);
        pendingOrders.forEach(order => {
            const item = createWorkOrderItem(order);
            overviewList.appendChild(item);
        });
    }

    // 更新各状态工单
    appData.workOrders.forEach(order => {
        const item = createWorkOrderItem(order);
        if (order.status === 'pending' && pendingList) {
            pendingList.appendChild(item.cloneNode(true));
        } else if (order.status === 'processing' && processingList) {
            processingList.appendChild(item.cloneNode(true));
        } else if (order.status === 'completed' && completedList) {
            completedList.appendChild(item.cloneNode(true));
        }
    });

    // 更新计数
    const pendingCount = appData.workOrders.filter(w => w.status === 'pending').length;
    const processingCount = appData.workOrders.filter(w => w.status === 'processing').length;
    const completedCount = appData.workOrders.filter(w => w.status === 'completed').length;

    if (document.getElementById('pending-count')) {
        document.getElementById('pending-count').textContent = pendingCount;
    }
    if (document.getElementById('processing-count')) {
        document.getElementById('processing-count').textContent = processingCount;
    }
    if (document.getElementById('completed-count')) {
        document.getElementById('completed-count').textContent = completedCount;
    }
    if (document.getElementById('pending-column-count')) {
        document.getElementById('pending-column-count').textContent = pendingCount;
    }
    if (document.getElementById('processing-column-count')) {
        document.getElementById('processing-column-count').textContent = processingCount;
    }
    if (document.getElementById('completed-column-count')) {
        document.getElementById('completed-column-count').textContent = completedCount;
    }
}

// 创建工单项
function createWorkOrderItem(order) {
    const div = document.createElement('div');
    div.className = 'workorder-item';

    const priorityClass = order.priority;
    const priorityText = {
        'high': '高',
        'medium': '中',
        'low': '低'
    }[order.priority];

    div.innerHTML = `
        <span class="priority ${priorityClass}">${priorityText}</span>
        <h4>${order.title}</h4>
        <p class="description">${order.description}</p>
        <div class="meta">
            <span>负责人: ${order.assignee}</span>
            <span>${order.createTime}</span>
        </div>
    `;

    return div;
}

// 更新设备表格
function updateEquipmentTable() {
    const tbody = document.getElementById('equipment-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    const typeNames = {
        'server': '服务器',
        'switch': '交换机',
        'cdud': 'CDU',
        'pdu': 'PDU'
    };

    const statusNames = {
        'online': '在线',
        'offline': '离线'
    };

    appData.equipment.forEach(equipment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${equipment.id}</td>
            <td>${equipment.name}</td>
            <td>${typeNames[equipment.type]}</td>
            <td>${equipment.model}</td>
            <td>${equipment.sn}</td>
            <td>${equipment.location}</td>
            <td>${equipment.installDate}</td>
            <td>${equipment.warrantyDate}</td>
            <td>
                <span class="status-badge ${equipment.status}">${statusNames[equipment.status]}</span>
            </td>
            <td>
                <button class="btn" onclick="editEquipment('${equipment.id}')">编辑</button>
                <button class="btn" onclick="deleteEquipment('${equipment.id}')">删除</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 更新巡检列表
function updateInspectionList() {
    const list = document.getElementById('inspection-list');
    if (!list) return;

    list.innerHTML = '';

    const typeNames = {
        'daily': '日常巡检',
        'weekly': '周巡检',
        'monthly': '月巡检'
    };

    const frequencyNames = {
        'once': '单次',
        'daily': '每日',
        'weekly': '每周',
        'monthly': '每月'
    };

    appData.inspections.forEach(inspection => {
        const item = document.createElement('div');
        item.className = 'inspection-item';
        item.innerHTML = `
            <div class="inspection-header">
                <h3>${inspection.name}</h3>
                <span class="inspection-type">${typeNames[inspection.type]}</span>
            </div>
            <p class="inspection-content">${inspection.content}</p>
            <div class="inspection-meta">
                <span>责任人: ${inspection.person}</span>
                <span>频次: ${frequencyNames[inspection.frequency]}</span>
                <span>上次检查: ${inspection.lastCheck}</span>
                <span>状态: ${inspection.status === 'completed' ? '已完成' : '待处理'}</span>
            </div>
        `;
        list.appendChild(item);
    });
}

// 更新维修表格
function updateMaintenanceTable() {
    const tbody = document.getElementById('maintenance-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    const faultTypeNames = {
        'gpu': 'GPU损坏',
        'server': '服务器宕机',
        'switch': '交换机故障',
        'other': '其他'
    };

    const statusNames = {
        'pending': '待处理',
        'processing': '处理中',
        'completed': '已完成'
    };

    appData.maintenance.forEach(maintenance => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${maintenance.id}</td>
            <td>${maintenance.equipment}</td>
            <td>${faultTypeNames[maintenance.type]}</td>
            <td>${maintenance.description}</td>
            <td>${maintenance.reportTime}</td>
            <td>${statusNames[maintenance.status]}</td>
            <td>${maintenance.cost > 0 ? '¥' + maintenance.cost : '-'}</td>
            <td>
                <button class="btn" onclick="viewMaintenance('${maintenance.id}')">查看</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 更新安全数据
function updateSecurityData() {
    const onlineUsers = Math.floor(Math.random() * 5) + 1;
    const todayAccess = appData.accessLogs.filter(log => {
        const logDate = new Date(log.time);
        const today = new Date();
        return logDate.getDate() === today.getDate() &&
               logDate.getMonth() === today.getMonth() &&
               logDate.getFullYear() === today.getFullYear();
    }).length;
    const abnormalAccess = appData.accessLogs.filter(log => log.event === '权限验证').length;

    document.getElementById('online-users').textContent = onlineUsers;
    document.getElementById('today-access').textContent = todayAccess;
    document.getElementById('abnormal-access').textContent = abnormalAccess;

    // 更新访问日志表格
    const tbody = document.getElementById('access-table-body');
    if (tbody) {
        tbody.innerHTML = '';
        appData.accessLogs.slice(0, 10).forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${log.time}</td>
                <td>${log.person}</td>
                <td>${log.role}</td>
                <td>${log.event}</td>
                <td>${log.reason}</td>
            `;
            tbody.appendChild(row);
        });
    }
}

// 更新系统日志
function updateSystemLogs() {
    const logList = document.getElementById('log-list');
    if (!logList) return;

    logList.innerHTML = '';

    const logTypeNames = {
        'operation': '操作',
        'alert': '告警',
        'equipment': '设备'
    };

    appData.systemLogs.forEach(log => {
        const item = document.createElement('div');
        item.className = `log-item ${log.type}`;
        item.innerHTML = `
            <div class="log-time">${log.time}</div>
            <div class="log-content">
                <span class="log-type ${log.type}">${logTypeNames[log.type]}</span>
                ${log.message}
                <span style="color: #64b5f6; font-size: 12px; margin-left: 8px;">${log.details}</span>
            </div>
        `;
        logList.appendChild(item);
    });
}

// 更新时间
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN');
    const dateString = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });

    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');

    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
}

// 填充设备选择框
function populateEquipmentSelect() {
    const select = document.getElementById('maintenance-equipment');
    if (!select) return;

    select.innerHTML = '';
    appData.equipment.forEach(equipment => {
        const option = document.createElement('option');
        option.value = equipment.name;
        option.textContent = `${equipment.name} (${equipment.id})`;
        select.appendChild(option);
    });
}

// 实时数据更新
function startRealTimeUpdates() {
    setInterval(() => {
        updateRealTimeData();
        updateCoolingSystem();
        updatePowerSystem();
        updateEnvironment();
        updateTime();
        updateStats();
        detectCoolingAlerts(); // 检测液冷告警
        detectPowerAlerts(); // 检测电力告警
    }, 5000); // 每5秒更新一次

    setInterval(() => {
        updateTime();
    }, 1000); // 每秒更新时间
}

// 刷新数据
function refreshData() {
    updateRealTimeData();
    updateUI();
    alert('数据已刷新！');
}

// 搜索设备
function searchEquipment() {
    const searchTerm = document.getElementById('equipment-search').value.toLowerCase();
    const filter = document.getElementById('equipment-filter').value;

    let filtered = appData.equipment;

    if (searchTerm) {
        filtered = filtered.filter(equipment =>
            equipment.name.toLowerCase().includes(searchTerm) ||
            equipment.id.toLowerCase().includes(searchTerm) ||
            equipment.model.toLowerCase().includes(searchTerm)
        );
    }

    if (filter !== 'all') {
        filtered = filtered.filter(equipment => equipment.type === filter);
    }

    updateFilteredEquipmentTable(filtered);
}

// 过滤设备
function filterEquipment() {
    searchEquipment();
}

// 更新过滤后的设备表格
function updateFilteredEquipmentTable(equipmentList) {
    const tbody = document.getElementById('equipment-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    const typeNames = {
        'server': '服务器',
        'switch': '交换机',
        'cdud': 'CDU',
        'pdu': 'PDU'
    };

    const statusNames = {
        'online': '在线',
        'offline': '离线'
    };

    equipmentList.forEach(equipment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${equipment.id}</td>
            <td>${equipment.name}</td>
            <td>${typeNames[equipment.type]}</td>
            <td>${equipment.model}</td>
            <td>${equipment.sn}</td>
            <td>${equipment.location}</td>
            <td>${equipment.installDate}</td>
            <td>${equipment.warrantyDate}</td>
            <td>
                <span class="status-badge ${equipment.status}">${statusNames[equipment.status]}</span>
            </td>
            <td>
                <button class="btn" onclick="editEquipment('${equipment.id}')">编辑</button>
                <button class="btn" onclick="deleteEquipment('${equipment.id}')">删除</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 按状态过滤工单
function filterWorkOrdersByStatus(status) {
    // 更新标签状态
    const tabs = document.querySelectorAll('.workorder-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-filter') === status) {
            tab.classList.add('active');
        }
    });

    const list = document.getElementById('workorder-list');
    if (!list) return;

    list.innerHTML = '';

    const filtered = appData.workOrders.filter(order => order.status === status);
    filtered.forEach(order => {
        const item = createWorkOrderItem(order);
        list.appendChild(item);
    });
}

// 显示弹窗
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

// 关闭弹窗
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// 保存设备
function saveEquipment(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const newEquipment = {
        id: `EQ${String(appData.equipment.length + 1).padStart(4, '0')}`,
        name: formData.get('name'),
        type: formData.get('type'),
        model: formData.get('model'),
        sn: formData.get('sn'),
        location: formData.get('location'),
        installDate: formData.get('installDate'),
        warrantyDate: formData.get('warrantyDate'),
        status: 'online'
    };

    appData.equipment.push(newEquipment);
    updateEquipmentTable();
    populateEquipmentSelect();
    updateStats();
    closeModal('equipment-modal');
    form.reset();
    alert('设备添加成功！');
}

// 编辑设备
function editEquipment(id) {
    const equipment = appData.equipment.find(e => e.id === id);
    if (equipment) {
        const form = document.getElementById('equipment-edit-form');
        form.querySelector('[name="edit-id"]').value = equipment.id;
        form.querySelector('[name="name"]').value = equipment.name;
        form.querySelector('[name="type"]').value = equipment.type;
        form.querySelector('[name="model"]').value = equipment.model;
        form.querySelector('[name="sn"]').value = equipment.sn;
        form.querySelector('[name="location"]').value = equipment.location;
        form.querySelector('[name="installDate"]').value = equipment.installDate;
        form.querySelector('[name="warrantyDate"]').value = equipment.warrantyDate;
        form.querySelector('[name="status"]').value = equipment.status;
        showModal('equipment-edit-modal');
    }
}

// 更新设备
function updateEquipment(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const id = formData.get('edit-id');

    const equipment = appData.equipment.find(e => e.id === id);
    if (equipment) {
        equipment.name = formData.get('name');
        equipment.type = formData.get('type');
        equipment.model = formData.get('model');
        equipment.sn = formData.get('sn');
        equipment.location = formData.get('location');
        equipment.installDate = formData.get('installDate');
        equipment.warrantyDate = formData.get('warrantyDate');
        equipment.status = formData.get('status');

        updateEquipmentTable();
        populateEquipmentSelect();
        closeModal('equipment-edit-modal');
        form.reset();
        alert('设备更新成功！');
    }
}

// 删除设备
function deleteEquipment(id) {
    if (confirm('确定要删除该设备吗？')) {
        appData.equipment = appData.equipment.filter(e => e.id !== id);
        updateEquipmentTable();
        populateEquipmentSelect();
        updateStats();
        alert('设备删除成功！');
    }
}

// 保存工单
function saveWorkOrder(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const newWorkOrder = {
        id: `WO${String(appData.workOrders.length + 1).padStart(4, '0')}`,
        title: formData.get('title'),
        priority: formData.get('priority'),
        description: formData.get('description'),
        assignee: formData.get('assignee'),
        status: 'pending',
        createTime: new Date().toLocaleString('zh-CN'),
        updateTime: new Date().toLocaleString('zh-CN')
    };

    appData.workOrders.push(newWorkOrder);
    updateWorkOrders();
    updateStats();
    closeModal('workorder-modal');
    form.reset();
    alert('工单创建成功！');
}

// 保存巡检计划
function saveInspection(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const newInspection = {
        id: `INS${String(appData.inspections.length + 1).padStart(4, '0')}`,
        name: formData.get('name'),
        type: formData.get('type'),
        content: formData.get('content'),
        person: formData.get('person'),
        frequency: formData.get('frequency'),
        lastCheck: new Date().toLocaleString('zh-CN'),
        status: 'pending'
    };

    appData.inspections.push(newInspection);
    updateInspectionList();
    closeModal('inspection-modal');
    form.reset();
    alert('巡检计划创建成功！');
}

// 保存维修记录
function saveMaintenance(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const newMaintenance = {
        id: `MT${String(appData.maintenance.length + 1).padStart(4, '0')}`,
        equipment: formData.get('equipment'),
        type: formData.get('type'),
        description: formData.get('description'),
        reportTime: new Date().toLocaleString('zh-CN'),
        status: 'pending',
        cost: 0
    };

    appData.maintenance.push(newMaintenance);
    updateMaintenanceTable();
    closeModal('maintenance-modal');
    form.reset();
    alert('报修提交成功！');
}

// 查看维修记录
function viewMaintenance(id) {
    const maintenance = appData.maintenance.find(m => m.id === id);
    if (maintenance) {
        alert(`维修ID: ${maintenance.id}\n设备: ${maintenance.equipment}\n故障描述: ${maintenance.description}\n状态: ${maintenance.status}\n费用: ${maintenance.cost > 0 ? '¥' + maintenance.cost : '未计算'}`);
    }
}

// 导出日志
function exportLogs() {
    const logContent = appData.systemLogs.map(log =>
        `${log.time} [${log.type}] ${log.message} ${log.details}`
    ).join('\n');

    const blob = new Blob([logContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('日志导出成功！');
}

// 过滤日志
function filterLogs() {
    const dateFilter = document.getElementById('log-date').value;
    const typeFilter = document.getElementById('log-type').value;

    let filtered = appData.systemLogs;

    if (dateFilter) {
        filtered = filtered.filter(log => log.time.includes(dateFilter));
    }

    if (typeFilter !== 'all') {
        filtered = filtered.filter(log => log.type === typeFilter);
    }

    const logList = document.getElementById('log-list');
    if (logList) {
        logList.innerHTML = '';

        const logTypeNames = {
            'operation': '操作',
            'alert': '告警',
            'equipment': '设备'
        };

        filtered.forEach(log => {
            const item = document.createElement('div');
            item.className = `log-item ${log.type}`;
            item.innerHTML = `
                <div class="log-time">${log.time}</div>
                <div class="log-content">
                    <span class="log-type ${log.type}">${logTypeNames[log.type]}</span>
                    ${log.message}
                    <span style="color: #64b5f6; font-size: 12px; margin-left: 8px;">${log.details}</span>
                </div>
            `;
            logList.appendChild(item);
        });
    }
}

// 点击弹窗外部关闭
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// 告警防重复检测
function checkAlertThrottle(alertId) {
    const now = Date.now();
    const lastTime = appData.lastAlertTime[alertId] || 0;
    const throttleTime = 5 * 60 * 1000; // 5分钟内不重复告警

    if (now - lastTime < throttleTime) {
        return false;
    }

    appData.lastAlertTime[alertId] = now;
    return true;
}

// 检测液冷系统告警
function detectCoolingAlerts() {
    const alerts = [];

    // 检测CDU漏液
    ['cdu1', 'cdu2', 'cdu3'].forEach(cduId => {
        const cdu = appData.coolingData[cduId];
        const alertId = `${cduId}_leak`;

        if (cdu.leak === 'warning' && checkAlertThrottle(alertId)) {
            alerts.push({
                type: 'critical',
                source: `CDU-${cduId.slice(-1)}`,
                message: '检测到漏液异常',
                priority: 'high'
            });
        }

        // 检测冷板状态
        const coldPlateAlertId = `${cduId}_coldplate`;
        if (cdu.coldPlateStatus === 'warning' && checkAlertThrottle(coldPlateAlertId)) {
            alerts.push({
                type: 'warning',
                source: `CDU-${cduId.slice(-1)}`,
                message: '冷板状态异常',
                priority: 'medium'
            });
        }

        // 检测冷媒液位
        const coolantAlertId = `${cduId}_coolant`;
        if (cdu.coolantStatus !== 'normal' && checkAlertThrottle(coolantAlertId)) {
            alerts.push({
                type: 'warning',
                source: `CDU-${cduId.slice(-1)}`,
                message: cdu.coolantStatus === 'low' ? '冷媒液位偏低' : '冷媒状态异常',
                priority: 'medium'
            });
        }

        // 检测温度异常
        const tempAlertId = `${cduId}_temp`;
        const inTemp = parseFloat(cdu.inTemp);
        if (inTemp > 28 && checkAlertThrottle(tempAlertId)) {
            alerts.push({
                type: 'warning',
                source: `CDU-${cduId.slice(-1)}`,
                message: `进水温度过高: ${inTemp}°C`,
                priority: 'high'
            });
        }
    });

    // 处理检测到的告警
    alerts.forEach(alert => {
        createAlertWorkOrder(alert.type, alert.source, alert.message, alert.priority);
        recordAlert(alert);
    });
}

// 创建告警工单
function createAlertWorkOrder(type, source, message, priority) {
    const assignees = ['张三', '李四', '王五', '赵六', '孙七'];
    const newWorkOrder = {
        id: `WO${String(appData.workOrders.length + 1).padStart(4, '0')}`,
        title: `[自动告警] ${source} - ${message}`,
        priority: priority,
        description: `系统自动检测到异常：${message}\n来源：${source}\n类型：${type}\n\n请立即处理。`,
        assignee: assignees[Math.floor(Math.random() * assignees.length)],
        status: 'pending',
        createTime: new Date().toLocaleString('zh-CN'),
        updateTime: new Date().toLocaleString('zh-CN')
    };

    appData.workOrders.push(newWorkOrder);
    updateWorkOrders();
    updateStats();

    // 可以在这里添加通知逻辑，如发送邮件、短信等
    console.log(`已创建自动告警工单: ${newWorkOrder.title}`);
}

// 记录告警历史
function recordAlert(alert) {
    const alertRecord = {
        id: appData.alertHistory.length + 1,
        time: new Date().toLocaleString('zh-CN'),
        type: alert.type,
        source: alert.source,
        message: alert.message,
        priority: alert.priority
    };

    appData.alertHistory.unshift(alertRecord);

    // 保留最近100条告警记录
    if (appData.alertHistory.length > 100) {
        appData.alertHistory = appData.alertHistory.slice(0, 100);
    }
}

// 更新服务器电力表格
function updateServerPowerTable() {
    const tbody = document.getElementById('server-power-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    appData.powerData.servers.forEach(server => {
        const row = document.createElement('tr');
        const voltage = parseFloat(server.voltage);
        const isVoltageAbnormal = voltage < 210 || voltage > 230;

        row.innerHTML = `
            <td>${server.id}</td>
            <td style="${isVoltageAbnormal ? 'color: #ef5350;' : ''}">${server.voltage}</td>
            <td>${server.current}</td>
            <td>${server.power}</td>
            <td>
                <span class="status-badge ${server.status}">${server.status === 'normal' ? '正常' : '异常'}</span>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 检测电力系统告警
function detectPowerAlerts() {
    const alerts = [];

    // 检测服务器电力异常
    appData.powerData.servers.forEach(server => {
        const voltage = parseFloat(server.voltage);
        const current = parseFloat(server.current);

        // 电压异常检测
        if ((voltage < 210 || voltage > 230) && checkAlertThrottle(`${server.id}_voltage`)) {
            alerts.push({
                type: 'warning',
                source: server.id,
                message: `电压异常: ${voltage}V`,
                priority: 'high'
            });
        }

        // 电流异常检测
        if (current > 12 && checkAlertThrottle(`${server.id}_current`)) {
            alerts.push({
                type: 'warning',
                source: server.id,
                message: `电流过高: ${current}A`,
                priority: 'medium'
            });
        }

        // 服务器状态异常
        if (server.status === 'warning' && checkAlertThrottle(`${server.id}_status`)) {
            alerts.push({
                type: 'critical',
                source: server.id,
                message: '服务器电力状态异常',
                priority: 'high'
            });
        }
    });

    // 处理检测到的告警
    alerts.forEach(alert => {
        createAlertWorkOrder(alert.type, alert.source, alert.message, alert.priority);
        recordAlert(alert);
    });

    updatePowerAlertLog();
}

// 更新电力告警日志
function updatePowerAlertLog() {
    const logContainer = document.getElementById('power-alert-log');
    if (!logContainer) return;

    const powerAlerts = appData.alertHistory.filter(alert =>
        alert.source.includes('SERVER') ||
        alert.source.includes('PDU') ||
        alert.source.includes('总配电')
    ).slice(0, 10);

    if (powerAlerts.length === 0) {
        logContainer.innerHTML = '<div style="color: #66bb6a; padding: 20px; text-align: center;">暂无电力告警</div>';
        return;
    }

    logContainer.innerHTML = '';
    powerAlerts.forEach(alert => {
        const item = document.createElement('div');
        item.className = `log-item ${alert.type}`;

        const priorityClass = alert.priority === 'high' ? 'high' : (alert.priority === 'medium' ? 'medium' : 'low');

        item.innerHTML = `
            <div class="log-time">${alert.time}</div>
            <div class="log-content">
                <span class="log-type ${alert.type}">${alert.type === 'critical' ? '严重' : (alert.type === 'warning' ? '警告' : '提示')}</span>
                <span class="priority-badge ${priorityClass}">${alert.priority === 'high' ? '高' : (alert.priority === 'medium' ? '中' : '低')}</span>
                <strong>${alert.source}</strong> - ${alert.message}
            </div>
        `;
        logContainer.appendChild(item);
    });
}