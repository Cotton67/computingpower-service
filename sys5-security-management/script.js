// 算力安全管控系统 - JavaScript 交互功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('算力安全管控系统初始化中...');

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
    const navItems = document.querySelectorAll('.nav-item');

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

    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(pageName);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('页面切换成功:', pageName);
    } else {
        console.error('页面不存在:', pageName);
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
    // 添加用户按钮
    const addUserBtn = document.querySelector('.add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            alert('打开添加用户对话框');
        });
    }

    // 编辑和删除按钮
    const actionLinks = document.querySelectorAll('.user-table .action-link');

    actionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent;
            const userName = this.closest('tr').querySelector('td:first-child').textContent;

            if (action === '编辑') {
                alert('编辑用户: ' + userName);
            } else if (action === '删除') {
                if (confirm('确定要删除用户 ' + userName + ' 吗？')) {
                    alert('用户已删除: ' + userName);
                }
            }
        });
    });
}

// 备份操作
function initBackupActions() {
    // 立即备份按钮
    const backupNowBtn = document.querySelector('.backup-now-btn');
    if (backupNowBtn) {
        backupNowBtn.addEventListener('click', function() {
            this.textContent = '⏳ 备份中...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = '🔄 立即备份';
                this.disabled = false;
                alert('备份完成！');
            }, 2000);
        });
    }

    // 备份操作按钮
    const backupActions = document.querySelectorAll('.backup-table .action-link');

    backupActions.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent;
            const backupType = this.closest('tr').querySelector('.backup-type').textContent;

            if (action === '恢复') {
                if (confirm('确定要恢复备份: ' + backupType + ' 吗？')) {
                    alert('正在恢复备份: ' + backupType);
                }
            } else if (action === '删除') {
                if (confirm('确定要删除此备份吗？')) {
                    alert('备份已删除');
                }
            }
        });
    });
}

// 日志搜索和过滤
function initLogFilters() {
    // 搜索按钮
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-input');
            const searchValue = searchInput ? searchInput.value : '';

            if (searchValue.trim()) {
                alert('搜索日志: ' + searchValue);
            } else {
                alert('请输入搜索关键词');
            }
        });
    }

    // 导出按钮
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('正在导出日志数据...');
            setTimeout(() => {
                alert('日志导出完成！');
            }, 1000);
        });
    }

    // 日志过滤器
    const logFilters = document.querySelectorAll('.log-filters .filter-btn');

    logFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            logFilters.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            console.log('日志过滤器:', this.textContent);
        });
    });

    // 查看详情按钮
    const logViewButtons = document.querySelectorAll('.log-table .action-link');
    logViewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const logRow = this.closest('tr');
            const logType = logRow.querySelector('.log-type').textContent;
            const logAction = logRow.cells[3].textContent;

            alert('查看日志详情:\n类型: ' + logType + '\n操作: ' + logAction);
        });
    });
}

// 合规检测操作
function initComplianceActions() {
    // 立即检测按钮
    const checkBtn = document.querySelector('.check-btn');
    if (checkBtn) {
        checkBtn.addEventListener('click', function() {
            this.textContent = '⏳ 检测中...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = '🔍 立即检测';
                this.disabled = false;
                alert('合规检测完成！\n检测结果：全部通过');
            }, 3000);
        });
    }

    // 生成报告按钮
    const generateBtn = document.querySelector('.generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            this.textContent = '⏳ 生成中...';

            setTimeout(() => {
                this.textContent = '📄 生成报告';
                alert('合规报告生成成功！');
            }, 2000);
        });
    }

    // 下载报告按钮
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('正在下载合规报告...');
        });
    }

    // 报告操作按钮
    const reportActions = document.querySelectorAll('.report-actions .action-btn');

    reportActions.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList.contains('btn-view') ? '查看' : '下载';
            const reportName = this.closest('.report-item').querySelector('.report-name').textContent;

            if (action === '查看') {
                alert('查看报告: ' + reportName);
            } else {
                alert('下载报告: ' + reportName);
            }
        });
    });
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