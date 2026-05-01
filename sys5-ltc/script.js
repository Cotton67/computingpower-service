// 算力安全管控系统 - JavaScript 交互功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('算力安全管控系统初始化中...');

    // 添加菜单序号
    addMenuNumbers();

    // 初始化时间显示
    updateTime();
    setInterval(updateTime, 1000);

    // 初始化导航功能
    initNavigation();

    // 初始化模拟数据
    initMockData();

    // 启动实时数据更新
    startRealTimeUpdates();

    // 初始化所有交互功能
    initAllInteractions();

    console.log('算力安全管控系统初始化完成');
});

// 添加菜单序号
function addMenuNumbers() {
    const menuItems = document.querySelectorAll('.sidebar-item');
    menuItems.forEach((item, index) => {
        const number = `${index + 1}.`;
        const nameSpan = item.querySelector('span:not(.menu-number)');
        if (nameSpan && !item.querySelector('.menu-number')) {
            const numberSpan = document.createElement('span');
            numberSpan.className = 'menu-number';
            numberSpan.textContent = number;
            item.insertBefore(numberSpan, nameSpan);
        }
    });
}

// 更新时间显示
function updateTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        timeElement.textContent = timeString;
    }
}

// 导航功能
function initNavigation() {
    const navItems = document.querySelectorAll('.sidebar-item');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // 移除所有活动状态
            navItems.forEach(nav => nav.classList.remove('active'));

            // 添加当前活动状态
            this.classList.add('active');

            // 显示对应页面
            const pageName = this.getAttribute('data-page');
            showPage(pageName);

            console.log('切换到页面:', pageName);
        });
    });
}

// 显示指定页面
function showPage(pageName) {
    const sections = document.querySelectorAll('.page-section');

    // 先隐藏所有页面
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.opacity = '0';
    });

    const targetSection = document.getElementById(pageName);
    if (targetSection) {
        // 显示目标页面
        targetSection.classList.add('active');

        // 添加淡入动画
        setTimeout(() => {
            targetSection.style.opacity = '1';
        }, 50);

        // 滚动到页面顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // 更新页面标题
        const pageTitle = document.getElementById('pageTitle');
        const navItem = document.querySelector(`[data-page="${pageName}"]`);
        if (pageTitle && navItem) {
            // 获取菜单项的文字部分，排除序号
            const textSpan = navItem.querySelector('span:not(.menu-number)');
            if (textSpan) {
                pageTitle.textContent = textSpan.textContent.trim();
            } else {
                pageTitle.textContent = navItem.textContent.replace(/^\d+\.\s*/, '').trim();
            }
        }

        console.log('页面切换成功:', pageName);
    } else {
        console.error('页面不存在:', pageName);
        // 如果页面不存在，显示仪表盘作为默认页面
        const dashboardSection = document.getElementById('dashboard');
        if (dashboardSection) {
            dashboardSection.classList.add('active');
            setTimeout(() => {
                dashboardSection.style.opacity = '1';
            }, 50);
            // 滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
}

// 初始化所有交互功能
function initAllInteractions() {
    // 告警系统过滤按钮
    initAlertFilters();

    // 告警操作按钮
    initAlertActions();

    // 权限管理按钮
    initPermissionActions();

    // 备份操作按钮
    initBackupActions();

    // 日志搜索和过滤
    initLogFilters();

    // 合规检测按钮
    initComplianceActions();

    // 数据加密管理功能
    initEncryptionFeatures();

    // 病毒防护功能
    initAntivirusFeatures();

    // 节点安全监控功能
    initNodeMonitoringFeatures();

    // 安全风险管理功能
    initRiskManagementFeatures();

    // 系统设置功能
    initSystemSettingsFeatures();

    // 所有查看按钮
    initViewButtons();

    console.log('所有交互功能已初始化');
}

// 告警系统过滤
function initAlertFilters() {
    const filterButtons = document.querySelectorAll('.alert-list-section .filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有活动状态
            filterButtons.forEach(b => b.classList.remove('active'));

            // 添加当前活动状态
            this.classList.add('active');

            const filterType = this.textContent;
            console.log('告警过滤器:', filterType);
            alert('已应用过滤器: ' + filterType);
        });
    });
}

// 告警操作按钮
function initAlertActions() {
    const actionButtons = document.querySelectorAll('.alert-detail-item .action-btn');

    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const actionType = this.textContent;
            const alertItem = this.closest('.alert-detail-item');
            const alertType = alertItem.querySelector('.alert-type').textContent;

            console.log('告警操作:', actionType, alertType);

            if (actionType === '立即处理') {
                alert('正在处理告警: ' + alertType);
            } else if (actionType === '查看详情') {
                alert('查看告警详情: ' + alertType);
            } else if (actionType === '忽略') {
                alert('已忽略告警: ' + alertType);
                alertItem.style.opacity = '0.5';
            }
        });
    });
}

// 权限管理操作
function initPermissionActions() {
    // 刷新按钮
    const refreshBtn = document.querySelector('.btn-refresh-users');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.textContent = '🔄 刷新中...';
            setTimeout(() => {
                refreshBtn.textContent = '🔄 刷新';
                alert('用户权限数据已刷新！');
            }, 2000);
        });
    }

    // 角色筛选
    const roleFilter = document.querySelector('.role-filter');
    if (roleFilter) {
        roleFilter.addEventListener('change', function() {
            filterUserTable(this.value);
        });
    }

    // 用户权限表格行点击
    const userRows = document.querySelectorAll('.user-row');
    userRows.forEach(row => {
        row.addEventListener('click', function() {
            const userName = this.cells[0].textContent;
            const role = this.querySelector('.role-badge').textContent;
            const department = this.cells[2].textContent;
            const permissionLevel = this.querySelector('.permission-level-badge').textContent;
            const status = this.querySelector('.status-badge').textContent;
            const lastLogin = this.cells[5].textContent;
            const permissions = this.cells[6].textContent;

            showUserDetails(userName, role, department, permissionLevel, status, lastLogin, permissions);
        });

        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // 权限配置表格行点击
    const permissionConfigRows = document.querySelectorAll('.permission-config-row');
    permissionConfigRows.forEach(row => {
        row.addEventListener('click', function() {
            const permissionName = this.cells[0].textContent;
            const description = this.cells[1].textContent;
            const applicableRoles = this.cells[2].textContent;
            const status = this.querySelector('.config-status-badge').textContent;
            const createTime = this.cells[4].textContent;

            showPermissionConfigDetails(permissionName, description, applicableRoles, status, createTime);
        });

        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // 添加权限按钮
    const addPermissionBtn = document.querySelector('.btn-add-permission');
    if (addPermissionBtn) {
        addPermissionBtn.addEventListener('click', function() {
            alert('打开添加权限对话框\n\n权限信息：\n- 权限名称\n- 权限描述\n- 适用角色\n- 权限范围');
        });
    }

    // 权限操作按钮
    const permissionButtons = document.querySelectorAll('.permission-simple-btn');
    permissionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const operation = this.getAttribute('data-op');
            handlePermissionOperation(operation);
        });
    });
}

// 筛选用户表格
function filterUserTable(roleType) {
    const rows = document.querySelectorAll('.user-row');
    rows.forEach(row => {
        const roleBadge = row.querySelector('.role-badge');
        const roleText = roleBadge ? roleBadge.textContent.toLowerCase() : '';

        let showRow = true;
        if (roleType === 'admin') {
            showRow = row.classList.contains('admin');
        } else if (roleType === 'ops') {
            showRow = row.classList.contains('ops');
        } else if (roleType === 'user') {
            showRow = row.classList.contains('user');
        }

        row.style.display = showRow ? '' : 'none';
    });

    const roleText = roleType === 'all' ? '全部角色' :
                      roleType === 'admin' ? '管理员' :
                      roleType === 'ops' ? '运维人员' : '普通用户';
    console.log('用户角色筛选:', roleText);
}

// 显示用户详情
function showUserDetails(userName, role, department, permissionLevel, status, lastLogin, permissions) {
    const roleInfo = {
        '管理员': { priority: '最高', access: '全部系统功能', approval: '不需要' },
        '运维人员': { priority: '高', access: '监控、配置、日志', approval: '部分需要' },
        '普通用户': { priority: '中', access: '查看、导出', approval: '不需要' }
    };

    const info = roleInfo[role] || roleInfo['普通用户'];

    alert(`用户权限详情\n\n基本信息：\n- 用户名：${userName}\n- 角色：${role}\n- 部门：${department}\n- 权限级别：${permissionLevel}\n- 状态：${status}\n- 最后登录：${lastLogin}\n\n权限信息：\n- 操作权限：${permissions}\n- 优先级：${info.priority}\n- 访问范围：${info.access}\n- 审批要求：${info.approval}\n\n安全记录：\n- 登录次数：${Math.floor(Math.random() * 500) + 100}次\n- 异常登录：0次\n- 权限变更：${Math.floor(Math.random() * 5)}次\n\n可用操作：\n1. 修改用户信息\n2. 调整权限级别\n3. 重置密码\n4. 查看操作日志`);
}

// 显示权限配置详情
function showPermissionConfigDetails(permissionName, description, applicableRoles, status, createTime) {
    const statusInfo = {
        '启用': { effect: '生效中', users: '所有适用角色', risk: '已评估' },
        '禁用': { effect: '未生效', users: '无', risk: '无风险' }
    };

    const info = statusInfo[status] || statusInfo['禁用'];

    alert(`权限配置详情\n\n基本信息：\n- 权限名称：${permissionName}\n- 权限描述：${description}\n- 适用角色：${applicableRoles}\n- 状态：${status}\n- 创建时间：${createTime}\n\n生效情况：\n- 生效状态：${info.effect}\n- 影响用户：${info.users}\n- 风险评估：${info.risk}\n\n权限范围：\n- 数据访问：${permissionName.includes('数据') ? '是' : '否'}\n- 系统操作：${permissionName.includes('系统') || permissionName.includes('配置') ? '是' : '否'}\n- 日志查看：${permissionName.includes('日志') ? '是' : '否'}\n\n可用操作：\n${status === '启用' ? '1. 修改权限配置\n2. 暂停权限\n3. 查看使用记录\n4. 权限风险评估' : '1. 修改权限配置\n2. 启用权限\n3. 删除权限'}`);
}

// 处理权限操作
function handlePermissionOperation(operation) {
    switch(operation) {
        case 'add-user':
            alert('打开添加用户对话框\n\n用户信息：\n- 用户名\n- 密码\n- 角色\n- 部门\n- 联系方式\n\n权限设置：\n- 权限级别\n- 访问范围\n- 特殊权限');
            break;
        case 'modify-permission':
            alert('打开权限修改对话框\n\n选择用户：\n- 搜索用户\n- 选择角色\n\n权限设置：\n- 权限级别调整\n- 访问范围修改\n- 特殊权限配置\n\n审批流程：\n- 权限提升需要审批\n- 记录变更原因');
            break;
        case 'audit':
            alert('权限审查已启动...\n\n审查项目：\n- 用户权限验证\n- 角色分配检查\n- 权限使用审计\n- 异常权限检测\n\n审查范围：\n- 所有用户权限\n- 系统权限配置\n- 访问日志分析\n\n预计完成时间：30分钟');
            break;
        case 'role-manage':
            alert('打开角色管理对话框\n\n角色列表：\n- 管理员（3人）\n- 运维人员（12人）\n- 普通用户（141人）\n\n可用操作：\n1. 创建新角色\n2. 修改角色权限\n3. 删除角色\n4. 角色权限模板');
            break;
    }
}

// 备份操作
function initBackupActions() {
    // 拓扑图控制按钮
    const refreshBackupTopologyBtn = document.querySelector('.btn-refresh-backup-topology');
    const expandBackupTopologyBtn = document.querySelector('.btn-expand-backup-topology');

    if (refreshBackupTopologyBtn) {
        refreshBackupTopologyBtn.addEventListener('click', () => {
            refreshBackupTopology();
        });
    }

    if (expandBackupTopologyBtn) {
        expandBackupTopologyBtn.addEventListener('click', () => {
            alert('扩大拓扑图视图\n显示更多备份位置详细信息');
        });
    }

    // 拓扑节点点击
    const backupTopologyNodes = document.querySelectorAll('.backup-topology-section .topology-node');
    backupTopologyNodes.forEach(node => {
        node.addEventListener('click', function() {
            const backupId = this.getAttribute('data-backup-id');
            const score = this.getAttribute('data-score');
            showBackupDetails(backupId, score);
        });
    });

    // 备份任务筛选
    const backupFilterButtons = document.querySelectorAll('.backup-task-details .filter-btn');
    backupFilterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            backupFilterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterType = this.getAttribute('data-filter');
            filterBackupTasks(filterType);
        });
    });

    // 备份任务操作按钮
    const backupTaskButtons = document.querySelectorAll('#backupTaskTableBody .action-link');
    backupTaskButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.classList.contains('btn-backup-check') ? '检查' :
                          this.classList.contains('btn-backup-restart') ? '重启' : '详情';

            const row = this.closest('tr');
            const backupId = row.cells[0].textContent;
            handleBackupTaskAction(action, backupId);
        });
    });

    // 备份日志控制
    const pauseBackupLogsBtn = document.querySelector('.btn-pause-backup-logs');
    const clearBackupLogsBtn = document.querySelector('.btn-clear-backup-logs');
    const exportBackupLogsBtn = document.querySelector('.btn-export-backup-logs');

    if (pauseBackupLogsBtn) {
        pauseBackupLogsBtn.addEventListener('click', toggleBackupLogUpdates);
    }

    if (clearBackupLogsBtn) {
        clearBackupLogsBtn.addEventListener('click', () => {
            if (confirm('确定要清空所有备份日志吗？')) {
                document.getElementById('backupLogsContainer').innerHTML = '';
            }
        });
    }

    if (exportBackupLogsBtn) {
        exportBackupLogsBtn.addEventListener('click', () => {
            alert('正在导出备份日志...\n格式：TXT\n包含：所有备份日志记录');
        });
    }

    // 备份异常时间筛选
    const exceptionTimeButtons = document.querySelectorAll('.backup-exceptions .filter-btn');
    exceptionTimeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            exceptionTimeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const timeRange = this.getAttribute('data-time');
            filterBackupExceptions(timeRange);
        });
    });

    // 备份异常操作按钮
    const exceptionActionButtons = document.querySelectorAll('.backup-exceptions .btn');
    exceptionActionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList.contains('btn-view-exception') ? '查看详情' :
                          this.classList.contains('btn-cleanup-backup') ? '清理备份' :
                          this.classList.contains('btn-retry-sync') ? '重试同步' : '验证备份';

            const exceptionItem = this.closest('.blocked-item');
            const exceptionType = exceptionItem.querySelector('.blocked-type').textContent;
            handleBackupExceptionAction(action, exceptionType);
        });
    });

    // 启动实时备份日志更新
    startRealTimeBackupLogUpdates();
}

// 日志搜索和过滤
function initLogFilters() {
    // 拓扑图控制按钮
    const refreshLogTopologyBtn = document.querySelector('.btn-refresh-log-topology');
    const expandLogTopologyBtn = document.querySelector('.btn-expand-log-topology');

    if (refreshLogTopologyBtn) {
        refreshLogTopologyBtn.addEventListener('click', () => {
            refreshLogTopology();
        });
    }

    if (expandLogTopologyBtn) {
        expandLogTopologyBtn.addEventListener('click', () => {
            alert('扩大拓扑图视图\n显示更多日志源详细信息');
        });
    }

    // 拓扑节点点击
    const logTopologyNodes = document.querySelectorAll('.log-topology-section .topology-node');
    logTopologyNodes.forEach(node => {
        node.addEventListener('click', function() {
            const logId = this.getAttribute('data-log-id');
            const score = this.getAttribute('data-score');
            showLogSourceDetails(logId, score);
        });
    });

    // 日志类型筛选
    const logFilterButtons = document.querySelectorAll('.log-type-details .filter-btn');
    logFilterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            logFilterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterType = this.getAttribute('data-filter');
            filterLogTypes(filterType);
        });
    });

    // 日志类型操作按钮
    const logTypeButtons = document.querySelectorAll('#logTypeTableBody .action-link');
    logTypeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.classList.contains('btn-log-check') ? '检查' :
                          this.classList.contains('btn-log-restart') ? '重启' : '详情';

            const row = this.closest('tr');
            const logId = row.cells[0].textContent;
            handleLogTypeAction(action, logId);
        });
    });

    // 安全日志控制
    const pauseSecurityLogsBtn = document.querySelector('.btn-pause-security-logs');
    const clearSecurityLogsBtn = document.querySelector('.btn-clear-security-logs');
    const exportSecurityLogsBtn = document.querySelector('.btn-export-security-logs');

    if (pauseSecurityLogsBtn) {
        pauseSecurityLogsBtn.addEventListener('click', toggleSecurityLogUpdates);
    }

    if (clearSecurityLogsBtn) {
        clearSecurityLogsBtn.addEventListener('click', () => {
            if (confirm('确定要清空所有安全日志吗？')) {
                document.getElementById('securityLogsContainer').innerHTML = '';
            }
        });
    }

    if (exportSecurityLogsBtn) {
        exportSecurityLogsBtn.addEventListener('click', () => {
            alert('正在导出安全日志...\n格式：TXT\n包含：所有安全日志记录');
        });
    }

    // 安全事件时间筛选
    const eventTimeButtons = document.querySelectorAll('.security-events .filter-btn');
    eventTimeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            eventTimeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const timeRange = this.getAttribute('data-time');
            filterSecurityEvents(timeRange);
        });
    });

    // 安全事件操作按钮
    const eventActionButtons = document.querySelectorAll('.security-events .btn');
    eventActionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList.contains('btn-view-event') ? '查看详情' :
                          this.classList.contains('btn-investigate-event') ? '深入调查' :
                          this.classList.contains('btn-analyze-attack') ? '攻击分析' : '权限审查';

            const eventItem = this.closest('.blocked-item');
            const eventType = eventItem.querySelector('.blocked-type').textContent;
            handleSecurityEventAction(action, eventType);
        });
    });

    // 启动实时安全日志更新
    startRealTimeSecurityLogUpdates();
}

// 合规检测操作
function initComplianceActions() {
    // 拓扑图控制按钮
    const refreshComplianceTopologyBtn = document.querySelector('.btn-refresh-compliance-topology');
    const expandComplianceTopologyBtn = document.querySelector('.btn-expand-compliance-topology');

    if (refreshComplianceTopologyBtn) {
        refreshComplianceTopologyBtn.addEventListener('click', () => {
            refreshComplianceTopology();
        });
    }

    if (expandComplianceTopologyBtn) {
        expandComplianceTopologyBtn.addEventListener('click', () => {
            alert('扩大拓扑图视图\n显示更多法规详细信息');
        });
    }

    // 拓扑节点点击
    const complianceTopologyNodes = document.querySelectorAll('.compliance-topology-section .topology-node');
    complianceTopologyNodes.forEach(node => {
        node.addEventListener('click', function() {
            const complianceId = this.getAttribute('data-compliance-id');
            const score = this.getAttribute('data-score');
            showComplianceDetails(complianceId, score);
        });
    });

    // 合规检测筛选
    const complianceFilterButtons = document.querySelectorAll('.compliance-check-details .filter-btn');
    complianceFilterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            complianceFilterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterType = this.getAttribute('data-filter');
            filterComplianceChecks(filterType);
        });
    });

    // 合规检测操作按钮
    const complianceCheckButtons = document.querySelectorAll('#complianceCheckTableBody .action-link');
    complianceCheckButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.classList.contains('btn-compliance-check') ? '检查' : '详情';

            const row = this.closest('tr');
            const complianceId = row.cells[0].textContent;
            handleComplianceCheckAction(action, complianceId);
        });
    });

    // 合规日志控制
    const pauseComplianceLogsBtn = document.querySelector('.btn-pause-compliance-logs');
    const clearComplianceLogsBtn = document.querySelector('.btn-clear-compliance-logs');
    const exportComplianceLogsBtn = document.querySelector('.btn-export-compliance-logs');

    if (pauseComplianceLogsBtn) {
        pauseComplianceLogsBtn.addEventListener('click', toggleComplianceLogUpdates);
    }

    if (clearComplianceLogsBtn) {
        clearComplianceLogsBtn.addEventListener('click', () => {
            if (confirm('确定要清空所有合规检测日志吗？')) {
                document.getElementById('complianceLogsContainer').innerHTML = '';
            }
        });
    }

    if (exportComplianceLogsBtn) {
        exportComplianceLogsBtn.addEventListener('click', () => {
            alert('正在导出合规检测日志...\n格式：TXT\n包含：所有合规检测日志记录');
        });
    }

    // 不合规项时间筛选
    const violationTimeButtons = document.querySelectorAll('.compliance-violations .filter-btn');
    violationTimeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            violationTimeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const timeRange = this.getAttribute('data-time');
            filterComplianceViolations(timeRange);
        });
    });

    // 不合规项操作按钮
    const violationActionButtons = document.querySelectorAll('.compliance-violations .btn');
    violationActionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList.contains('btn-view-violation') ? '查看详情' :
                          this.classList.contains('btn-update-remediation') ? '更新进度' :
                          this.classList.contains('btn-start-remediation') ? '开始整改' : '验证整改';

            const violationItem = this.closest('.blocked-item');
            const violationType = violationItem.querySelector('.blocked-type').textContent;
            handleComplianceViolationAction(action, violationType);
        });
    });

    // 启动实时合规日志更新
    startRealTimeComplianceLogUpdates();
}

// 通用查看按钮
function initViewButtons() {
    const allViewButtons = document.querySelectorAll('.action-link, .action-btn');

    allViewButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 数据加密管理功能
function initEncryptionFeatures() {
    // 刷新按钮
    const refreshBtn = document.querySelector('.btn-refresh-encryption');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.textContent = '🔄 刷新中...';
            setTimeout(() => {
                refreshBtn.textContent = '🔄 刷新';
                alert('加密数据已刷新！\n实时加密状态已更新');
            }, 2000);
        });
    }

    // 加密筛选
    const encryptionFilter = document.querySelector('.encryption-filter');
    if (encryptionFilter) {
        encryptionFilter.addEventListener('change', function() {
            filterEncryptionTable(this.value);
        });
    }

    // 加密表格行点击
    const encryptionRows = document.querySelectorAll('.encryption-row');
    encryptionRows.forEach(row => {
        row.addEventListener('click', function() {
            const customerName = this.cells[0].textContent;
            const dataType = this.cells[1].textContent;
            const fileCount = this.cells[2].textContent;
            const dataSize = this.cells[3].textContent;
            const encryptionStatus = this.querySelector('.encryption-badge').textContent;
            const algorithm = this.cells[5].textContent;
            const encryptionTime = this.cells[6].textContent;
            const sslStatus = this.querySelector('.ssl-badge').textContent;

            showEncryptionDetails(customerName, dataType, fileCount, dataSize, encryptionStatus, algorithm, encryptionTime, sslStatus);
        });

        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // 密钥表格行点击
    const keyRows = document.querySelectorAll('.key-row');
    keyRows.forEach(row => {
        row.addEventListener('click', function() {
            const keyName = this.cells[0].textContent;
            const keyType = this.cells[1].textContent;
            const algorithm = this.cells[2].textContent;
            const createTime = this.cells[3].textContent;
            const status = this.querySelector('.key-status-badge').textContent;
            const usageCount = this.cells[5].textContent;
            const nextRotation = this.cells[6].textContent;

            showKeyDetails(keyName, keyType, algorithm, createTime, status, usageCount, nextRotation);
        });

        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // 生成新密钥按钮
    const createKeyBtn = document.querySelector('.btn-create-key');
    if (createKeyBtn) {
        createKeyBtn.addEventListener('click', function() {
            if (confirm('确定要生成新的加密密钥吗？')) {
                this.textContent = '⏳ 生成中...';
                this.disabled = true;

                setTimeout(() => {
                    this.textContent = '➕ 生成新密钥';
                    this.disabled = false;
                    alert('新密钥生成成功！\n密钥ID：#2024042901\n算法：AES-256-GCM');
                }, 2000);
            }
        });
    }

    // 加密操作按钮
    const operationButtons = document.querySelectorAll('.operation-simple-btn');
    operationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const operation = this.getAttribute('data-op');
            handleEncryptionOperation(operation);
        });
    });

    console.log('数据加密管理功能已初始化');
}

// 筛选加密表格
function filterEncryptionTable(filterType) {
    const rows = document.querySelectorAll('.encryption-row');
    rows.forEach(row => {
        const statusBadge = row.querySelector('.encryption-badge');
        const statusText = statusBadge ? statusBadge.textContent : '';

        let showRow = true;
        if (filterType === 'encrypted') {
            showRow = statusText === '已加密';
        } else if (filterType === 'pending') {
            showRow = statusText === '待加密';
        } else if (filterType === 'failed') {
            showRow = statusText === '加密失败';
        }

        row.style.display = showRow ? '' : 'none';
    });

    const filterText = filterType === 'all' ? '全部状态' :
                      filterType === 'encrypted' ? '已加密' :
                      filterType === 'pending' ? '待加密' : '加密失败';
    console.log('加密状态筛选:', filterText);
}

// 显示加密详情
function showEncryptionDetails(customerName, dataType, fileCount, dataSize, encryptionStatus, algorithm, encryptionTime, sslStatus) {
    const details = {
        '已加密': {
            security: '高',
            access: '需要解密密钥',
            backup: '已备份'
        },
        '待加密': {
            security: '低',
            access: '直接访问',
            backup: '未备份'
        },
        '加密失败': {
            security: '未知',
            access: '访问受限',
            backup: '部分备份'
        }
    };

    const detail = details[encryptionStatus] || details['待加密'];

    alert(`数据加密详情\n\n基本信息：\n- 客户名称：${customerName}\n- 数据类型：${dataType}\n- 文件数量：${fileCount}\n- 数据大小：${dataSize}\n\n加密信息：\n- 加密状态：${encryptionStatus}\n- 加密算法：${algorithm}\n- 加密时间：${encryptionTime}\n- 传输加密：${sslStatus}\n\n安全评估：\n- 安全级别：${detail.security}\n- 访问控制：${detail.access}\n- 备份状态：${detail.backup}\n\n建议操作：\n${encryptionStatus === '已加密' ? '1. 定期检查密钥有效性\n2. 监控加密性能\n3. 计划密钥轮换' : encryptionStatus === '待加密' ? '1. 立即执行加密操作\n2. 选择合适的加密算法\n3. 配置加密策略' : '1. 检查加密失败原因\n2. 修复加密配置\n3. 重新执行加密'}`);
}

// 显示密钥详情
function showKeyDetails(keyName, keyType, algorithm, createTime, status, usageCount, nextRotation) {
    const keyInfo = {
        '主密钥': { priority: '最高', access: '限制访问', rotation: '30天' },
        '备份密钥': { priority: '高', access: '限制访问', rotation: '90天' },
        '传输密钥': { priority: '中', access: '受控访问', rotation: '30天' }
    };

    const info = keyInfo[keyType] || { priority: '标准', access: '标准访问', rotation: '按需' };

    alert(`密钥详情\n\n基本信息：\n- 密钥名称：${keyName}\n- 密钥类型：${keyType}\n- 加密算法：${algorithm}\n- 创建时间：${createTime}\n- 状态：${status}\n\n使用情况：\n- 使用次数：${usageCount}\n- 下次轮换：${nextRotation}\n\n密钥属性：\n- 优先级：${info.priority}\n- 访问控制：${info.access}\n- 轮换周期：${info.rotation}\n\n安全措施：\n- 密钥存储：硬件安全模块(HSM)\n- 访问日志：启用\n- 多因素认证：启用\n\n可用操作：\n${status === '活跃' ? '1. 查看密钥信息\n2. 执行密钥轮换\n3. 查看使用日志' : '1. 查看密钥信息\n2. 激活密钥\n3. 删除密钥'}`);
}

// 处理加密操作
function handleEncryptionOperation(operation) {
    switch(operation) {
        case 'encrypt':
            alert('打开文件加密对话框\n选择要加密的文件或文件夹\n\n支持格式：\n- 数据集文件\n- 训练脚本\n- 模型参数\n- 配置文件');
            break;
        case 'decrypt':
            alert('打开文件解密对话框\n选择要解密的文件\n\n注意事项：\n- 需要相应的解密密钥\n- 解密后数据将不再受保护\n- 建议在安全环境中操作');
            break;
        case 'rotate':
            if (confirm('确定要执行密钥轮换操作吗？\n这将重新生成所有加密密钥。\n\n预计时间：2小时\n影响范围：所有加密数据')) {
                alert('密钥轮换已启动...\n\n进度：\n1. 生成新密钥 (进行中)\n2. 重新加密数据 (等待中)\n3. 验证数据完整性 (等待中)\n4. 清理旧密钥 (等待中)\n\n预计完成时间：2小时后');
            }
            break;
        case 'report':
            alert('正在生成加密报告...\n\n报告内容：\n- 加密文件统计\n- 密钥使用情况\n- 加密性能分析\n- 合规性检查结果\n\n预计完成时间：5分钟');
            break;
    }
}

// 模拟数据
const mockData = {
    securityStatus: '安全',
    threatCount: 0,
    attackBlocked: 12,
    systemUptime: '72天 8小时',
    activeUsers: 156,
    dataProtectionRate: '99.9%'
};

// 启动实时数据更新
function startRealTimeUpdates() {
    // 每30秒更新一次数据
    setInterval(updateDashboardData, 30000);

    // 每10秒更新活跃用户数
    setInterval(updateActiveUsers, 10000);

    // 每60秒更新威胁检测
    setInterval(updateThreatCount, 60000);

    console.log('实时数据更新已启动');
}

// 更新仪表盘数据
function updateDashboardData() {
    // 模拟数据更新
    mockData.attackBlocked = Math.floor(Math.random() * 20) + 10;
    const attackBlockedElement = document.getElementById('attackBlocked');
    if (attackBlockedElement) {
        const valueElement = attackBlockedElement.querySelector('.status-value');
        if (valueElement) {
            valueElement.textContent = mockData.attackBlocked;
            // 添加闪烁效果
            valueElement.style.color = '#667eea';
            setTimeout(() => {
                valueElement.style.color = '#1a2332';
            }, 1000);
        }
    }

    console.log('仪表盘数据已更新:', mockData);
}

// 更新活跃用户数
function updateActiveUsers() {
    const fluctuation = Math.floor(Math.random() * 10) - 5; // -5 到 +5 的波动
    mockData.activeUsers = Math.max(100, Math.min(200, mockData.activeUsers + fluctuation));

    console.log('活跃用户数已更新:', mockData.activeUsers);
}

// 更新威胁检测数量
function updateThreatCount() {
    // 随机增加一些威胁，然后清零
    mockData.threatCount = Math.floor(Math.random() * 5);

    const threatCountElement = document.getElementById('threatCount');
    if (threatCountElement) {
        const valueElement = threatCountElement.querySelector('.status-value');
        if (valueElement) {
            valueElement.textContent = mockData.threatCount;

            // 如果有威胁，改变样式
            if (mockData.threatCount > 0) {
                threatCountElement.classList.remove('status-good');
                threatCountElement.classList.add('status-warning');
            } else {
                threatCountElement.classList.remove('status-warning');
                threatCountElement.classList.add('status-good');
            }
        }
    }

    console.log('威胁检测数量已更新:', mockData.threatCount);
}

// 安全告警模拟数据
const alertData = [
    {
        id: 1,
        type: '网络攻击',
        level: '高危',
        message: '检测到DDOS攻击尝试',
        time: '2024-04-28 10:30:00',
        status: '已处理'
    },
    {
        id: 2,
        type: '权限异常',
        level: '中危',
        message: '检测到异常登录尝试',
        time: '2024-04-28 09:15:00',
        status: '处理中'
    },
    {
        id: 3,
        type: '病毒威胁',
        level: '低危',
        message: '发现可疑文件访问',
        time: '2024-04-28 08:45:00',
        status: '待处理'
    }
];

// 用户权限模拟数据
const userData = [
    {
        id: 1,
        name: '张三',
        role: '管理员',
        department: '技术部',
        status: '在线',
        lastLogin: '2024-04-28 10:00:00'
    },
    {
        id: 2,
        name: '李四',
        role: '运维人员',
        department: '运维部',
        status: '在线',
        lastLogin: '2024-04-28 09:30:00'
    },
    {
        id: 3,
        name: '王五',
        role: '客户',
        department: '外部',
        status: '离线',
        lastLogin: '2024-04-27 18:00:00'
    }
];

// 备份历史数据
const backupData = [
    {
        id: 1,
        type: '完整备份',
        size: '500GB',
        status: '成功',
        time: '2024-04-28 08:00:00'
    },
    {
        id: 2,
        type: '增量备份',
        size: '50GB',
        status: '成功',
        time: '2024-04-28 04:00:00'
    },
    {
        id: 3,
        type: '完整备份',
        size: '495GB',
        status: '成功',
        time: '2024-04-27 08:00:00'
    }
];

// 安全日志数据
const logData = [
    {
        id: 1,
        type: '登录日志',
        user: '张三',
        action: '用户登录',
        ip: '192.168.1.100',
        time: '2024-04-28 10:00:00',
        status: '成功'
    },
    {
        id: 2,
        type: '安全日志',
        user: '系统',
        action: '防火墙规则更新',
        ip: '127.0.0.1',
        time: '2024-04-28 09:00:00',
        status: '成功'
    },
    {
        id: 3,
        type: '访问日志',
        user: '李四',
        action: '查看系统日志',
        ip: '192.168.1.101',
        time: '2024-04-28 08:30:00',
        status: '成功'
    }
];

// 合规检测数据
const complianceData = {
    overallStatus: '符合',
    regulations: [
        {
            name: '网络安全法',
            status: '符合',
            score: 98
        },
        {
            name: '数据安全法',
            status: '符合',
            score: 96
        },
        {
            name: '个人信息保护法',
            status: '符合',
            score: 95
        },
        {
            name: '等级保护2.0',
            status: '待更新',
            score: 85
        }
    ],
    lastCheck: '2024-04-25 14:30:00',
    nextCheck: '2024-05-02 14:30:00'
};

// 模拟数据初始化
function initMockData() {
    console.log('系统模块数据准备完成');
    console.log('告警数据:', alertData);
    console.log('用户数据:', userData);
    console.log('备份数据:', backupData);
    console.log('日志数据:', logData);
    console.log('合规数据:', complianceData);
}

// 导出函数供其他模块使用
window.securitySystem = {
    alertData,
    userData,
    backupData,
    logData,
    complianceData,
    mockData,
    updateDashboardData,
    showPage,
    alert: function(message) {
        alert(message);
    }
};

console.log('安全系统功能模块已加载完成');

// 病毒防护功能
function initAntivirusFeatures() {
    // 刷新按钮
    const refreshBtn = document.querySelector('.btn-refresh-threats');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.textContent = '🔄 刷新中...';
            setTimeout(() => {
                refreshBtn.textContent = '🔄 刷新';
                alert('威胁检测数据已刷新！');
            }, 2000);
        });
    }

    // 威胁筛选
    const threatFilter = document.querySelector('.threat-filter');
    if (threatFilter) {
        threatFilter.addEventListener('change', function() {
            filterThreatTable(this.value);
        });
    }

    // 威胁表格行点击
    const threatRows = document.querySelectorAll('.threat-row');
    threatRows.forEach(row => {
        row.addEventListener('click', function() {
            const threatName = this.cells[0].textContent;
            const threatType = this.cells[1].textContent;
            const severity = this.querySelector('.severity-badge').textContent;
            const discoveryTime = this.cells[3].textContent;
            const infectedNode = this.cells[4].textContent;
            const status = this.querySelector('.threat-status-badge').textContent;
            const handlingMethod = this.cells[6].textContent;

            showThreatDetails(threatName, threatType, severity, discoveryTime, infectedNode, status, handlingMethod);
        });

        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // 病毒库表格行点击
    const databaseRows = document.querySelectorAll('.database-row');
    databaseRows.forEach(row => {
        row.addEventListener('click', function() {
            const dbName = this.cells[0].textContent;
            const version = this.cells[1].textContent;
            const virusCount = this.cells[2].textContent;
            const updateTime = this.cells[3].textContent;
            const autoUpdate = this.querySelector('.auto-update-badge').textContent;
            const status = this.querySelector('.database-status-badge').textContent;

            showDatabaseDetails(dbName, version, virusCount, updateTime, autoUpdate, status);
        });

        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // 更新病毒库按钮
    const updateDbBtn = document.querySelector('.btn-update-database');
    if (updateDbBtn) {
        updateDbBtn.addEventListener('click', function() {
            this.textContent = '⏳ 更新中...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = '🔄 立即更新';
                this.disabled = false;
                alert('病毒库更新成功！\n\n更新详情：\n- 新版本：2024.04.30\n- 更新文件：1,234个\n- 新增病毒定义：56个\n- 更新时间：2分钟');
            }, 2000);
        });
    }

    // 防护操作按钮
    const protectionButtons = document.querySelectorAll('.protection-simple-btn');
    protectionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const operation = this.getAttribute('data-op');
            handleProtectionOperation(operation);
        });
    });

    console.log('病毒防护功能已初始化');
}

// 筛选威胁表格
function filterThreatTable(statusType) {
    const rows = document.querySelectorAll('.threat-row');
    rows.forEach(row => {
        const statusBadge = row.querySelector('.threat-status-badge');
        const statusText = statusBadge ? statusBadge.textContent : '';

        let showRow = true;
        if (statusType === 'handled') {
            showRow = statusText === '已隔离' || statusText === '已删除' || statusText === '已清除';
        } else if (statusType === 'processing') {
            showRow = statusText === '监控中';
        } else if (statusType === 'pending') {
            showRow = statusText === '待处理';
        }

        row.style.display = showRow ? '' : 'none';
    });

    const statusText = statusType === 'all' ? '全部状态' :
                      statusType === 'handled' ? '已处理' :
                      statusType === 'processing' ? '处理中' : '待处理';
    console.log('威胁状态筛选:', statusText);
}

// 显示威胁详情
function showThreatDetails(threatName, threatType, severity, discoveryTime, infectedNode, status, handlingMethod) {
    const severityInfo = {
        '极高危': { risk: '极高风险', impact: '系统完全被控制', action: '立即清除' },
        '高危': { risk: '高风险', impact: '数据泄露或系统损坏', action: '紧急处理' },
        '中危': { risk: '中等风险', impact: '影响系统性能或数据', action: '及时处理' },
        '低危': { risk: '低风险', impact: '影响较小', action: '监控观察' }
    };

    const info = severityInfo[severity] || severityInfo['低危'];

    alert(`威胁详情\n\n基本信息：\n- 威胁名称：${threatName}\n- 威胁类型：${threatType}\n- 严重程度：${severity}\n- 发现时间：${discoveryTime}\n- 感染节点：${infectedNode}\n- 处理状态：${status}\n- 处理方式：${handlingMethod}\n\n风险评估：\n- 风险级别：${info.risk}\n- 影响评估：${info.impact}\n- 建议操作：${info.action}\n\n技术信息：\n- 文件路径：/tmp/infected/${threatName}\n- 文件大小：${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9)} MB\n- MD5哈希：${generateMD5Hash()}\n- SHA256：${generateSHA256Hash()}\n\n处理记录：\n- 发现方式：实时扫描\n- 隔离时间：${discoveryTime}\n- 处理人员：系统自动\n- 处理耗时：${Math.floor(Math.random() * 60) + 10}秒`);
}

// 显示病毒库详情
function showDatabaseDetails(dbName, version, virusCount, updateTime, autoUpdate, status) {
    alert(`病毒库详情\n\n基本信息：\n- 病毒库名称：${dbName}\n- 当前版本：${version}\n- 病毒定义数量：${virusCount}\n- 更新时间：${updateTime}\n- 自动更新：${autoUpdate}\n- 状态：${status}\n\n更新配置：\n- 更新频率：每日自动更新\n- 更新源：官方服务器\n- 验证方式：数字签名验证\n\n病毒库类型：\n- 已知病毒：${Math.floor(virusCount.replace(/,/g, '') * 0.7).toLocaleString()}\n- 木马程序：${Math.floor(virusCount.replace(/,/g, '') * 0.2).toLocaleString()}\n- 蠕虫病毒：${Math.floor(virusCount.replace(/,/g, '') * 0.05).toLocaleString()}\n- 其他威胁：${Math.floor(virusCount.replace(/,/g, '') * 0.05).toLocaleString()}\n\n安全建议：\n${status === '最新' ? '1. 病毒库为最新版本\n2. 防护状态良好\n3. 继续保持自动更新' : '1. 病毒库需要更新\n2. 建议立即手动更新\n3. 检查自动更新设置'}`);
}

// 处理防护操作
function handleProtectionOperation(operation) {
    switch(operation) {
        case 'quick-scan':
            alert('启动系统扫描\n\n扫描配置：\n- 扫描类型：快速扫描\n- 扫描范围：系统关键区域\n- 预计耗时：3-5分钟\n- 扫描文件：约50,000个\n\n扫描内容：\n- 系统文件\n- 启动项\n- 注册表项\n- 常用目录');
            break;
        case 'update-db':
            alert('更新病毒库\n\n当前状态：\n- 当前版本：2024.04.30\n- 可用更新：2024.04.30（最新）\n\n更新内容：\n- 新增病毒定义：56个\n- 更新特征库：23个\n- 优化检测算法：5项\n\n预计时间：2-3分钟');
            break;
        case 'view-logs':
            alert('查看防护日志\n\n日志类型：\n- 扫描日志\n- 威胁检测日志\n- 病毒库更新日志\n- 系统事件日志\n\n时间范围：\n- 今日：234条记录\n- 本周：1,567条记录\n- 本月：6,890条记录\n\n可用操作：\n1. 按时间筛选\n2. 按事件类型筛选\n3. 导出日志文件\n4. 搜索特定事件');
            break;
        case 'settings':
            alert('防护设置\n\n扫描设置：\n- 实时防护：启用\n- 定期扫描：每日02:00\n- 扫描范围：全盘扫描\n\n更新设置：\n- 自动更新：启用\n- 更新频率：每日\n- 更新时间：03:00\n\n告警设置：\n- 威胁告警：启用\n- 邮件通知：启用\n- 系统日志：启用\n\n隔离设置：\n- 自动隔离：启用\n- 隔离位置：/quarantine/\n- 保留期限：30天');
            break;
    }
}

// 生成MD5哈希（模拟）
function generateMD5Hash() {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 32; i++) {
        hash += chars[Math.floor(Math.random() * 16)];
    }
    return hash;
}

// 生成SHA256哈希（模拟）
function generateSHA256Hash() {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * 16)];
    }
    return hash;
}

// 节点安全监控功能
function initNodeMonitoringFeatures() {
    // 拓扑图控制按钮
    const refreshTopologyBtn = document.querySelector('.btn-refresh-topology');
    const expandTopologyBtn = document.querySelector('.btn-expand-topology');

    if (refreshTopologyBtn) {
        refreshTopologyBtn.addEventListener('click', () => {
            refreshTopology();
        });
    }

    if (expandTopologyBtn) {
        expandTopologyBtn.addEventListener('click', () => {
            alert('扩大拓扑图视图\n显示更多节点详细信息');
        });
    }

    // 拓扑节点点击
    const topologyNodes = document.querySelectorAll('.topology-node');
    topologyNodes.forEach(node => {
        node.addEventListener('click', function() {
            const nodeId = this.getAttribute('data-node-id');
            const score = this.getAttribute('data-score');
            showNodeDetails(nodeId, score);
        });
    });

    // 节点安全评分筛选
    const nodeFilterButtons = document.querySelectorAll('.node-security-details .filter-btn');
    nodeFilterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            nodeFilterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterType = this.getAttribute('data-filter');
            filterNodeSecurityTable(filterType);
        });
    });

    // 节点操作按钮
    const nodeActionButtons = document.querySelectorAll('#nodeSecurityTableBody .action-link');
    nodeActionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.classList.contains('btn-check-node') ? '检查' :
                          this.classList.contains('btn-restart-node') ? '重启' : '详情';

            const row = this.closest('tr');
            const nodeId = row.cells[0].textContent;
            handleNodeSecurityAction(action, nodeId);
        });
    });

    // 系统日志控制
    const pauseLogsBtn = document.querySelector('.btn-pause-logs');
    const clearLogsBtn = document.querySelector('.btn-clear-logs');
    const exportLogsBtn = document.querySelector('.btn-export-logs');

    if (pauseLogsBtn) {
        pauseLogsBtn.addEventListener('click', toggleLogUpdates);
    }

    if (clearLogsBtn) {
        clearLogsBtn.addEventListener('click', () => {
            if (confirm('确定要清空所有日志吗？')) {
                document.getElementById('systemLogsContainer').innerHTML = '';
            }
        });
    }

    if (exportLogsBtn) {
        exportLogsBtn.addEventListener('click', () => {
            alert('正在导出系统日志...\n格式：TXT\n包含：所有日志记录');
        });
    }

    // 异常操作阻断时间筛选
    const blockedTimeButtons = document.querySelectorAll('.blocked-operations .filter-btn');
    blockedTimeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            blockedTimeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const timeRange = this.getAttribute('data-time');
            filterBlockedOperations(timeRange);
        });
    });

    // 阻断操作按钮
    const blockedActionButtons = document.querySelectorAll('.blocked-actions .btn');
    blockedActionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList.contains('btn-view-blocked') ? '查看详情' : '允许操作';

            const blockedItem = this.closest('.blocked-item');
            const blockedType = blockedItem.querySelector('.blocked-type').textContent;
            handleBlockedAction(action, blockedType);
        });
    });

    // 启动实时日志更新
    startRealTimeLogUpdates();

    console.log('节点安全监控功能已初始化');
}

// 刷新拓扑图
function refreshTopology() {
    const refreshBtn = document.querySelector('.btn-refresh-topology');
    refreshBtn.textContent = '🔄 刷新中...';
    refreshBtn.disabled = true;

    setTimeout(() => {
        refreshBtn.textContent = '🔄 刷新';
        refreshBtn.disabled = false;
        alert('拓扑图已刷新！\n节点状态已更新');
    }, 2000);
}

// 显示节点详情
function showNodeDetails(nodeId, score) {
    const scoreInt = parseInt(score);
    let statusText = '';

    if (scoreInt >= 90) {
        statusText = '安全';
    } else if (scoreInt >= 70) {
        statusText = '警告';
    } else if (scoreInt > 0) {
        statusText = '危险';
    } else {
        statusText = '离线';
    }

    alert(`节点详情\n\n节点ID：${nodeId}\n安全评分：${score}\n状态：${statusText}\n\n系统信息：\n- 操作系统：Linux Ubuntu 22.04\n- CPU：Intel Xeon Gold 6248\n- 内存：256 GB\n- 存储：2 TB SSD\n\n网络信息：\n- 内网IP：192.168.1.100\n- 外网IP：203.0.113.1\n- 带宽：10 Gbps`);
}

// 筛选节点安全表格
function filterNodeSecurityTable(filterType) {
    const tableBody = document.getElementById('nodeSecurityTableBody');
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const scoreCell = row.cells[2];
        const scoreText = scoreCell.textContent.trim();
        let showRow = true;

        if (filterType === 'good') {
            showRow = scoreText.includes('9') || scoreText.includes('8');
        } else if (filterType === 'warning') {
            showRow = scoreText.includes('7') || scoreText.includes('6');
        } else if (filterType === 'danger') {
            showRow = scoreText.includes('5') || scoreText === '离线';
        }

        row.style.display = showRow ? '' : 'none';
    });

    console.log('节点安全筛选:', filterType);
}

// 处理节点安全操作
function handleNodeSecurityAction(action, nodeId) {
    switch(action) {
        case '检查':
            alert(`正在检查节点 ${nodeId} 的安全状态...\n检查项目：\n- 系统漏洞\n- 配置安全\n- 网络连接\n- 运行进程`);
            break;
        case '重启':
            if (confirm(`确定要重启节点 ${nodeId} 吗？\n注意：重启将中断所有运行任务。`)) {
                alert(`节点 ${nodeId} 重启中...\n预计重启时间：5分钟`);
            }
            break;
        case '详情':
            showNodeDetails(nodeId, '95'); // 默认分数
            break;
    }
}

// 日志更新控制
let logUpdatesEnabled = true;
let logUpdateInterval = null;

function toggleLogUpdates() {
    const pauseBtn = document.querySelector('.btn-pause-logs');

    if (logUpdatesEnabled) {
        logUpdatesEnabled = false;
        pauseBtn.textContent = '▶️ 继续';
        if (logUpdateInterval) {
            clearInterval(logUpdateInterval);
        }
    } else {
        logUpdatesEnabled = true;
        pauseBtn.textContent = '⏸️ 暂停';
        startRealTimeLogUpdates();
    }
}

// 启动实时日志更新
function startRealTimeLogUpdates() {
    if (logUpdateInterval) {
        clearInterval(logUpdateInterval);
    }

    const logMessages = [
        { node: 'NODE-001', level: 'INFO', message: '系统正常运行，CPU使用率：45%' },
        { node: 'NODE-002', level: 'SUCCESS', message: '备份任务完成，备份数据：2.3 GB' },
        { node: 'NODE-003', level: 'WARNING', message: '内存使用率超过80%，当前：82%' },
        { node: 'NODE-005', level: 'INFO', message: '网络连接正常，带宽使用：3.2 Gbps' },
        { node: 'NODE-006', level: 'ERROR', message: '检测到异常进程，PID：12345' },
        { node: 'NODE-008', level: 'SUCCESS', message: '安全扫描完成，未发现威胁' },
        { node: 'NODE-009', level: 'WARNING', message: '磁盘空间不足，剩余：15%' },
        { node: 'NODE-011', level: 'INFO', message: '用户登录成功，用户：admin' }
    ];

    logUpdateInterval = setInterval(() => {
        if (!logUpdatesEnabled) return;

        const logsContainer = document.getElementById('systemLogsContainer');
        const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
        const now = new Date();
        const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const logLevelClass = randomLog.level.toLowerCase();

        const logHTML = `
            <div class="log-item log-${logLevelClass}">
                <span class="log-time">${timeString}</span>
                <span class="log-node">${randomLog.node}</span>
                <span class="log-level">${randomLog.level}</span>
                <span class="log-message">${randomLog.message}</span>
            </div>
        `;

        logsContainer.insertAdjacentHTML('afterbegin', logHTML);

        // 保持最多20条日志
        const logItems = logsContainer.querySelectorAll('.log-item');
        if (logItems.length > 20) {
            logItems[logItems.length - 1].remove();
        }
    }, 3000); // 每3秒添加一条日志
}

// 筛选阻断操作
function filterBlockedOperations(timeRange) {
    console.log('筛选阻断操作:', timeRange);
    alert(`筛选时间范围：${timeRange === 'today' ? '今日' : timeRange === 'week' ? '本周' : '本月'}`);
}

// 处理阻断操作
function handleBlockedAction(action, blockedType) {
    switch(action) {
        case '查看详情':
            alert(`阻断操作详情\n\n类型：${blockedType}\n阻断时间：2024-04-28 14:25:00\n操作用户：unknown\n来源IP：192.168.1.200\n\n阻断原因：\n用户权限不足，尝试执行未授权操作\n\n处理结果：\n操作已成功阻断，已记录安全日志`);
            break;
        case '允许操作':
            if (confirm(`确定要允许此操作吗？\n${blockedType}\n\n注意：允许此操作可能存在安全风险。`)) {
                alert('操作已允许！\n已添加到信任列表');
            }
            break;
    }
}

// 安全风险管理功能
function initRiskManagementFeatures() {
    // 风险事件操作按钮
    const riskActionButtons = document.querySelectorAll('.risk-event-actions .btn');
    riskActionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList.contains('btn-handle-risk') ? '处理' :
                          this.classList.contains('btn-assign-risk') ? '分配' :
                          this.classList.contains('btn-continue-risk') ? '继续处理' :
                          this.classList.contains('btn-postpone-risk') ? '延后处理' : '查看详情';

            const riskItem = this.closest('.risk-event-item');
            const riskName = riskItem.querySelector('.risk-event-name').textContent;
            handleRiskAction(action, riskName);
        });
    });

    // 添加风险按钮
    const addRiskBtn = document.querySelector('.btn-add-risk');
    if (addRiskBtn) {
        addRiskBtn.addEventListener('click', () => {
            alert('打开添加风险事件对话框\n填写风险事件详情：\n- 风险类型\n- 风险等级\n- 影响范围\n- 描述信息');
        });
    }

    // 导出风险报告
    const exportRisksBtn = document.querySelector('.btn-export-risks');
    if (exportRisksBtn) {
        exportRisksBtn.addEventListener('click', () => {
            alert('正在生成风险报告...\n报告包含：\n- 风险事件统计\n- 处理进度\n- 趋势分析');
        });
    }

    // 风险周期筛选
    const periodFilterButtons = document.querySelectorAll('.risk-visualization-section .filter-btn');
    periodFilterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            periodFilterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const period = this.getAttribute('data-period');
            console.log('风险周期筛选:', period);
        });
    });

    console.log('安全风险管理功能已初始化');
}

// 处理风险操作
function handleRiskAction(action, riskName) {
    switch(action) {
        case '处理':
            alert(`开始处理风险事件：${riskName}\n\n处理步骤：\n1. 分析风险原因\n2. 制定处理方案\n3. 执行处理措施\n4. 验证处理结果`);
            break;
        case '分配':
            const assignee = prompt('请输入处理人姓名：', '张三');
            if (assignee) {
                alert(`风险事件 ${riskName} 已分配给：${assignee}`);
            }
            break;
        case '继续处理':
            alert(`继续处理风险事件：${riskName}\n\n当前进度：50%\n预计完成时间：2小时`);
            break;
        case '延后处理':
            if (confirm(`确定要延后处理风险事件：${riskName} 吗？`)) {
                alert('风险事件已标记为延后处理');
            }
            break;
        case '查看详情':
            alert(`风险事件详情\n\n名称：${riskName}\n发现时间：2024-04-29 08:00:00\n风险等级：严重\n影响范围：机房B-机柜03\n处理状态：未处理\n\n风险描述：\n节点NODE-007已离线超过24小时，可能影响客户任务运行。\n\n建议措施：\n1. 立即检查节点硬件状态\n2. 重启节点或迁移任务\n3. 通知相关客户`);
            break;
    }
}

// 系统设置功能
function initSystemSettingsFeatures() {
    // 分类标签切换
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            switchSettingsCategory(category);
        });
    });

    // 保存设置按钮
    const saveSettingsBtn = document.querySelector('.btn-save-settings');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            saveSettingsBtn.textContent = '⏳ 保存中...';
            saveSettingsBtn.disabled = true;

            setTimeout(() => {
                saveSettingsBtn.textContent = '💾 保存设置';
                saveSettingsBtn.disabled = false;
                alert('设置保存成功！\n\n所有配置已更新并生效。');
            }, 1500);
        });
    }

    // 重置设置按钮
    const resetSettingsBtn = document.querySelector('.btn-reset-settings');
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', () => {
            if (confirm('确定要重置所有设置为默认值吗？\n此操作不可撤销。')) {
                alert('设置已重置为默认值');
            }
        });
    }

    // 开关切换效果
    const switches = document.querySelectorAll('.switch input');
    switches.forEach(switchInput => {
        switchInput.addEventListener('change', function() {
            const isChecked = this.checked;
            const settingName = this.closest('.setting-item').querySelector('.label-text').textContent;
            console.log(`设置 ${settingName} ${isChecked ? '已启用' : '已禁用'}`);
        });
    });

    console.log('系统设置功能已初始化');
}

// 切换设置分类
function switchSettingsCategory(category) {
    // 隐藏所有设置内容
    const allSettingsContents = document.querySelectorAll('.settings-content');
    allSettingsContents.forEach(content => {
        content.style.display = 'none';
    });

    // 显示选中的设置内容
    const targetContent = document.getElementById(`settings-${category}`);
    if (targetContent) {
        targetContent.style.display = 'block';
    }

    console.log('切换到设置分类:', category);
}

// 备份管理功能函数

// 刷新备份拓扑图
function refreshBackupTopology() {
    const refreshBtn = document.querySelector('.btn-refresh-backup-topology');
    refreshBtn.textContent = '🔄 刷新中...';
    refreshBtn.disabled = true;

    setTimeout(() => {
        refreshBtn.textContent = '🔄 刷新';
        refreshBtn.disabled = false;
        alert('备份拓扑图已刷新！\n存储状态已更新');
    }, 2000);
}

// 显示备份详情
function showBackupDetails(backupId, score) {
    const scoreInt = parseInt(score);
    let statusText = '';

    if (scoreInt >= 90) {
        statusText = '正常';
    } else if (scoreInt >= 70) {
        statusText = '警告';
    } else if (scoreInt > 0) {
        statusText = '危险';
    } else {
        statusText = '离线';
    }

    alert(`备份位置详情\n\n位置ID：${backupId}\n存储状态：${score}\n状态：${statusText}\n\n存储信息：\n- 存储类型：${backupId.includes('LOCAL') ? '本地存储' : backupId.includes('REMOTE') ? '异地存储' : '云端存储'}\n- 总容量：${backupId.includes('CLOUD') ? '10 TB' : '5 TB'}\n- 已用空间：${backupId.includes('CLOUD') ? '4.2 TB' : '3.1 TB'}\n- 可用空间：${backupId.includes('CLOUD') ? '5.8 TB' : '1.9 TB'}\n\n网络信息：\n- 连接状态：${scoreInt > 0 ? '正常' : '离线'}\n- 带宽：${backupId.includes('CLOUD') ? '1 Gbps' : '10 Gbps'}\n- 延迟：${backupId.includes('LOCAL') ? '<1ms' : backupId.includes('REMOTE') ? '15ms' : '25ms'}`);
}

// 筛选备份任务
function filterBackupTasks(filterType) {
    const tableBody = document.getElementById('backupTaskTableBody');
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const statusCell = row.cells[4];
        const statusBadge = statusCell.querySelector('.badge');
        const statusText = statusBadge ? statusBadge.textContent : '';
        let showRow = true;

        if (filterType === 'success') {
            showRow = statusText === '已同步';
        } else if (filterType === 'running') {
            showRow = statusText === '同步中';
        } else if (filterType === 'failed') {
            showRow = statusText === '未同步';
        }

        row.style.display = showRow ? '' : 'none';
    });

    console.log('备份任务筛选:', filterType);
}

// 处理备份任务操作
function handleBackupTaskAction(action, backupId) {
    switch(action) {
        case '检查':
            alert(`正在检查备份位置 ${backupId} 的状态...\n检查项目：\n- 存储空间\n- 网络连接\n- 同步状态\n- 文件完整性`);
            break;
        case '重启':
            if (confirm(`确定要重启备份位置 ${backupId} 的同步服务吗？\n注意：重启将中断当前同步任务。`)) {
                alert(`备份位置 ${backupId} 同步服务重启中...\n预计重启时间：3分钟`);
            }
            break;
        case '详情':
            showBackupDetails(backupId, '95'); // 默认分数
            break;
    }
}

// 备份日志更新控制
let backupLogUpdatesEnabled = true;
let backupLogUpdateInterval = null;

function toggleBackupLogUpdates() {
    const pauseBtn = document.querySelector('.btn-pause-backup-logs');

    if (backupLogUpdatesEnabled) {
        backupLogUpdatesEnabled = false;
        pauseBtn.textContent = '▶️ 继续';
        if (backupLogUpdateInterval) {
            clearInterval(backupLogUpdateInterval);
        }
    } else {
        backupLogUpdatesEnabled = true;
        pauseBtn.textContent = '⏸️ 暂停';
        startRealTimeBackupLogUpdates();
    }
}

// 启动实时备份日志更新
function startRealTimeBackupLogUpdates() {
    if (backupLogUpdateInterval) {
        clearInterval(backupLogUpdateInterval);
    }

    const backupLogMessages = [
        { backup: 'LOCAL-001', level: 'INFO', message: '增量备份完成，备份文件：customer_data_20240429_1430.tar.gz' },
        { backup: 'LOCAL-002', level: 'SUCCESS', message: '完整备份成功，备份数据：2.3 GB' },
        { backup: 'REMOTE-001', level: 'WARNING', message: '同步延迟超过5分钟，当前延迟：8分钟' },
        { backup: 'REMOTE-002', level: 'ERROR', message: '网络连接异常，同步失败' },
        { backup: 'CLOUD-001', level: 'SUCCESS', message: '云端备份验证完成，校验通过' },
        { backup: 'CLOUD-002', level: 'INFO', message: '开始上传增量备份，预计时间：15分钟' },
        { backup: 'LOCAL-003', level: 'WARNING', message: '存储空间不足，当前使用率：85%' },
        { backup: 'REMOTE-004', level: 'INFO', message: '异地同步恢复，带宽使用：3.2 Gbps' }
    ];

    backupLogUpdateInterval = setInterval(() => {
        if (!backupLogUpdatesEnabled) return;

        const logsContainer = document.getElementById('backupLogsContainer');
        const randomLog = backupLogMessages[Math.floor(Math.random() * backupLogMessages.length)];
        const now = new Date();
        const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const logLevelClass = randomLog.level.toLowerCase();

        const logHTML = `
            <div class="log-item log-${logLevelClass}">
                <span class="log-time">${timeString}</span>
                <span class="log-node">${randomLog.backup}</span>
                <span class="log-level">${randomLog.level}</span>
                <span class="log-message">${randomLog.message}</span>
            </div>
        `;

        logsContainer.insertAdjacentHTML('afterbegin', logHTML);

        // 保持最多20条日志
        const logItems = logsContainer.querySelectorAll('.log-item');
        if (logItems.length > 20) {
            logItems[logItems.length - 1].remove();
        }
    }, 3000); // 每3秒添加一条日志
}

// 筛选备份异常
function filterBackupExceptions(timeRange) {
    console.log('筛选备份异常:', timeRange);
    alert(`筛选时间范围：${timeRange === 'today' ? '今日' : timeRange === 'week' ? '本周' : '本月'}`);
}

// 处理备份异常操作
function handleBackupExceptionAction(action, exceptionType) {
    switch(action) {
        case '查看详情':
            alert(`备份异常详情\n\n类型：${exceptionType}\n发生时间：2024-04-29 14:25:00\n影响范围：部分备份任务\n\n异常详情：\n存储空间不足导致备份任务失败\n已触发自动清理机制\n\n处理结果：\n正在清理过期备份文件`);
            break;
        case '清理备份':
            if (confirm(`确定要清理过期备份吗？\n${exceptionType}\n\n注意：此操作将删除30天前的备份文件。`)) {
                alert('备份清理已启动...\n预计清理时间：10分钟');
            }
            break;
        case '重试同步':
            if (confirm(`确定要重试同步吗？\n${exceptionType}\n\n注意：重试将消耗网络带宽。`)) {
                alert('同步重试已启动...\n正在重新建立连接');
            }
            break;
        case '验证备份':
            alert('备份验证已启动...\n验证项目：\n- 文件完整性\n- 校验和比对\n- 数据一致性\n\n预计完成时间：5分钟');
            break;
    }
}

// 合规检测功能函数

// 刷新合规拓扑图
function refreshComplianceTopology() {
    const refreshBtn = document.querySelector('.btn-refresh-compliance-topology');
    refreshBtn.textContent = '🔄 刷新中...';
    refreshBtn.disabled = true;

    setTimeout(() => {
        refreshBtn.textContent = '🔄 刷新';
        refreshBtn.disabled = false;
        alert('合规拓扑图已刷新！\n法规符合性状态已更新');
    }, 2000);
}

// 显示合规详情
function showComplianceDetails(complianceId, score) {
    const scoreInt = parseInt(score);
    let statusText = '';

    if (scoreInt >= 90) {
        statusText = '完全符合';
    } else if (scoreInt >= 70) {
        statusText = '部分符合';
    } else if (scoreInt > 0) {
        statusText = '不符合';
    } else {
        statusText = '待检测';
    }

    const regulationNames = {
        'LAW-001': '《网络安全法》',
        'LAW-002': '《数据安全法》',
        'LAW-003': '《个人信息保护法》',
        'LAW-004': '《等级保护2.0》',
        'STD-001': 'ISO27001',
        'STD-002': 'ISO27017云安全',
        'STD-003': 'GDPR',
        'STD-004': '等保三级',
        'INT-001': '数据安全规范',
        'INT-002': '访问控制规范',
        'INT-003': '应急响应规范',
        'INT-004': '审计日志规范'
    };

    const regulationName = regulationNames[complianceId] || '未知法规';

    alert(`合规检测详情\n\n法规ID：${complianceId}\n法规名称：${regulationName}\n合规评分：${score}\n状态：${statusText}\n\n检测信息：\n- 检测项数量：8项\n- 通过项：${Math.floor(scoreInt / 12.5)}项\n- 不通过项：${Math.floor((100 - scoreInt) / 12.5)}项\n- 最后检测：${complianceId.includes('LAW') ? '1天前' : complianceId.includes('STD') ? '3小时前' : '30分钟前'}\n\n风险等级：\n${scoreInt >= 90 ? '低风险 - 符合法规要求' : scoreInt >= 70 ? '中风险 - 需要改进' : '高风险 - 必须整改'}`);
}

// 筛选合规检测
function filterComplianceChecks(filterType) {
    const tableBody = document.getElementById('complianceCheckTableBody');
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const statusCell = row.cells[3];
        const statusBadge = statusCell.querySelector('.badge');
        const statusText = statusBadge ? statusBadge.textContent : '';
        let showRow = true;

        if (filterType === 'passed') {
            showRow = statusText === '符合';
        } else if (filterType === 'warning') {
            showRow = statusText === '部分符合' || statusText === '基本符合';
        } else if (filterType === 'failed') {
            showRow = statusText === '不符合';
        }

        row.style.display = showRow ? '' : 'none';
    });

    console.log('合规检测筛选:', filterType);
}

// 处理合规检测操作
function handleComplianceCheckAction(action, complianceId) {
    switch(action) {
        case '检查':
            alert(`正在开始合规检测：${complianceId}\n检测项目：\n- 法规符合性检查\n- 安全控制措施评估\n- 风险评估分析\n- 整改建议生成`);
            break;
        case '详情':
            showComplianceDetails(complianceId, '95'); // 默认分数
            break;
    }
}

// 合规日志更新控制
let complianceLogUpdatesEnabled = true;
let complianceLogUpdateInterval = null;

function toggleComplianceLogUpdates() {
    const pauseBtn = document.querySelector('.btn-pause-compliance-logs');

    if (complianceLogUpdatesEnabled) {
        complianceLogUpdatesEnabled = false;
        pauseBtn.textContent = '▶️ 继续';
        if (complianceLogUpdateInterval) {
            clearInterval(complianceLogUpdateInterval);
        }
    } else {
        complianceLogUpdatesEnabled = true;
        pauseBtn.textContent = '⏸️ 暂停';
        startRealTimeComplianceLogUpdates();
    }
}

// 启动实时合规日志更新
function startRealTimeComplianceLogUpdates() {
    if (complianceLogUpdateInterval) {
        clearInterval(complianceLogUpdateInterval);
    }

    const complianceLogMessages = [
        { compliance: 'LAW-001', level: 'INFO', message: '网络安全法检测完成，所有项目符合要求' },
        { compliance: 'LAW-002', level: 'SUCCESS', message: '数据安全法检测通过，合规评分：96%' },
        { compliance: 'LAW-003', level: 'WARNING', message: '个人信息保护法检测发现2个需要改进的项目' },
        { compliance: 'STD-002', level: 'ERROR', message: 'ISO27017检测失败：云服务商安全评估未完成' },
        { compliance: 'INT-001', level: 'SUCCESS', message: '数据安全规范检测通过，所有控制措施有效' },
        { compliance: 'INT-004', level: 'WARNING', message: '审计日志规范检测发现异常：日志保留期限不足' },
        { compliance: 'LAW-004', level: 'INFO', message: '等级保护2.0检测开始，预计耗时：5分钟' },
        { compliance: 'STD-001', level: 'SUCCESS', message: 'ISO27001年度审核通过，保持认证状态' }
    ];

    complianceLogUpdateInterval = setInterval(() => {
        if (!complianceLogUpdatesEnabled) return;

        const logsContainer = document.getElementById('complianceLogsContainer');
        const randomLog = complianceLogMessages[Math.floor(Math.random() * complianceLogMessages.length)];
        const now = new Date();
        const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const logLevelClass = randomLog.level.toLowerCase();

        const logHTML = `
            <div class="log-item log-${logLevelClass}">
                <span class="log-time">${timeString}</span>
                <span class="log-node">${randomLog.compliance}</span>
                <span class="log-level">${randomLog.level}</span>
                <span class="log-message">${randomLog.message}</span>
            </div>
        `;

        logsContainer.insertAdjacentHTML('afterbegin', logHTML);

        // 保持最多20条日志
        const logItems = logsContainer.querySelectorAll('.log-item');
        if (logItems.length > 20) {
            logItems[logItems.length - 1].remove();
        }
    }, 3000); // 每3秒添加一条日志
}

// 筛选不合规项
function filterComplianceViolations(timeRange) {
    console.log('筛选不合规项:', timeRange);
    alert(`筛选时间范围：${timeRange === 'today' ? '今日' : timeRange === 'week' ? '本周' : '本月'}`);
}

// 处理不合规项操作
function handleComplianceViolationAction(action, violationType) {
    switch(action) {
        case '查看详情':
            alert(`不合规项详情\n\n类型：${violationType}\n发现时间：2024-04-29 14:25:00\n风险等级：中风险\n\n违规详情：\n审计日志保留期限不符合法规要求\n当前保留期限：6个月\n法规要求：12个月\n\n影响范围：\n- 安全审计追溯\n- 事故调查取证\n- 合规性检查`);
            break;
        case '更新进度':
            alert('整改进度更新\n\n当前进度：60%\n已完成项目：\n✅ 扩容存储空间\n✅ 调整保留策略\n🔄 进行中：测试验证\n⏳ 待完成：文档更新');
            break;
        case '开始整改':
            if (confirm(`确定要开始整改吗？\n${violationType}\n\n注意：整改需要制定详细计划和分配资源。`)) {
                alert('整改已启动...\n正在制定整改计划\n预计完成时间：30天');
            }
            break;
        case '验证整改':
            alert('整改验证已启动...\n验证项目：\n- 整改措施执行情况\n- 合规性重新检测\n- 效果评估确认\n\n预计完成时间：3天');
            break;
    }
}

// 安全日志功能函数

// 刷新日志拓扑图
function refreshLogTopology() {
    const refreshBtn = document.querySelector('.btn-refresh-log-topology');
    refreshBtn.textContent = '🔄 刷新中...';
    refreshBtn.disabled = true;

    setTimeout(() => {
        refreshBtn.textContent = '🔄 刷新';
        refreshBtn.disabled = false;
        alert('日志拓扑图已刷新！\n日志源状态已更新');
    }, 2000);
}

// 显示日志源详情
function showLogSourceDetails(logId, score) {
    const scoreInt = parseInt(score);
    let statusText = '';

    if (scoreInt >= 90) {
        statusText = '正常';
    } else if (scoreInt >= 70) {
        statusText = '警告';
    } else if (scoreInt > 0) {
        statusText = '异常';
    } else {
        statusText = '离线';
    }

    const logSourceNames = {
        'NET-001': '防火墙日志',
        'NET-002': '入侵检测日志',
        'NET-003': 'VPN网关日志',
        'NET-004': '路由器日志',
        'SRV-001': '应用服务器日志',
        'SRV-002': '数据库服务器日志',
        'SRV-003': '分析服务器日志',
        'SRV-004': '配置服务器日志',
        'APP-001': '认证系统日志',
        'APP-002': '权限系统日志',
        'APP-003': '审计系统日志',
        'APP-004': '同步系统日志'
    };

    const logSourceName = logSourceNames[logId] || '未知日志源';

    alert(`日志源详情\n\n日志源ID：${logId}\n日志源名称：${logSourceName}\n收集状态：${score}\n状态：${statusText}\n\n日志信息：\n- 今日记录数：${Math.floor(Math.random() * 5000) + 1000}\n- 日志级别：INFO/WARNING/ERROR\n- 最后更新：${logId.includes('NET') ? '1分钟前' : logId.includes('SRV') ? '3分钟前' : '5分钟前'}\n\n存储信息：\n- 存储位置：${logId.includes('NET') ? '网络日志服务器' : logId.includes('SRV') ? '应用日志服务器' : '系统日志服务器'}\n- 日志大小：${Math.floor(Math.random() * 100) + 20} GB\n- 存储使用：${scoreInt > 0 ? scoreInt + '% 警告' : '离线'}`);
}

// 筛选日志类型
function filterLogTypes(filterType) {
    const tableBody = document.getElementById('logTypeTableBody');
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const statusCell = row.cells[4];
        const statusBadge = statusCell.querySelector('.badge');
        const statusText = statusBadge ? statusBadge.textContent : '';
        let showRow = true;

        if (filterType === 'access') {
            showRow = statusText === 'INFO';
        } else if (filterType === 'attack') {
            showRow = statusText === 'ERROR' || statusText === 'WARNING';
        } else if (filterType === 'permission') {
            showRow = statusText === 'INFO' && row.cells[1].textContent.includes('权限');
        } else if (filterType === 'data') {
            showRow = statusText === 'INFO' && row.cells[1].textContent.includes('数据');
        }

        row.style.display = showRow ? '' : 'none';
    });

    console.log('日志类型筛选:', filterType);
}

// 处理日志类型操作
function handleLogTypeAction(action, logId) {
    switch(action) {
        case '检查':
            alert(`正在检查日志源：${logId}\n检查项目：\n- 日志收集状态\n- 日志格式验证\n- 日志完整性检查\n- 实时日志监控`);
            break;
        case '重启':
            if (confirm(`确定要重启日志源 ${logId} 的收集服务吗？\n注意：重启将暂时中断日志收集。`)) {
                alert(`日志源 ${logId} 收集服务重启中...\n预计重启时间：2分钟`);
            }
            break;
        case '详情':
            showLogSourceDetails(logId, '95'); // 默认分数
            break;
    }
}

// 安全日志更新控制
let securityLogUpdatesEnabled = true;
let securityLogUpdateInterval = null;

function toggleSecurityLogUpdates() {
    const pauseBtn = document.querySelector('.btn-pause-security-logs');

    if (securityLogUpdatesEnabled) {
        securityLogUpdatesEnabled = false;
        pauseBtn.textContent = '▶️ 继续';
        if (securityLogUpdateInterval) {
            clearInterval(securityLogUpdateInterval);
        }
    } else {
        securityLogUpdatesEnabled = true;
        pauseBtn.textContent = '⏸️ 暂停';
        startRealTimeSecurityLogUpdates();
    }
}

// 启动实时安全日志更新
function startRealTimeSecurityLogUpdates() {
    if (securityLogUpdateInterval) {
        clearInterval(securityLogUpdateInterval);
    }

    const securityLogMessages = [
        { log: 'NET-001', level: 'INFO', message: '防火墙规则更新完成，新增规则：阻断外部端口扫描' },
        { log: 'NET-002', level: 'SUCCESS', message: '入侵检测系统扫描完成，未发现异常活动' },
        { log: 'APP-001', level: 'SUCCESS', message: '用户登录验证成功，用户：zhangsan，IP：192.168.1.100' },
        { log: 'APP-002', level: 'WARNING', message: '权限变更尝试被拒绝，用户：admin，操作：权限提升' },
        { log: 'SRV-002', level: 'WARNING', message: '数据库连接池使用率超过85%，当前：87%' },
        { log: 'SRV-001', level: 'INFO', message: '应用服务器正常启动，所有服务运行正常' },
        { log: 'NET-003', level: 'WARNING', message: 'VPN网关连接数接近上限，当前：95/100' },
        { log: 'APP-003', level: 'INFO', message: '审计日志记录完成，操作类型：数据访问' }
    ];

    securityLogUpdateInterval = setInterval(() => {
        if (!securityLogUpdatesEnabled) return;

        const logsContainer = document.getElementById('securityLogsContainer');
        const randomLog = securityLogMessages[Math.floor(Math.random() * securityLogMessages.length)];
        const now = new Date();
        const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const logLevelClass = randomLog.level.toLowerCase();

        const logHTML = `
            <div class="log-item log-${logLevelClass}">
                <span class="log-time">${timeString}</span>
                <span class="log-node">${randomLog.log}</span>
                <span class="log-level">${randomLog.level}</span>
                <span class="log-message">${randomLog.message}</span>
            </div>
        `;

        logsContainer.insertAdjacentHTML('afterbegin', logHTML);

        // 保持最多20条日志
        const logItems = logsContainer.querySelectorAll('.log-item');
        if (logItems.length > 20) {
            logItems[logItems.length - 1].remove();
        }
    }, 3000); // 每3秒添加一条日志
}

// 筛选安全事件
function filterSecurityEvents(timeRange) {
    console.log('筛选安全事件:', timeRange);
    alert(`筛选时间范围：${timeRange === 'today' ? '今日' : timeRange === 'week' ? '本周' : '本月'}`);
}

// 处理安全事件操作
function handleSecurityEventAction(action, eventType) {
    switch(action) {
        case '查看详情':
            alert(`安全事件详情\n\n类型：${eventType}\n发生时间：2024-04-29 14:25:00\n风险等级：中风险\n\n事件详情：\n检测到异常的安全操作行为\n已触发实时告警并自动处理\n\n处理结果：\n威胁已被阻断，系统安全得到保护`);
            break;
        case '深入调查':
            alert('深入调查已启动...\n调查项目：\n- 事件根因分析\n- 影响范围评估\n- 类似事件排查\n- 预防措施制定\n\n预计完成时间：2小时');
            break;
        case '攻击分析':
            alert('攻击分析已启动...\n分析内容：\n- 攻击路径追溯\n- 攻击手法识别\n- 攻击者画像\n- 防御建议生成\n\n预计完成时间：1小时');
            break;
        case '权限审查':
            alert('权限审查已启动...\n审查项目：\n- 用户权限验证\n- 访问权限检查\n- 操作权限确认\n- 合规性评估\n\n预计完成时间：30分钟');
            break;
    }
}

// 网络安全防护功能
function initNetworkSecurityFeatures() {
    // 攻击路径刷新按钮
    const refreshAttacksBtn = document.querySelector('.btn-refresh-attacks');
    if (refreshAttacksBtn) {
        refreshAttacksBtn.addEventListener('click', () => {
            refreshAttacksBtn.textContent = '🔄 刷新中...';
            setTimeout(() => {
                refreshAttacksBtn.textContent = '🔄 刷新';
                alert('攻击路径数据已刷新！\n实时攻击状态已更新');
            }, 2000);
        });
    }

    // 攻击类型筛选
    const attackFilter = document.querySelector('.attack-filter');
    if (attackFilter) {
        attackFilter.addEventListener('change', function() {
            const filterType = this.value;
            filterAttackTable(filterType);
            console.log('攻击类型筛选:', filterType);
        });
    }

    // 攻击表格行点击事件
    const attackRows = document.querySelectorAll('.attack-row');
    attackRows.forEach(row => {
        row.addEventListener('click', function() {
            const time = this.querySelector('td:first-child').textContent;
            const source = this.querySelector('td:nth-child(2)').textContent;
            const type = this.querySelector('td:nth-child(3)').textContent;
            const target = this.querySelector('td:nth-child(4)').textContent;
            showAttackDetails(time, source, type, target);
        });

        // 添加悬停效果
        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // 时间线控制按钮
    const timelineButtons = document.querySelectorAll('.timeline-controls .btn');
    timelineButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            timelineButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const timeRange = this.textContent;
            console.log('时间线范围:', timeRange);
            updateTimelineStats(timeRange);
        });
    });

    // 简化时间线事件点击
    const timelineEvents = document.querySelectorAll('.timeline-event-simple');
    timelineEvents.forEach(event => {
        event.addEventListener('click', function() {
            const time = this.querySelector('.event-time-simple').textContent;
            const type = this.querySelector('.event-type-simple').textContent;
            const source = this.querySelector('.event-source-simple').textContent;
            const status = this.querySelector('.event-status-simple').textContent;
            showTimelineEventDetails(time, type, source, status);
        });

        // 添加悬停效果
        event.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // 异常流量分析筛选
    const analysisFilters = document.querySelectorAll('.analysis-filters .btn');
    analysisFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            analysisFilters.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterType = this.textContent;
            console.log('异常流量筛选:', filterType);
        });
    });

    // 异常流量操作按钮
    const anomalyActionButtons = document.querySelectorAll('.anomaly-actions .btn');
    anomalyActionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList.contains('btn-view-details') ? '查看详情' :
                          this.classList.contains('btn-block-source') ? '阻断源IP' :
                          this.classList.contains('btn-analyze-pattern') ? '分析模式' :
                          this.classList.contains('btn-block-traffic') ? '阻断流量' :
                          this.classList.contains('btn-investigate') ? '调查' :
                          this.classList.contains('btn-add-blacklist') ? '加入黑名单' : '忽略';

            const anomalyItem = this.closest('.anomaly-item');
            const anomalyId = anomalyItem.querySelector('.anomaly-id').textContent;
            handleAnomalyAction(action, anomalyId);
        });
    });

    // 防护系统操作按钮
    const operationButtons = document.querySelectorAll('.protection-operations .operation-btn');
    operationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const operationClass = Array.from(this.classList).find(c => c.startsWith('op-'));
            const operationName = this.querySelector('.op-name').textContent;
            handleProtectionOperation(operationClass, operationName);
        });
    });

    console.log('网络安全防护功能已初始化');
}

// 筛选攻击表格
function filterAttackTable(filterType) {
    const rows = document.querySelectorAll('.attack-row');
    rows.forEach(row => {
        const typeCell = row.querySelector('td:nth-child(3)');
        const attackType = typeCell.textContent;

        let shouldShow = false;
        if (filterType === 'all') {
            shouldShow = true;
        } else if (filterType === 'ddos' && attackType.includes('DDoS')) {
            shouldShow = true;
        } else if (filterType === 'injection' && (attackType.includes('注入') || attackType.includes('XSS'))) {
            shouldShow = true;
        } else if (filterType === 'scan' && attackType.includes('扫描')) {
            shouldShow = true;
        } else if (filterType === 'brute' && attackType.includes('暴力破解')) {
            shouldShow = true;
        }

        row.style.display = shouldShow ? '' : 'none';
    });

    const filterText = filterType === 'all' ? '所有攻击' :
                      filterType === 'ddos' ? 'DDoS攻击' :
                      filterType === 'injection' ? '注入攻击' :
                      filterType === 'scan' ? '端口扫描' : '暴力破解';
    alert(`已筛选攻击类型：${filterText}`);
}

// 显示攻击详情
function showAttackDetails(time, source, type, target) {
    const riskLevels = {
        'DDoS攻击': '高危',
        'SQL注入': '高风险',
        '端口扫描': '中风险',
        '暴力破解': '高风险',
        '异常流量': '低风险',
        'XSS攻击': '高危',
        '文件包含': '中风险',
        '命令注入': '高风险'
    };

    const riskLevel = riskLevels[type] || '未知';
    const traffic = Math.floor(Math.random() * 1000) + 100 + ' Mbps';
    const packets = Math.floor(Math.random() * 100000) + 10000 + ' 包/秒';

    alert(`攻击详情\n\n基本信息：\n- 攻击时间：${time}\n- 攻击源：${source}\n- 攻击类型：${type}\n- 目标系统：${target}\n\n攻击特征：\n- 风险级别：${riskLevel}\n- 流量大小：${traffic}\n- 数据包速率：${packets}\n- 协议类型：TCP/UDP\n\n处理状态：\n- 检测时间：< 1秒\n- 响应时间：< 5秒\n- 处理结果：自动处理\n\n建议措施：\n1. 持续监控攻击源\n2. 分析攻击模式\n3. 加强相关防护`);
}

// 更新时间线统计
function updateTimelineStats(timeRange) {
    const stats = {
        '1小时': { critical: 1, high: 3, medium: 8, low: 15 },
        '24小时': { critical: 5, high: 12, medium: 28, low: 45 },
        '7天': { critical: 23, high: 67, medium: 156, low: 289 }
    };

    const selectedStats = stats[timeRange] || stats['24小时'];

    // 更新统计数字
    const statElements = document.querySelectorAll('.simple-stat');
    statElements[0].querySelector('.stat-number').textContent = selectedStats.critical;
    statElements[1].querySelector('.stat-number').textContent = selectedStats.high;
    statElements[2].querySelector('.stat-number').textContent = selectedStats.medium;
    statElements[3].querySelector('.stat-number').textContent = selectedStats.low;

    console.log(`时间线统计已更新：${timeRange}`, selectedStats);
}

// 显示时间线事件详情
function showTimelineEventDetails(time, type, source, status) {
    const details = {
        'DDoS攻击': { traffic: '12 Gbps', duration: '15分钟', target: 'Web服务器' },
        'SQL注入': { traffic: '2.3 Mbps', duration: '30秒', target: '数据库' },
        '端口扫描': { traffic: '500 Kbps', duration: '5分钟', target: '应用服务器' },
        '暴力破解': { traffic: '1.2 Mbps', duration: '10分钟', target: 'SSH服务' },
        '异常流量': { traffic: '500 MB', duration: '持续', target: '存储系统' },
        'XSS攻击': { traffic: '800 Kbps', duration: '45秒', target: 'Web应用' }
    };

    const detail = details[type] || { traffic: '未知', duration: '未知', target: '未知' };

    alert(`攻击事件详情\n\n事件信息：\n- 发生时间：${time}\n- 攻击类型：${type}\n- 攻击源：${source}\n- 处理状态：${status}\n\n详细数据：\n- 目标系统：${detail.target}\n- 流量大小：${detail.traffic}\n- 持续时间：${detail.duration}\n- 检测方式：AI行为分析\n\n处理记录：\n- 检测延迟：< 1秒\n- 响应时间：< 5秒\n- 处理方式：自动${status === '已拦截' ? '拦截' : '监控'}\n- 影响评估：${status === '已拦截' ? '无影响' : '持续监控中'}`);
}

// 处理异常流量操作
function handleAnomalyAction(action, anomalyId) {
    switch(action) {
        case '查看详情':
            alert(`异常流量详情\n\n异常ID：${anomalyId}\n\n详细信息：\n- 发现时间：2024-04-30 14:32:15\n- 检测方式：AI行为分析\n- 置信度：94.7%\n\n流量特征：\n- 协议类型：TCP/UDP\n- 端口范围：21-8080\n- 数据包特征：异常\n\n影响评估：\n- 风险等级：中高\n- 影响范围：部分服务\n- 潜在损失：评估中`);
            break;
        case '阻断源IP':
            if (confirm(`确定要阻断异常流量源IP吗？\n${anomalyId}\n\n注意：此操作将立即生效。`)) {
                alert('IP阻断已生效！\n已添加到防火墙黑名单\n已通知相关系统');
            }
            break;
        case '分析模式':
            alert('模式分析已启动...\n分析项目：\n- 流量模式识别\n- 行为特征提取\n- 威胁类型分类\n- 攻击意图推断\n\n预计完成时间：10分钟');
            break;
        case '阻断流量':
            if (confirm(`确定要阻断此异常流量吗？\n${anomalyId}\n\n注意：可能影响正常业务。`)) {
                alert('流量阻断已生效！\n已配置流量过滤规则\n正在监控阻断效果');
            }
            break;
        case '调查':
            alert('深入调查已启动...\n调查内容：\n- 流量来源追溯\n- 通信内容分析\n- 关联事件排查\n- 威胁情报匹配\n\n预计完成时间：30分钟');
            break;
        case '加入黑名单':
            if (confirm(`确定要将此源加入黑名单吗？\n${anomalyId}\n\n注意：将被永久阻断。`)) {
                alert('已加入黑名单！\n黑名单类型：IP黑名单\n生效时间：立即\n有效期：永久');
            }
            break;
        case '忽略':
            if (confirm(`确定要忽略此异常吗？\n${anomalyId}\n\n注意：忽略后将不再告警。`)) {
                alert('已添加到忽略列表！\n将不再对此类流量告警');
            }
            break;
    }
}

// 处理防护系统操作
function handleProtectionOperation(operationClass, operationName) {
    const operationDescriptions = {
        'op-firewall': '管理防火墙规则，配置访问控制策略，设置IP白名单/黑名单',
        'op-ids': '调整入侵检测参数，更新检测签名，配置告警规则',
        'op-ips': '配置主动防御策略，设置自动阻断规则，调整响应级别',
        'op-blacklist': '管理IP和域名黑名单，配置封禁规则，设置封禁时长',
        'op-whitelist': '管理可信访问源，配置白名单规则，设置访问权限',
        'op-traffic': '配置带宽限制策略，设置流量控制规则，调整QoS参数',
        'op-analysis': '启动深度威胁检测，执行安全分析，生成威胁报告',
        'op-report': '生成安全分析报告，导出防护统计数据，创建合规报告'
    };

    const description = operationDescriptions[operationClass];

    switch(operationClass) {
        case 'op-firewall':
            alert(`防火墙规则管理\n\n${description}\n\n当前状态：\n- 活跃规则：1,247条\n- 今日拦截：6,234次\n- 规则更新：2小时前\n\n可用操作：\n1. 添加新规则\n2. 编辑现有规则\n3. 启用/禁用规则\n4. 导入/导出规则`);
            break;
        case 'op-ids':
            alert(`入侵检测配置\n\n${description}\n\n当前状态：\n- 检测签名：12,456条\n- 今日检测：1,847次\n- 误报率：1.2%\n\n可用操作：\n1. 更新签名库\n2. 调整检测阈值\n3. 配置告警规则\n4. 查看检测日志`);
            break;
        case 'op-ips':
            alert(`入侵防御策略\n\n${description}\n\n当前状态：\n- 主动规则：3,421条\n- 今日阻断：892次\n- 系统负载：78%\n\n可用操作：\n1. 配置阻断策略\n2. 调整响应级别\n3. 设置例外规则\n4. 查看阻断日志`);
            break;
        case 'op-blacklist':
            alert(`黑名单管理\n\n${description}\n\n当前状态：\n- IP黑名单：234条\n- 域名黑名单：56条\n- 今日新增：12条\n\n可用操作：\n1. 添加IP/域名\n2. 编辑黑名单项\n3. 设置封禁时长\n4. 导入/导出黑名单`);
            break;
        case 'op-whitelist':
            alert(`白名单管理\n\n${description}\n\n当前状态：\n- IP白名单：89条\n- 域名白名单：23条\n- 今日新增：5条\n\n可用操作：\n1. 添加可信源\n2. 编辑白名单项\n3. 设置访问权限\n4. 导入/导出白名单`);
            break;
        case 'op-traffic':
            alert(`流量控制\n\n${description}\n\n当前状态：\n- 总带宽：100 Gbps\n- 当前使用：15.8 Gbps\n- 限制规则：45条\n\n可用操作：\n1. 配置带宽限制\n2. 设置流量优先级\n3. 调整QoS参数\n4. 查看流量统计`);
            break;
        case 'op-analysis':
            alert(`威胁分析\n\n${description}\n\n当前状态：\n- 待分析威胁：23个\n- 分析队列：5个\n- 平均分析时间：3分钟\n\n可用操作：\n1. 启动深度分析\n2. 查看分析结果\n3. 导出分析报告\n4. 配置分析策略`);
            break;
        case 'op-report':
            alert(`安全报告\n\n${description}\n\n可用报告类型：\n1. 日报安全摘要\n2. 周报趋势分析\n3. 月报合规评估\n4. 自定义报告\n\n报告内容：\n- 攻击统计\n- 防护效果\n- 系统状态\n- 改进建议`);
            break;
    }
}

// 修改initAllInteractions函数以包含网络安全功能
const originalInitAllInteractions = initAllInteractions;
initAllInteractions = function() {
    // 调用原始初始化函数
    originalInitAllInteractions();

    // 初始化网络安全功能
    initNetworkSecurityFeatures();

    console.log('网络安全防护功能已添加到交互系统');
};