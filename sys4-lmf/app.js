const pageMeta = {
  dashboard: {
    title: "财务运营驾驶舱",
    desc: "集中展示算力租赁收入、账单状态、对账进度、发票与退款风险。"
  },
  rules: {
    title: "计费规则管理",
    desc: "设置按算力性能、使用时长、任务量、长期租赁套餐等多种计费模式。"
  },
  autoBilling: {
    title: "自动计费模块",
    desc: "根据使用时长、资源占用量、任务量自动计算费用并生成实时费用明细。"
  },
  bills: {
    title: "账单管理",
    desc: "自动生成客户月度、季度、年度账单，支持修改、作废、重新生成与导出。"
  },
  settlement: {
    title: "结算管理",
    desc: "记录支付金额、支付方式、支付时间，支持财务对账与客户对账。"
  },
  invoice: {
    title: "发票管理",
    desc: "支持电子发票、纸质发票开具、查询、导出、作废和税务系统对接。"
  },
  revenue: {
    title: "营收统计分析",
    desc: "按客户、产品、时间段统计营收，生成营收报表和利润分析报表。"
  },
  refund: {
    title: "退款管理",
    desc: "处理算力未使用、服务异常等退款需求，支持审核、记录和报表生成。"
  },
  permission: {
    title: "财务权限管理",
    desc: "分级设置管理员、核算员、出纳等权限，保障财务数据安全。"
  }
};

const state = {
  rules: [
    {
      id: "R-001",
      name: "B300 8卡集群按时长计费",
      mode: "按使用时长计费",
      product: "B300 8卡集群租赁",
      unitPrice: "268 元/小时",
      vipDiscount: "9.2 折",
      longDiscount: "8.5 折",
      status: "启用",
      createTime: "2026-03-15",
      updateBy: "王主任",
      description: "适用于企业客户租赁B300 8卡集群的计费场景"
    },
    {
      id: "R-002",
      name: "单卡算力按性能计费",
      mode: "按算力性能计费",
      product: "单卡算力租赁",
      unitPrice: "36 元/卡时",
      vipDiscount: "9.5 折",
      longDiscount: "9.0 折",
      status: "启用",
      createTime: "2026-03-10",
      updateBy: "李核算",
      description: "按单卡算力使用时长计费，适合中小客户"
    },
    {
      id: "R-003",
      name: "训推一体套餐计费",
      mode: "长期租赁套餐计费",
      product: "训推一体套餐",
      unitPrice: "48000 元/月",
      vipDiscount: "8.8 折",
      longDiscount: "8.0 折",
      status: "启用",
      createTime: "2026-02-20",
      updateBy: "王主任",
      description: "包含训练与推理资源的综合套餐计费"
    },
    {
      id: "R-004",
      name: "批量任务按任务量计费",
      mode: "按任务量计费",
      product: "批量推理任务",
      unitPrice: "0.18 元/任务",
      vipDiscount: "9.3 折",
      longDiscount: "8.8 折",
      status: "试运行",
      createTime: "2026-04-01",
      updateBy: "李核算",
      description: "按推理任务数量计费，正在测试阶段"
    },
    {
      id: "R-005",
      name: "A100高性能集群计费",
      mode: "按使用时长计费",
      product: "A100 4卡集群租赁",
      unitPrice: "358 元/小时",
      vipDiscount: "9.0 折",
      longDiscount: "8.2 折",
      status: "启用",
      createTime: "2026-04-15",
      updateBy: "王主任",
      description: "高性能A100集群按小时计费"
    }
  ],
  bills: [
    {
      id: "BILL-202604-001",
      customer: "燕山智能制造研究院",
      type: "企业客户 / VIP",
      period: "2026-04",
      product: "B300 8卡集群租赁",
      detail: "使用 326 小时，资源占用率 83%",
      original: 87368,
      discount: 6989,
      payable: 80379,
      status: "已支付",
      createTime: "2026-04-24",
      paymentTime: "2026-04-25",
      ruleId: "R-001"
    },
    {
      id: "BILL-202604-002",
      customer: "北方数据科技有限公司",
      type: "企业客户 / 普通",
      period: "2026-04",
      product: "训推一体套餐",
      detail: "月度套餐 1 套，超额任务 1200 次",
      original: 50216,
      discount: 0,
      payable: 50216,
      status: "未支付",
      createTime: "2026-04-25",
      paymentTime: "-",
      ruleId: "R-003"
    },
    {
      id: "BILL-202604-003",
      customer: "张明",
      type: "个人客户 / 普通",
      period: "2026-04",
      product: "单卡算力租赁",
      detail: "使用 96 卡时，任务量 420 次",
      original: 3456,
      discount: 0,
      payable: 3456,
      status: "逾期未支付",
      createTime: "2026-04-22",
      paymentTime: "-",
      ruleId: "R-002"
    },
    {
      id: "BILL-202604-004",
      customer: "海港视觉算法实验室",
      type: "企业客户 / VIP",
      period: "2026-Q2",
      product: "长期租赁套餐",
      detail: "季度套餐 3 个月，长期租赁折扣",
      original: 144000,
      discount: 23040,
      payable: 120960,
      status: "待确认",
      createTime: "2026-04-26",
      paymentTime: "-",
      ruleId: "R-003"
    },
    {
      id: "BILL-202604-005",
      customer: "秦港算法工作室",
      type: "企业客户 / 普通",
      period: "2026-04",
      product: "批量推理任务",
      detail: "批量推理任务 15680 次",
      original: 2822,
      discount: 212,
      payable: 2610,
      status: "已支付",
      createTime: "2026-04-23",
      paymentTime: "2026-04-24",
      ruleId: "R-004"
    }
  ],
  settlements: [
    {
      id: "PAY-001",
      billId: "BILL-202604-001",
      customer: "燕山智能制造研究院",
      amount: 80379,
      method: "银行转账",
      bankAccount: "工商银行 6222021234567890",
      time: "2026-04-25 10:26",
      financeCheck: "已对账",
      customerCheck: "客户已确认",
      operator: "陈出纳"
    },
    {
      id: "PAY-002",
      billId: "BILL-202604-002",
      customer: "北方数据科技有限公司",
      amount: 0,
      method: "待支付",
      bankAccount: "-",
      time: "-",
      financeCheck: "待对账",
      customerCheck: "客户未确认",
      operator: "-"
    },
    {
      id: "PAY-003",
      billId: "BILL-202604-003",
      customer: "张明",
      amount: 0,
      method: "待支付",
      bankAccount: "-",
      time: "-",
      financeCheck: "逾期提醒已发送",
      customerCheck: "客户未确认",
      operator: "-"
    },
    {
      id: "PAY-004",
      billId: "BILL-202604-004",
      customer: "海港视觉算法实验室",
      amount: 0,
      method: "待支付",
      bankAccount: "-",
      time: "-",
      financeCheck: "待对账",
      customerCheck: "客户未确认",
      operator: "-"
    },
    {
      id: "PAY-005",
      billId: "BILL-202604-005",
      customer: "秦港算法工作室",
      amount: 2610,
      method: "企业网银",
      bankAccount: "建设银行 6217009876543210",
      time: "2026-04-24 15:33",
      financeCheck: "已对账",
      customerCheck: "客户已确认",
      operator: "陈出纳"
    }
  ],
  invoices: [
    {
      id: "INV-202604-8841",
      billId: "BILL-202604-001",
      customer: "燕山智能制造研究院",
      type: "电子发票",
      taxNo: "91130000MA0000008X",
      amount: 80379,
      date: "2026-04-25",
      taxStatus: "已同步税务系统",
      status: "已开具",
      operator: "李核算"
    },
    {
      id: "INV-202604-8842",
      billId: "BILL-202604-004",
      customer: "海港视觉算法实验室",
      type: "纸质发票",
      taxNo: "91130000MA0000009Y",
      amount: 120960,
      date: "待开具",
      taxStatus: "待同步",
      status: "待开具",
      operator: "-"
    },
    {
      id: "INV-202604-8843",
      billId: "BILL-202604-002",
      customer: "北方数据科技有限公司",
      type: "电子发票",
      taxNo: "91130000MA0000007Z",
      amount: 50216,
      date: "待付款后开具",
      taxStatus: "未同步",
      status: "未开具",
      operator: "-"
    },
    {
      id: "INV-202604-8844",
      billId: "BILL-202604-005",
      customer: "秦港算法工作室",
      type: "电子发票",
      taxNo: "91130000MA0000006A",
      amount: 2610,
      date: "2026-04-24",
      taxStatus: "已同步税务系统",
      status: "已开具",
      operator: "李核算"
    }
  ],
  refunds: [
    {
      id: "REF-001",
      customer: "秦港算法工作室",
      reason: "服务异常导致任务中断",
      amount: 2680,
      method: "原路退回",
      originalBill: "BILL-202603-088",
      originalPayId: "PAY-202603-045",
      time: "2026-04-22",
      status: "审核中",
      applicant: "客户",
      reviewer: "王主任"
    },
    {
      id: "REF-002",
      customer: "张明",
      reason: "算力未使用申请退费",
      amount: 560,
      method: "微信退款",
      originalBill: "BILL-202603-067",
      originalPayId: "PAY-202603-032",
      time: "2026-04-20",
      status: "已退款",
      applicant: "客户",
      reviewer: "王主任"
    },
    {
      id: "REF-003",
      customer: "北方数据科技有限公司",
      reason: "套餐资源调整差额退款",
      amount: 4200,
      method: "银行转账",
      originalBill: "BILL-202603-055",
      originalPayId: "PAY-202603-028",
      time: "待处理",
      status: "待审核",
      applicant: "客服",
      reviewer: "-"
    }
  ],
  permissions: [
    {
      role: "财务管理员",
      people: "王主任、系统管理员",
      rules: "可设置计费规则、账单生成、支付确认、发票作废、退款终审",
      level: "最高权限",
      createTime: "2026-01-15",
      lastUpdate: "2026-04-20"
    },
    {
      role: "核算员",
      people: "李核算、赵核算",
      rules: "可查看用量、生成账单、修改账单明细、发起对账",
      level: "业务权限",
      createTime: "2026-01-15",
      lastUpdate: "2026-04-18"
    },
    {
      role: "出纳",
      people: "陈出纳",
      rules: "可登记支付金额、支付方式、支付时间，确认到账情况",
      level: "结算权限",
      createTime: "2026-01-15",
      lastUpdate: "2026-04-22"
    },
    {
      role: "审计查看员",
      people: "审计账号",
      rules: "只读查看账单、结算、发票、退款与系统日志",
      level: "只读权限",
      createTime: "2026-02-10",
      lastUpdate: "2026-03-15"
    },
    {
      role: "客户服务专员",
      people: "客服小李、客服小张",
      rules: "可查看客户账单状态、发起退款申请、回复客户咨询",
      level: "客服权限",
      createTime: "2026-03-01",
      lastUpdate: "2026-04-10"
    }
  ],
  auditLogs: [
    {
      id: "AUD-001",
      time: "2026-04-27 10:32",
      operator: "王主任",
      role: "财务管理员",
      action: "修改计费规则",
      detail: "修改 R-001 长期租赁折扣从 9.0 调整为 8.5",
      risk: "高",
      ip: "192.168.1.105"
    },
    {
      id: "AUD-002",
      time: "2026-04-27 09:48",
      operator: "李核算",
      role: "核算员",
      action: "生成月度账单",
      detail: "生成 2026年4月 月度账单，共5笔",
      risk: "中",
      ip: "192.168.1.112"
    },
    {
      id: "AUD-003",
      time: "2026-04-26 17:20",
      operator: "陈出纳",
      role: "出纳",
      action: "确认到账",
      detail: "确认 BILL-202604-005 支付金额 2610元",
      risk: "中",
      ip: "192.168.1.108"
    },
    {
      id: "AUD-004",
      time: "2026-04-25 14:15",
      operator: "李核算",
      role: "核算员",
      action: "开具发票",
      detail: "开具 INV-202604-8841 电子发票",
      risk: "中",
      ip: "192.168.1.112"
    },
    {
      id: "AUD-005",
      time: "2026-04-24 11:30",
      operator: "王主任",
      role: "财务管理员",
      action: "审核退款",
      detail: "审核通过 REF-002 退款申请，金额560元",
      risk: "高",
      ip: "192.168.1.105"
    }
  ],
  billingDetails: [
    {
      id: "DET-001",
      customer: "燕山智能制造研究院",
      product: "B300 8卡集群租赁",
      startTime: "2026-04-01 00:00",
      endTime: "2026-04-30 23:59",
      hours: 326,
      usageRate: 83,
      tasks: 1890,
      originalCost: 87368,
      discountAmount: 6989,
      finalCost: 80379,
      ruleApplied: "R-001"
    },
    {
      id: "DET-002",
      customer: "北方数据科技有限公司",
      product: "训推一体套餐",
      startTime: "2026-04-01 00:00",
      endTime: "2026-04-30 23:59",
      months: 1,
      extraTasks: 1200,
      originalCost: 50216,
      discountAmount: 0,
      finalCost: 50216,
      ruleApplied: "R-003"
    }
  ]
};

const content = document.getElementById("content");
const pageTitle = document.getElementById("pageTitle");
const pageDesc = document.getElementById("pageDesc");
const navItems = document.querySelectorAll(".nav-item");

function money(num) {
  return "¥" + Number(num).toLocaleString("zh-CN");
}

function badge(text) {
  const map = {
    "启用": "badge-green",
    "试运行": "badge-orange",
    "已支付": "badge-green",
    "未支付": "badge-orange",
    "逾期未支付": "badge-red",
    "待确认": "badge-blue",
    "已对账": "badge-green",
    "待对账": "badge-orange",
    "客户已确认": "badge-green",
    "客户未确认": "badge-orange",
    "已同步税务系统": "badge-green",
    "待同步": "badge-orange",
    "未同步": "badge-red",
    "已开具": "badge-green",
    "待开具": "badge-orange",
    "未开具": "badge-red",
    "审核中": "badge-blue",
    "已退款": "badge-green",
    "待审核": "badge-orange",
    "最高权限": "badge-red",
    "业务权限": "badge-blue",
    "结算权限": "badge-green",
    "只读权限": "badge-purple"
  };
  return `<span class="badge ${map[text] || "badge-blue"}">${text}</span>`;
}

function moduleSummary(title, desc, features) {
  return `
    <div class="module-summary">
      <div class="summary-panel">
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
      <div class="feature-list">
        ${features.map(item => `<div class="feature-item">✓ ${item}</div>`).join("")}
      </div>
    </div>
  `;
}

function renderDashboard() {
  const stats = calculateStatistics();

  content.innerHTML = `
    <div class="grid grid-4">
      <div class="metric-card">
        <div class="metric-label">本月应收金额</div>
        <div class="metric-value stat-number">${money(stats.totalRevenue)}</div>
        <div class="metric-trend trend-up">📈 较上月增长 18.6%</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">已结算金额</div>
        <div class="metric-value stat-number">${money(stats.paidRevenue)}</div>
        <div class="metric-trend trend-up">💰 到账率 ${stats.paymentRate}%</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">待支付账单</div>
        <div class="metric-value stat-number">${stats.unpaidBills + stats.overdueBills} 单</div>
        <div class="metric-trend trend-down">⚠️ 含 ${stats.overdueBills} 单逾期未支付</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">发票开具金额</div>
        <div class="metric-value stat-number">${money(stats.paidRevenue)}</div>
        <div class="metric-trend trend-up">✅ 税务系统同步正常</div>
      </div>
    </div>

    <div class="grid grid-2" style="margin-top:14px;">
      <div class="card">
        <div class="card-header">
          <div>
            <h3>算力租赁计费流程</h3>
            <p>覆盖用量采集、自动计费、账单生成、结算、发票与退款。</p>
          </div>
          <button class="primary-btn" onclick="showDetailedFlow()">查看流程</button>
        </div>
        <div class="card-body">
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-time">Step 01</div>
              <div class="timeline-content"><strong>用量采集：</strong>实时采集 GPU 卡时、集群使用时长、任务数量、资源占用率，数据精度到分钟级别。</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-time">Step 02</div>
              <div class="timeline-content"><strong>自动计费：</strong>智能匹配最优计费规则，自动应用 VIP 折扣、长期租赁折扣，支持跨产品组合计费。</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-time">Step 03</div>
              <div class="timeline-content"><strong>账单生成：</strong>生成月度、季度、年度账单，支持账单修改、作废、重新生成，一键导出 Excel/PDF。</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-time">Step 04</div>
              <div class="timeline-content"><strong>结算对账：</strong>登记支付金额、支付方式、支付时间，自动完成财务与客户对账，异常账单预警。</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-time">Step 05</div>
              <div class="timeline-content"><strong>发票退款：</strong>开具电子/纸质发票，实时同步税务系统，处理退款申请并生成退款财务报表。</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h3>营收趋势与利润分析</h3>
            <p>按时间段统计收入，辅助产品定价调整。</p>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <select id="revenueTimeRange" style="padding: 6px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px;" onchange="updateRevenueChart()">
              <option value="monthly">按月统计</option>
              <option value="quarterly">按季度统计</option>
              <option value="yearly">按年统计</option>
            </select>
            <span class="badge badge-blue">实时统计</span>
          </div>
        </div>
        <div class="card-body">
          <div class="chart-box">
            <canvas id="revenueCanvas"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-2" style="margin-top:14px;">
      <div class="card">
        <div class="card-header">
          <div>
            <h3>账单风险监控</h3>
            <p>标记未支付、已支付、逾期未支付账单。</p>
          </div>
          <button class="warning-btn" onclick="showModal('逾期提醒','<div style="padding: 16px;"><div style="background: #e8f4fd; padding: 16px; border-left: 4px solid var(--blue); border-radius: 8px; margin-bottom: 20px;"><strong style="color: var(--blue);">✓ 逾期提醒发送成功</strong><br><span style="font-size: 13px; color: var(--muted);">已向逾期客户发送多渠道提醒通知</span></div><div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;"><h4 style="margin: 0 0 16px 0; font-size: 14px; color: var(--text);">提醒详情</h4><div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 13px;"><div><span style="color: var(--muted);">提醒对象：</span><strong>张明</strong></div><div><span style="color: var(--muted);">账单编号：</span><strong>BILL-202604-003</strong></div><div><span style="color: var(--muted);">逾期天数：</span><strong style="color: #ff4d4f;">5天</strong></div><div><span style="color: var(--muted);">逾期金额：</span><strong style="color: #ff4d4f;">¥3,456</strong></div><div style="grid-column: span 2;"><span style="color: var(--muted);">提醒方式：</span><span>📱短信 ✉️邮件 💬站内信 📞电话</span></div><div style="grid-column: span 2;"><span style="color: var(--muted);">下次跟进时间：</span><strong style="color: var(--blue);">2026-04-30</strong></div></div></div><div style="background: #fff3df; padding: 12px; border-left: 4px solid #ff9f1a; border-radius: 8px; font-size: 13px;"><span style="color: var(--muted);">💡 <strong>温馨提示：</strong>系统将在2026-04-30自动跟进此逾期账单，建议提前与客户沟通付款事宜。</span></div></div>')">发送逾期提醒</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>账单编号</th>
                <th>客户</th>
                <th>应付金额</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              ${state.bills.map(b => `
                <tr>
                  <td><strong>${b.id}</strong></td>
                  <td>${b.customer}</td>
                  <td>${money(b.payable)}</td>
                  <td>${badge(b.status)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h3>财务待办事项</h3>
            <p>核算员、出纳、管理员协同处理。</p>
          </div>
          <span class="badge badge-orange">7 项待处理</span>
        </div>
        <div class="card-body">
          <div class="kpi-strip">
            <div class="kpi-mini">
              <span>待生成账单</span>
              <strong>5</strong>
            </div>
            <div class="kpi-mini">
              <span>待客户确认</span>
              <strong>3</strong>
            </div>
            <div class="kpi-mini">
              <span>待开票</span>
              <strong>2</strong>
            </div>
            <div class="kpi-mini">
              <span>退款审核</span>
              <strong>2</strong>
            </div>
            <div class="kpi-mini">
              <span>权限变更</span>
              <strong>1</strong>
            </div>
          </div>

          <div class="status-card info" style="margin-top:14px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:13px;">
              <span>📋 月度财务流程完成度</span>
              <strong class="stat-number">72%</strong>
            </div>
            <div class="progress"><span style="width:72%"></span></div>
          </div>

          <div class="status-card warning" style="margin-top:14px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:13px;">
              <span>👥 客户对账完成度</span>
              <strong class="stat-number">58%</strong>
            </div>
            <div class="progress"><span style="width:58%"></span></div>
          </div>

          <div class="status-card success" style="margin-top:14px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:13px;">
              <span>📊 发票税务同步率</span>
              <strong class="stat-number">91%</strong>
            </div>
            <div class="progress"><span style="width:91%"></span></div>
          </div>
        </div>
      </div>
    </div>
  `;

  drawBarChart("revenueCanvas", ["1月", "2月", "3月", "4月", "5月", "6月"], [92, 116, 134, 168, 201, 254], "万元");
}

// 更新营收图表数据
function updateRevenueChart() {
  const timeRange = document.getElementById("revenueTimeRange").value;
  let labels, data, title;

  if (timeRange === "monthly") {
    labels = ["1月", "2月", "3月", "4月", "5月", "6月"];
    data = [92, 116, 134, 168, 201, 254];
    title = "万元";
  } else if (timeRange === "quarterly") {
    labels = ["2025 Q1", "2025 Q2", "2025 Q3", "2025 Q4", "2026 Q1", "2026 Q2"];
    data = [267, 338, 412, 504, 628, 762];
    title = "万元";
  } else if (timeRange === "yearly") {
    labels = ["2021", "2022", "2023", "2024", "2025", "2026"];
    data = [856, 962, 1056, 1234, 1456, 1656];
    title = "万元";
  }

  drawBarChart("revenueCanvas", labels, data, title);

  // 更新图表标题描述
  const rangeTexts = {
    "monthly": "按月统计 - 显示最近6个月营收数据",
    "quarterly": "按季度统计 - 显示最近6个季度营收数据",
    "yearly": "按年统计 - 显示最近6年营收数据"
  };

  const chartTitle = document.querySelector('.card-header p');
  if (chartTitle) {
    chartTitle.textContent = rangeTexts[timeRange];
  }
}

function renderRules() {
  content.innerHTML = `
    ${moduleSummary(
      "计费规则管理",
      "设置多种计费模式，支持自定义计费单价、VIP客户折扣、长期租赁折扣。财务管理员可维护不同算力产品的价格策略。",
      ["按算力性能计费", "按使用时长计费", "按任务量计费", "长期租赁套餐计费"]
    )}

    <div class="card">
      <div class="card-header">
        <div>
          <h3>新增 / 修改计费规则</h3>
          <p>用于适配不同客户需求，降低人工核算成本。</p>
        </div>
        <div class="toolbar">
          <button class="ghost-btn" onclick="showModal('规则模板','已载入默认规则模板：B300 集群、单卡算力、训推一体套餐、批量推理任务。')">载入模板</button>
          <button class="primary-btn" onclick="addRule()">保存规则</button>
        </div>
      </div>
      <div class="card-body">
        <div class="form-grid">
          <div class="form-item">
            <label>规则名称</label>
            <input id="ruleName" value="新客户试用按任务量计费" />
          </div>
          <div class="form-item">
            <label>计费模式</label>
            <select id="ruleMode">
              <option>按算力性能计费</option>
              <option>按使用时长计费</option>
              <option>按任务量计费</option>
              <option>长期租赁套餐计费</option>
            </select>
          </div>
          <div class="form-item">
            <label>适用算力产品</label>
            <select id="ruleProduct">
              <option>B300 8卡集群租赁</option>
              <option>单卡算力租赁</option>
              <option>训推一体套餐</option>
              <option>批量推理任务</option>
            </select>
          </div>
          <div class="form-item">
            <label>自定义计费单价</label>
            <input id="rulePrice" value="0.15 元/任务" />
          </div>
          <div class="form-item">
            <label>VIP客户折扣</label>
            <input id="vipDiscount" value="9.2 折" />
          </div>
          <div class="form-item">
            <label>长期租赁折扣</label>
            <input id="longDiscount" value="8.6 折" />
          </div>
          <div class="form-item">
            <label>规则状态</label>
            <select id="ruleStatus">
              <option>启用</option>
              <option>试运行</option>
            </select>
          </div>
          <div class="form-item">
            <label>审批说明</label>
            <input value="由财务管理员审批后生效" />
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="card-header">
        <div>
          <h3>计费规则列表</h3>
          <p>统一管理按性能、时长、任务量和套餐类规则。</p>
        </div>
        <button class="ghost-btn" onclick="showModal('导出规则','计费规则已模拟导出为 Excel 文件。')">导出规则</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>规则编号</th>
              <th>规则名称</th>
              <th>计费模式</th>
              <th>算力产品</th>
              <th>计费单价</th>
              <th>VIP折扣</th>
              <th>长期折扣</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${state.rules.map(r => `
              <tr>
                <td>${r.id}</td>
                <td>${r.name}</td>
                <td>${r.mode}</td>
                <td>${r.product}</td>
                <td>${r.unitPrice}</td>
                <td>${r.vipDiscount}</td>
                <td>${r.longDiscount}</td>
                <td>${badge(r.status)}</td>
                <td>
                  <button class="ghost-btn" onclick="showEditRuleModal('${r.id}')">编辑</button>
                  <button class="danger-btn" onclick="showModal('停用规则','确认停用 ${r.name} 吗？停用后新账单不再引用该规则。')">停用</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAutoBilling() {
  content.innerHTML = `
    ${moduleSummary(
      "自动计费模块",
      "根据客户算力使用情况自动计算费用，包括使用时长、资源占用量、任务量，自动匹配计费规则，避免人工核算误差。",
      ["使用时长自动采集", "资源占用量核算", "任务量计费", "实时费用明细生成"]
    )}

    <div class="grid grid-2">
      <div class="card">
        <div class="card-header">
          <div>
            <h3>实时计费计算器</h3>
            <p>输入模拟用量，系统自动计算费用。</p>
          </div>
          <button class="primary-btn" onclick="calcBilling()">立即计费</button>
        </div>
        <div class="card-body">
          <div class="form-grid" style="grid-template-columns:repeat(2,1fr);">
            <div class="form-item">
              <label>客户类型</label>
              <select id="calcCustomerType">
                <option>企业客户 / VIP</option>
                <option>企业客户 / 普通</option>
                <option>个人客户 / 普通</option>
              </select>
            </div>
            <div class="form-item">
              <label>算力产品</label>
              <select id="calcProduct">
                <option>B300 8卡集群租赁</option>
                <option>单卡算力租赁</option>
                <option>训推一体套餐</option>
                <option>批量推理任务</option>
              </select>
            </div>
            <div class="form-item">
              <label>使用时长</label>
              <input id="calcHours" type="number" value="120" />
            </div>
            <div class="form-item">
              <label>资源占用率</label>
              <input id="calcUsage" type="number" value="86" />
            </div>
            <div class="form-item">
              <label>任务量</label>
              <input id="calcTasks" type="number" value="2400" />
            </div>
            <div class="form-item">
              <label>长期租赁月数</label>
              <input id="calcMonths" type="number" value="3" />
            </div>
          </div>

          <div id="calcResult" style="margin-top:14px; background:#f8fafc; border:1px solid var(--border); border-radius:14px; padding:14px;">
            等待计算费用明细。
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h3>费用明细拆分</h3>
            <p>展示自动计费结果的组成结构。</p>
          </div>
          <span class="badge badge-blue">模拟数据</span>
        </div>
        <div class="card-body">
          <div class="chart-box">
            <canvas id="billingPie"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="card-header">
        <div>
          <h3>实时费用明细流水</h3>
          <p>自动记录每一次算力使用产生的费用。</p>
        </div>
        <button class="ghost-btn" onclick="showModal('同步用量','已从算力调度系统同步最近 24 小时资源使用情况。')">同步用量</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>客户</th>
              <th>产品</th>
              <th>使用时长</th>
              <th>资源占用量</th>
              <th>任务量</th>
              <th>匹配规则</th>
              <th>实时费用</th>
              <th>生成时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>燕山智能制造研究院</td>
              <td>B300 8卡集群租赁</td>
              <td>16 小时</td>
              <td>88%</td>
              <td>320</td>
              <td>R-001</td>
              <td>${money(3946)}</td>
              <td>2026-04-27 10:15</td>
            </tr>
            <tr>
              <td>北方数据科技有限公司</td>
              <td>训推一体套餐</td>
              <td>套餐内</td>
              <td>76%</td>
              <td>1200</td>
              <td>R-003</td>
              <td>${money(48000)}</td>
              <td>2026-04-27 10:08</td>
            </tr>
            <tr>
              <td>张明</td>
              <td>单卡算力租赁</td>
              <td>9 卡时</td>
              <td>63%</td>
              <td>42</td>
              <td>R-002</td>
              <td>${money(324)}</td>
              <td>2026-04-27 09:42</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  drawPieLikeChart("billingPie", ["时长费用", "资源占用", "任务量", "折扣抵扣"], [45, 25, 18, 12]);
}

function renderBills() {
  content.innerHTML = `
    ${moduleSummary(
      "账单管理",
      "系统自动生成客户月度、季度、年度账单，标注计费明细、折扣金额、应付金额，并支持账单修改、作废、重新生成、导出 Excel/PDF。",
      ["月度账单", "季度账单", "年度账单", "Excel / PDF 导出"]
    )}

    <div class="card">
      <div class="card-header">
        <div>
          <h3>账单生成条件</h3>
          <p>按客户、周期、产品类型批量生成账单。</p>
        </div>
        <div class="toolbar">
          <button class="primary-btn" onclick="showModal('生成账单','已根据客户用量、计费规则、折扣规则模拟生成本期账单。')">自动生成账单</button>
          <button class="ghost-btn" onclick="showModal('导出账单','账单报表已模拟导出为 Excel / PDF。')">导出 Excel/PDF</button>
        </div>
      </div>
      <div class="card-body">
        <div class="form-grid">
          <div class="form-item">
            <label>账单周期</label>
            <select>
              <option>月度账单</option>
              <option>季度账单</option>
              <option>年度账单</option>
            </select>
          </div>
          <div class="form-item">
            <label>账期</label>
            <input value="2026-04" />
          </div>
          <div class="form-item">
            <label>客户范围</label>
            <select>
              <option>全部客户</option>
              <option>企业客户</option>
              <option>个人客户</option>
              <option>VIP客户</option>
            </select>
          </div>
          <div class="form-item">
            <label>账单状态</label>
            <select>
              <option>全部状态</option>
              <option>未支付</option>
              <option>已支付</option>
              <option>逾期未支付</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="card-header">
        <div>
          <h3>客户账单列表</h3>
          <p>显示计费明细、折扣金额、应付金额和账单状态。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>账单编号</th>
              <th>客户</th>
              <th>客户类型</th>
              <th>账期</th>
              <th>算力产品</th>
              <th>计费明细</th>
              <th>原价</th>
              <th>折扣金额</th>
              <th>应付金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${state.bills.map(b => `
              <tr>
                <td>${b.id}</td>
                <td>${b.customer}</td>
                <td>${b.type}</td>
                <td>${b.period}</td>
                <td>${b.product}</td>
                <td>${b.detail}</td>
                <td>${money(b.original)}</td>
                <td>${money(b.discount)}</td>
                <td><strong>${money(b.payable)}</strong></td>
                <td>${badge(b.status)}</td>
                <td>
                  <button class="ghost-btn" onclick="showEditBillModal('${b.id}')">修改</button>
                  <button class="warning-btn" onclick="showModal('重新生成','系统将重新读取用量明细并生成 ${b.id}。')">重生成</button>
                  <button class="danger-btn" onclick="showModal('作废账单','确认作废 ${b.id} 吗？作废后需重新生成。')">作废</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderSettlement() {
  content.innerHTML = `
    ${moduleSummary(
      "结算管理",
      "记录客户支付情况，包括支付金额、支付方式、支付时间，支持财务对账、客户对账，并标记未支付、已支付、逾期未支付账单。",
      ["支付登记", "财务对账", "客户对账", "逾期提醒"]
    )}

    <div class="grid grid-3">
      <div class="metric-card">
        <div class="metric-label">已支付账单</div>
        <div class="metric-value stat-number">2 单</div>
        <div class="metric-trend trend-up">✅ 已完成财务对账</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">未支付账单</div>
        <div class="metric-value stat-number">2 单</div>
        <div class="metric-trend trend-down">⏰ 需持续跟进</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">逾期未支付</div>
        <div class="metric-value stat-number">1 单</div>
        <div class="metric-trend trend-down">🚨 已触发提醒</div>
      </div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="card-header">
        <div>
          <h3>支付登记与对账</h3>
          <p>出纳登记支付信息，核算员进行财务对账，客户完成对账确认。</p>
        </div>
        <div class="toolbar">
          <button class="primary-btn" onclick="showModal('确认到账','已模拟登记客户支付金额、支付方式和支付时间。')">确认到账</button>
          <button class="warning-btn" onclick="showModal('逾期提醒','系统已向未支付客户发送逾期提醒。')">发送逾期提醒</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>支付流水</th>
              <th>关联账单</th>
              <th>客户</th>
              <th>支付金额</th>
              <th>支付方式</th>
              <th>支付时间</th>
              <th>财务对账</th>
              <th>客户对账</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${state.settlements.map(s => `
              <tr>
                <td><strong>${s.id}</strong></td>
                <td>${s.billId}</td>
                <td>${s.customer}</td>
                <td>${money(s.amount)}</td>
                <td>${s.method}</td>
                <td>${s.time}</td>
                <td>${badge(s.financeCheck)}</td>
                <td>${badge(s.customerCheck)}</td>
                <td>
                  <button class="ghost-btn" onclick="showModal('查看对账单','正在查看 ${s.customer} 的财务对账与客户对账记录。')">查看</button>
                  <button class="primary-btn" onclick="showModal('发起客户对账','已向 ${s.customer} 发送客户对账确认请求。')">发起对账</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderInvoice() {
  content.innerHTML = `
    ${moduleSummary(
      "发票管理",
      "根据客户支付情况开具电子发票或纸质发票，记录发票号、金额、开票日期，支持查询、导出、作废，并可对接税务系统。",
      ["电子发票", "纸质发票", "发票查询与导出", "税务系统对接"]
    )}

    <div class="card">
      <div class="card-header">
        <div>
          <h3>发票开具申请</h3>
          <p>付款完成后，可根据客户开票信息开具发票。</p>
        </div>
        <div class="toolbar">
          <button class="primary-btn" onclick="showModal('开具发票','已模拟开具电子发票，并记录发票号、金额和开票日期。')">开具发票</button>
          <button class="ghost-btn" onclick="showModal('税务同步','已模拟将发票信息同步至税务系统。')">同步税务系统</button>
        </div>
      </div>
      <div class="card-body">
        <div class="form-grid">
          <div class="form-item">
            <label>客户名称</label>
            <input value="燕山智能制造研究院" />
          </div>
          <div class="form-item">
            <label>发票类型</label>
            <select>
              <option>电子发票</option>
              <option>纸质发票</option>
            </select>
          </div>
          <div class="form-item">
            <label>开票金额</label>
            <input value="80379" />
          </div>
          <div class="form-item">
            <label>开票日期</label>
            <input value="2026-04-27" />
          </div>
          <div class="form-item">
            <label>纳税人识别号</label>
            <input value="91130000MA0000008X" />
          </div>
          <div class="form-item">
            <label>发票抬头</label>
            <input value="燕山智能制造研究院" />
          </div>
          <div class="form-item">
            <label>接收邮箱</label>
            <input value="finance@example.com" />
          </div>
          <div class="form-item">
            <label>税务系统状态</label>
            <select>
              <option>待同步</option>
              <option>已同步税务系统</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="card-header">
        <div>
          <h3>发票记录</h3>
          <p>记录发票号、金额、开票日期、税务同步状态。</p>
        </div>
        <button class="ghost-btn" onclick="showModal('导出发票','发票台账已模拟导出为 Excel 文件。')">导出发票台账</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>发票号</th>
              <th>客户</th>
              <th>发票类型</th>
              <th>金额</th>
              <th>开票日期</th>
              <th>税务状态</th>
              <th>发票状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${state.invoices.map(i => `
              <tr>
                <td>${i.id}</td>
                <td>${i.customer}</td>
                <td>${i.type}</td>
                <td>${money(i.amount)}</td>
                <td>${i.date}</td>
                <td>${badge(i.taxStatus)}</td>
                <td>${badge(i.status)}</td>
                <td>
                  <button class="ghost-btn" onclick="showModal('查询发票','正在查询 ${i.id} 的开票详情。')">查询</button>
                  <button class="ghost-btn" onclick="showModal('导出发票','已模拟导出 ${i.id}。')">导出</button>
                  <button class="danger-btn" onclick="showModal('作废发票','确认作废 ${i.id} 吗？作废后将同步税务系统。')">作废</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderRevenue() {
  content.innerHTML = `
    ${moduleSummary(
      "营收统计分析",
      "按客户、按算力产品、按时间段统计营收数据，生成营收报表、利润分析报表，支撑财务决策与产品定价调整。",
      ["按客户统计", "按算力产品统计", "按时间段统计", "利润分析报表"]
    )}

    <div class="grid grid-4">
      <div class="metric-card">
        <div class="metric-label">年度累计营收</div>
        <div class="metric-value">¥965,000</div>
        <div class="metric-trend trend-up">完成年度目标 48%</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">本月毛利润</div>
        <div class="metric-value">¥96,800</div>
        <div class="metric-trend trend-up">毛利率 38.1%</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">最高收入产品</div>
        <div class="metric-value" style="font-size:20px;">B300集群</div>
        <div class="metric-trend trend-up">占比 51.6%</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">重点客户贡献</div>
        <div class="metric-value">63%</div>
        <div class="metric-trend trend-up">企业客户为主要来源</div>
      </div>
    </div>

    <div class="grid grid-2" style="margin-top:14px;">
      <div class="card">
        <div class="card-header">
          <div>
            <h3>按时间段营收统计</h3>
            <p>展示近六个月营收变化。</p>
          </div>
          <button class="ghost-btn" onclick="showModal('生成营收报表','已模拟生成月度营收报表。')">生成报表</button>
        </div>
        <div class="card-body">
          <div class="chart-box">
            <canvas id="revenueLine"></canvas>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h3>按算力产品营收占比</h3>
            <p>辅助产品定价调整与资源规划。</p>
          </div>
          <button class="ghost-btn" onclick="showModal('利润分析','已模拟生成算力产品利润分析报表。')">利润分析</button>
        </div>
        <div class="card-body">
          <div class="chart-box">
            <canvas id="productPie"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="card-header">
        <div>
          <h3>客户营收排行</h3>
          <p>按客户统计营收数据，识别重点客户。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>排名</th>
              <th>客户</th>
              <th>客户类型</th>
              <th>主要产品</th>
              <th>累计营收</th>
              <th>利润率</th>
              <th>建议策略</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>燕山智能制造研究院</td>
              <td>企业客户 / VIP</td>
              <td>B300 8卡集群</td>
              <td>${money(286000)}</td>
              <td>41%</td>
              <td>${badge("长期租赁套餐计费")}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>海港视觉算法实验室</td>
              <td>企业客户 / VIP</td>
              <td>长期租赁套餐</td>
              <td>${money(192000)}</td>
              <td>39%</td>
              <td>${badge("启用")}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>北方数据科技有限公司</td>
              <td>企业客户 / 普通</td>
              <td>训推一体套餐</td>
              <td>${money(150216)}</td>
              <td>35%</td>
              <td>${badge("待确认")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  drawBarChart("revenueLine", ["1月", "2月", "3月", "4月", "5月", "6月"], [92, 116, 134, 168, 201, 254], "万元");
  drawPieLikeChart("productPie", ["B300集群", "单卡租赁", "训推套餐", "批量任务"], [52, 18, 24, 6]);
}

function renderRefund() {
  content.innerHTML = `
    ${moduleSummary(
      "退款管理",
      "处理客户退款需求，例如算力未使用、服务异常，支持审核退款申请，记录退款金额、退款方式、退款时间，生成退款报表并对接财务系统。",
      ["退款申请审核", "退款金额记录", "退款方式记录", "退款报表生成"]
    )}

    <div class="card">
      <div class="card-header">
        <div>
          <h3>退款申请处理</h3>
          <p>根据业务原因和使用记录进行退款审核。</p>
        </div>
        <div class="toolbar">
          <button class="primary-btn" onclick="showModal('审核通过','退款申请已通过，等待财务系统执行退款。')">审核通过</button>
          <button class="danger-btn" onclick="showModal('驳回退款','退款申请已驳回，请补充原因说明。')">驳回申请</button>
          <button class="ghost-btn" onclick="showModal('退款报表','已模拟生成退款报表。')">生成退款报表</button>
        </div>
      </div>
      <div class="card-body">
        <div class="form-grid">
          <div class="form-item">
            <label>客户名称</label>
            <input value="秦港算法工作室" />
          </div>
          <div class="form-item">
            <label>退款原因</label>
            <select>
              <option>算力未使用</option>
              <option>服务异常</option>
              <option>套餐变更</option>
              <option>重复支付</option>
            </select>
          </div>
          <div class="form-item">
            <label>退款金额</label>
            <input value="2680" />
          </div>
          <div class="form-item">
            <label>退款方式</label>
            <select>
              <option>原路退回</option>
              <option>银行转账</option>
              <option>微信退款</option>
              <option>支付宝退款</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="card-header">
        <div>
          <h3>退款记录</h3>
          <p>记录退款金额、退款方式、退款时间和处理状态。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>退款单号</th>
              <th>客户</th>
              <th>退款原因</th>
              <th>退款金额</th>
              <th>退款方式</th>
              <th>退款时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${state.refunds.map(r => `
              <tr>
                <td>${r.id}</td>
                <td>${r.customer}</td>
                <td>${r.reason}</td>
                <td>${money(r.amount)}</td>
                <td>${r.method}</td>
                <td>${r.time}</td>
                <td>${badge(r.status)}</td>
                <td>
                  <button class="ghost-btn" onclick="showModal('查看退款','正在查看 ${r.id} 的退款审核记录。')">查看</button>
                  <button class="primary-btn" onclick="showModal('对接财务系统','已将 ${r.id} 推送至财务系统处理。')">对接财务</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderPermission() {
  content.innerHTML = `
    ${moduleSummary(
      "财务权限管理",
      "分级设置财务权限，包括管理员、核算员、出纳，不同权限对应不同操作，保障财务数据安全。",
      ["管理员权限", "核算员权限", "出纳权限", "审计只读权限"]
    )}

    <div class="grid grid-3">
      <div class="metric-card">
        <div class="metric-label">财务角色数量</div>
        <div class="metric-value stat-number">5 类</div>
        <div class="metric-trend trend-up">✅ 权限体系完整</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">敏感操作审计</div>
        <div class="metric-value stat-number">${state.auditLogs.length} 条</div>
        <div class="metric-trend trend-up">📝 账单修改、发票作废均已记录</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">异常登录拦截</div>
        <div class="metric-value stat-number">2 次</div>
        <div class="metric-trend trend-down">🔒 建议开启二次验证</div>
      </div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="card-header">
        <div>
          <h3>角色权限设置</h3>
          <p>不同权限对应不同操作范围。</p>
        </div>
        <button class="primary-btn" onclick="showAddRoleModal()">新增角色</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>角色</th>
              <th>成员</th>
              <th>可操作范围</th>
              <th>权限等级</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${state.permissions.map(p => `
              <tr>
                <td>${p.role}</td>
                <td>${p.people}</td>
                <td>${p.rules}</td>
                <td>${badge(p.level)}</td>
                <td>
                  <button class="ghost-btn" onclick="showModal('编辑权限','正在编辑 ${p.role} 的权限范围。')">编辑</button>
                  <button class="danger-btn" onclick="showModal('禁用角色','确认禁用 ${p.role} 吗？')">禁用</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="card-header">
        <div>
          <h3>安全审计日志</h3>
          <p>记录计费规则设置、账单生成、支付确认等敏感操作。</p>
        </div>
        <button class="ghost-btn" onclick="showModal('导出日志','安全审计日志已模拟导出。')">导出日志</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>操作人</th>
              <th>角色</th>
              <th>操作内容</th>
              <th>风险等级</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026-04-27 10:32</td>
              <td>王主任</td>
              <td>财务管理员</td>
              <td>修改 B300 8卡集群长期租赁折扣</td>
              <td>${badge("最高权限")}</td>
            </tr>
            <tr>
              <td>2026-04-27 09:48</td>
              <td>李核算</td>
              <td>核算员</td>
              <td>生成 2026-04 月度账单</td>
              <td>${badge("业务权限")}</td>
            </tr>
            <tr>
              <td>2026-04-26 17:20</td>
              <td>陈出纳</td>
              <td>出纳</td>
              <td>确认 BILL-202604-001 到账</td>
              <td>${badge("结算权限")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function setPage(page) {
  const meta = pageMeta[page];
  pageTitle.textContent = meta.title;
  pageDesc.textContent = meta.desc;

  navItems.forEach(item => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  if (page === "dashboard") renderDashboard();
  if (page === "rules") renderRules();
  if (page === "autoBilling") renderAutoBilling();
  if (page === "bills") renderBills();
  if (page === "settlement") renderSettlement();
  if (page === "invoice") renderInvoice();
  if (page === "revenue") renderRevenue();
  if (page === "refund") renderRefund();
  if (page === "permission") renderPermission();
}

navItems.forEach(item => {
  item.addEventListener("click", () => setPage(item.dataset.page));
});

function addRule() {
  const name = document.getElementById("ruleName").value;
  const mode = document.getElementById("ruleMode").value;
  const product = document.getElementById("ruleProduct").value;
  const unitPrice = document.getElementById("rulePrice").value;
  const vipDiscount = document.getElementById("vipDiscount").value;
  const longDiscount = document.getElementById("longDiscount").value;
  const status = document.getElementById("ruleStatus").value;

  const newRule = {
    id: "R-" + String(state.rules.length + 1).padStart(3, "0"),
    name,
    mode,
    product,
    unitPrice,
    vipDiscount,
    longDiscount,
    status,
    createTime: new Date().toISOString().split('T')[0],
    updateBy: "当前用户",
    description: `自定义${mode}规则，适用于${product}`
  };

  state.rules.unshift(newRule);

  // 添加审计日志
  state.auditLogs.unshift({
    id: "AUD-" + String(state.auditLogs.length + 1).padStart(3, "0"),
    time: new Date().toISOString().replace('T', ' ').substring(0, 16),
    operator: "当前用户",
    role: "财务管理员",
    action: "新增计费规则",
    detail: `新增 ${newRule.id} ${name}`,
    risk: "中",
    ip: "当前IP"
  });

  showModal("保存成功", `
    <div style="background: #e8f8ef; padding: 12px; border-left: 3px solid #19b46b; border-radius: 4px; margin-bottom: 16px;">
      <strong>✓ 计费规则保存成功</strong>
    </div>
    <strong>规则信息：</strong><br>
    • 规则编号：${newRule.id}<br>
    • 规则名称：${name}<br>
    • 计费模式：${mode}<br>
    • 适用产品：${product}<br>
    • 计费单价：${unitPrice}<br>
    • VIP折扣：${vipDiscount}<br>
    • 长期折扣：${longDiscount}<br>
    • 规则状态：${status}<br><br>
    <strong>后续操作：</strong><br>
    • 规则已可用于后续自动计费<br>
    • 可在账单生成时选择此规则<br>
    • 可随时修改或停用此规则<br>
    • 操作已记录在审计日志中
  `);
  renderRules();
}

function calcBilling() {
  const customerType = document.getElementById("calcCustomerType").value;
  const product = document.getElementById("calcProduct").value;
  const hours = Number(document.getElementById("calcHours").value || 0);
  const usage = Number(document.getElementById("calcUsage").value || 0);
  const tasks = Number(document.getElementById("calcTasks").value || 0);
  const months = Number(document.getElementById("calcMonths").value || 0);

  let base = 0;
  let rule = "";
  let appliedRule = "";

  if (product.includes("B300")) {
    base = hours * 268 * (usage / 100);
    rule = "按使用时长计费";
    appliedRule = "R-001";
  } else if (product.includes("单卡")) {
    base = hours * 36;
    rule = "按算力性能计费";
    appliedRule = "R-002";
  } else if (product.includes("训推")) {
    base = months * 48000 + tasks * 0.18;
    rule = "长期租赁套餐计费";
    appliedRule = "R-003";
  } else {
    base = tasks * 0.18;
    rule = "按任务量计费";
    appliedRule = "R-004";
  }

  let discountRate = 1;
  let discountReason = "";

  if (customerType.includes("VIP")) {
    discountRate = 0.92;
    discountReason = "VIP客户折扣 9.2折";
  }
  if (months >= 3) {
    discountRate = Math.min(discountRate, 0.86);
    discountReason = discountReason ? discountReason + " + " : "";
    discountReason += "长期租赁折扣 8.6折";
  }

  const discount = base * (1 - discountRate);
  const payable = base - discount;

  // 保存计费明细到状态
  const billingDetail = {
    id: "DET-" + String(state.billingDetails.length + 1).padStart(3, "0"),
    customer: customerType,
    product: product,
    hours: hours,
    usageRate: usage,
    tasks: tasks,
    months: months,
    originalCost: Math.round(base),
    discountAmount: Math.round(discount),
    finalCost: Math.round(payable),
    ruleApplied: appliedRule,
    createTime: new Date().toISOString()
  };

  document.getElementById("calcResult").innerHTML = `
    <div class="kpi-strip">
      <div class="kpi-mini">
        <span>📋 匹配规则</span>
        <strong style="font-size:15px;">${rule}</strong>
      </div>
      <div class="kpi-mini">
        <span>💰 原始费用</span>
        <strong class="stat-number">${money(base.toFixed(0))}</strong>
      </div>
      <div class="kpi-mini">
        <span>💸 折扣金额</span>
        <strong class="stat-number" style="color:var(--green);">${money(discount.toFixed(0))}</strong>
      </div>
      <div class="kpi-mini">
        <span>💎 应付金额</span>
        <strong class="stat-number" style="font-size:20px; color:var(--blue);">${money(payable.toFixed(0))}</strong>
      </div>
      <div class="kpi-mini">
        <span>✅ 计费状态</span>
        <strong style="font-size:15px;color:var(--green);">已生成明细</strong>
      </div>
    </div>
    <div class="status-card success" style="margin-top: 12px;">
      <strong>📊 计费详情：</strong><br>
      • 折扣原因：${discountReason || "无折扣"}<br>
      • 实际折扣率：${((1 - discountRate) * 100).toFixed(1)}%<br>
      • 明细编号：${billingDetail.id}<br>
      • 可用于后续账单生成
    </div>
    <div style="margin-top: 10px; text-align: right;">
      <button class="primary-btn" style="padding: 6px 14px; font-size: 12px;" onclick="saveBillingDetail()">💾 保存明细</button>
    </div>
  `;

  // 临时存储当前计费明细，供保存函数使用
  window.currentBillingDetail = billingDetail;
}

function saveBillingDetail() {
  if (window.currentBillingDetail) {
    state.billingDetails.unshift(window.currentBillingDetail);

    // 添加审计日志
    state.auditLogs.unshift({
      id: "AUD-" + String(state.auditLogs.length + 1).padStart(3, "0"),
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      operator: "当前用户",
      role: "核算员",
      action: "生成计费明细",
      detail: `生成 ${window.currentBillingDetail.id}，金额 ${money(window.currentBillingDetail.finalCost)}`,
      risk: "低",
      ip: "当前IP"
    });

    showModal("保存成功", `
      <div style="background: #e8f8ef; padding: 12px; border-left: 3px solid #19b46b; border-radius: 4px; margin-bottom: 16px;">
        <strong>✓ 计费明细保存成功</strong>
      </div>
      <strong>明细信息：</strong><br>
      • 明细编号：${window.currentBillingDetail.id}<br>
      • 客户类型：${window.currentBillingDetail.customer}<br>
      • 算力产品：${window.currentBillingDetail.product}<br>
      • 应付金额：${money(window.currentBillingDetail.finalCost)}<br><br>
      <strong>后续操作：</strong><br>
      • 可用于账单生成<br>
      • 可在账单管理中查看此明细<br>
      • 操作已记录在审计日志中
    `);
  }
}

function showModal(title, body) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = body;
  document.getElementById("modalMask").classList.add("show");
}

function showEditBillModal(billId) {
  const bill = state.bills.find(b => b.id === billId);
  if (!bill) {
    showModal("错误", "未找到该账单");
    return;
  }

  // 获取相关联的规则信息
  const rule = state.rules.find(r => r.id === bill.ruleId);

  const modalBody = `
    <div style="padding: 0;">
      <div style="padding: 16px 18px 12px 18px; border-bottom: 1px solid var(--border);">
        <div style="margin-bottom: 8px;">
          <h3 style="margin: 0 0 4px 0; font-size: 16px; color: var(--text);">修改客户账单</h3>
          <p style="margin: 0; color: var(--muted); font-size: 13px;">账单编号：${billId} | 客户：${bill.customer}</p>
        </div>
      </div>

      <div class="card-body" style="padding: 16px 18px;">
        <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
            <div><strong style="color: var(--muted);">客户类型：</strong>${bill.type}</div>
            <div><strong style="color: var(--muted);">账期：</strong>${bill.period}</div>
            <div><strong style="color: var(--muted);">创建时间：</strong>${bill.createTime}</div>
            <div><strong style="color: var(--muted);">关联规则：</strong>${rule ? rule.name : '-'}</div>
          </div>
        </div>

        <div class="form-grid">
          <div class="form-item">
            <label>计费明细描述</label>
            <input type="text" id="editBillDetail" value="${bill.detail}" />
          </div>
          <div class="form-item">
            <label>算力产品</label>
            <select id="editBillProduct">
              <option value="B300 8卡集群租赁" ${bill.product === 'B300 8卡集群租赁' ? 'selected' : ''}>B300 8卡集群租赁</option>
              <option value="单卡算力租赁" ${bill.product === '单卡算力租赁' ? 'selected' : ''}>单卡算力租赁</option>
              <option value="训推一体套餐" ${bill.product === '训推一体套餐' ? 'selected' : ''}>训推一体套餐</option>
              <option value="批量推理任务" ${bill.product === '批量推理任务' ? 'selected' : ''}>批量推理任务</option>
              <option value="长期租赁套餐" ${bill.product === '长期租赁套餐' ? 'selected' : ''}>长期租赁套餐</option>
            </select>
          </div>
          <div class="form-item">
            <label>原价（元）</label>
            <input type="number" id="editBillOriginal" value="${bill.original}" />
          </div>
          <div class="form-item">
            <label>折扣金额（元）</label>
            <input type="number" id="editBillDiscount" value="${bill.discount}" />
          </div>
          <div class="form-item">
            <label>应付金额（元）</label>
            <input type="number" id="editBillPayable" value="${bill.payable}" />
          </div>
          <div class="form-item">
            <label>账单状态</label>
            <select id="editBillStatus">
              <option value="未支付" ${bill.status === '未支付' ? 'selected' : ''}>未支付</option>
              <option value="已支付" ${bill.status === '已支付' ? 'selected' : ''}>已支付</option>
              <option value="逾期未支付" ${bill.status === '逾期未支付' ? 'selected' : ''}>逾期未支付</option>
              <option value="待确认" ${bill.status === '待确认' ? 'selected' : ''}>待确认</option>
            </select>
          </div>
        </div>

        <div class="form-item" style="margin-top: 16px;">
          <label>修改原因</label>
          <select id="editBillReason" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px;">
            <option value="">请选择修改原因</option>
            <option value="计算错误">计算错误</option>
            <option value="客户协商">客户协商</option>
            <option value="系统调整">系统调整</option>
            <option value="优惠政策调整">优惠政策调整</option>
            <option value="其他原因">其他原因</option>
          </select>
        </div>

        <div style="background: #e8f4fd; padding: 12px; border-left: 4px solid var(--blue); border-radius: 8px; margin-top: 16px;">
          <p style="margin: 0; color: var(--muted); font-size: 13px;">📊 <strong>费用计算：</strong>应付金额 = 原价 - 折扣金额，系统会自动验证计算的准确性。</p>
        </div>

        <div style="background: #fff3df; padding: 12px; border-left: 4px solid #ff9f1a; border-radius: 8px; margin-top: 12px;">
          <p style="margin: 0; color: var(--muted); font-size: 13px;">⚠️ 修改账单金额会直接影响结算和发票，请谨慎操作并确认修改原因。</p>
        </div>
      </div>
    </div>
  `;

  showModal('修改客户账单', modalBody);

  // 监听原价和折扣金额变化，自动计算应付金额
  const originalInput = document.getElementById('editBillOriginal');
  const discountInput = document.getElementById('editBillDiscount');
  const payableInput = document.getElementById('editBillPayable');

  function autoCalculatePayable() {
    const original = parseFloat(originalInput.value) || 0;
    const discount = parseFloat(discountInput.value) || 0;
    const payable = Math.max(0, original - discount);
    payableInput.value = payable;
  }

  originalInput.addEventListener('input', autoCalculatePayable);
  discountInput.addEventListener('input', autoCalculatePayable);

  // 设置确认按钮的回调
  document.getElementById('confirmModal').onclick = function() {
    const reason = document.getElementById('editBillReason').value;
    if (!reason) {
      alert('请选择修改原因');
      return;
    }

    const originalAmount = parseFloat(document.getElementById('editBillOriginal').value) || 0;
    const discountAmount = parseFloat(document.getElementById('editBillDiscount').value) || 0;
    const payableAmount = parseFloat(document.getElementById('editBillPayable').value) || 0;

    // 验证金额计算
    const calculatedPayable = originalAmount - discountAmount;
    if (Math.abs(calculatedPayable - payableAmount) > 0.01) {
      alert('应付金额计算不正确，应为：' + calculatedPayable.toFixed(2));
      return;
    }

    const updatedBill = {
      id: billId,
      customer: bill.customer,
      type: bill.type,
      period: bill.period,
      product: document.getElementById('editBillProduct').value,
      detail: document.getElementById('editBillDetail').value.trim(),
      original: originalAmount,
      discount: discountAmount,
      payable: payableAmount,
      status: document.getElementById('editBillStatus').value,
      createTime: bill.createTime,
      paymentTime: bill.paymentTime,
      ruleId: bill.ruleId
    };

    // 更新state中的账单
    const billIndex = state.bills.findIndex(b => b.id === billId);
    if (billIndex !== -1) {
      state.bills[billIndex] = updatedBill;

      // 如果账单状态改为已支付，更新结算信息
      if (updatedBill.status === '已支付' && bill.status !== '已支付') {
        const settlementIndex = state.settlements.findIndex(s => s.billId === billId);
        if (settlementIndex !== -1) {
          state.settlements[settlementIndex].amount = payableAmount;
          state.settlements[settlementIndex].method = '系统登记';
          state.settlements[settlementIndex].time = new Date().toISOString().replace('T', ' ').substring(0, 16);
          state.settlements[settlementIndex].financeCheck = '已对账';
          state.settlements[settlementIndex].operator = '当前用户';
        }
      }

      // 添加审计日志
      state.auditLogs.unshift({
        id: "AUD-" + String(state.auditLogs.length + 1).padStart(3, "0"),
        time: new Date().toISOString().replace('T', ' ').substring(0, 16),
        operator: "当前用户",
        role: "核算员",
        action: "修改账单",
        detail: `修改 ${billId}，原因：${reason}，金额从 ${money(bill.payable)} 调整为 ${money(updatedBill.payable)}`,
        risk: "中",
        ip: "当前IP"
      });

      closeModal();
      renderBills();

      showModal('修改成功', `
        <div style="padding: 12px 16px;">
          <div style="background: #e8f8ef; padding: 12px; border-left: 4px solid #19b46b; border-radius: 8px; margin-bottom: 16px;">
            <strong>✓ 账单修改成功</strong>
          </div>
          <strong>修改后的账单信息：</strong><br>
          • 账单编号：${updatedBill.id}<br>
          • 客户：${updatedBill.customer}<br>
          • 计费明细：${updatedBill.detail}<br>
          • 算力产品：${updatedBill.product}<br>
          • 原价：${money(updatedBill.original)}<br>
          • 折扣金额：${money(updatedBill.discount)}<br>
          • 应付金额：${money(updatedBill.payable)}<br>
          • 账单状态：${badge(updatedBill.status)}<br>
          • 修改原因：${reason}<br><br>
          <strong>后续操作：</strong><br>
          • 账单金额已更新<br>
          ${updatedBill.status === '已支付' ? '• 结算信息已同步更新<br>' : ''}
          • 可发送新的账单通知给客户<br>
          • 操作已记录在审计日志中
        </div>
      `);
    }
  };

  // 重置确认按钮的默认行为
  document.getElementById('cancelModal').onclick = function() {
    closeModal();
    document.getElementById('confirmModal').onclick = closeModal;
  };
}

function showEditRuleModal(ruleId) {
  const rule = state.rules.find(r => r.id === ruleId);
  if (!rule) {
    showModal("错误", "未找到该计费规则");
    return;
  }

  const modalBody = `
    <div style="padding: 0;">
      <div style="padding: 16px 18px 12px 18px; border-bottom: 1px solid var(--border);">
        <div style="margin-bottom: 8px;">
          <h3 style="margin: 0 0 4px 0; font-size: 16px; color: var(--text);">编辑计费规则</h3>
          <p style="margin: 0; color: var(--muted); font-size: 13px;">规则编号：${ruleId}</p>
        </div>
      </div>

      <div class="card-body" style="padding: 16px 18px;">
        <div class="form-grid">
          <div class="form-item">
            <label>规则名称</label>
            <input type="text" id="editRuleName" value="${rule.name}" />
          </div>
          <div class="form-item">
            <label>计费模式</label>
            <select id="editRuleMode">
              <option value="按算力性能计费" ${rule.mode === '按算力性能计费' ? 'selected' : ''}>按算力性能计费</option>
              <option value="按使用时长计费" ${rule.mode === '按使用时长计费' ? 'selected' : ''}>按使用时长计费</option>
              <option value="按任务量计费" ${rule.mode === '按任务量计费' ? 'selected' : ''}>按任务量计费</option>
              <option value="长期租赁套餐计费" ${rule.mode === '长期租赁套餐计费' ? 'selected' : ''}>长期租赁套餐计费</option>
            </select>
          </div>
          <div class="form-item">
            <label>适用算力产品</label>
            <select id="editRuleProduct">
              <option value="B300 8卡集群租赁" ${rule.product === 'B300 8卡集群租赁' ? 'selected' : ''}>B300 8卡集群租赁</option>
              <option value="单卡算力租赁" ${rule.product === '单卡算力租赁' ? 'selected' : ''}>单卡算力租赁</option>
              <option value="训推一体套餐" ${rule.product === '训推一体套餐' ? 'selected' : ''}>训推一体套餐</option>
              <option value="批量推理任务" ${rule.product === '批量推理任务' ? 'selected' : ''}>批量推理任务</option>
            </select>
          </div>
          <div class="form-item">
            <label>自定义计费单价</label>
            <input type="text" id="editRulePrice" value="${rule.unitPrice}" />
          </div>
          <div class="form-item">
            <label>VIP客户折扣</label>
            <input type="text" id="editVipDiscount" value="${rule.vipDiscount}" />
          </div>
          <div class="form-item">
            <label>长期租赁折扣</label>
            <input type="text" id="editLongDiscount" value="${rule.longDiscount}" />
          </div>
          <div class="form-item">
            <label>规则状态</label>
            <select id="editRuleStatus">
              <option value="启用" ${rule.status === '启用' ? 'selected' : ''}>启用</option>
              <option value="试运行" ${rule.status === '试运行' ? 'selected' : ''}>试运行</option>
              <option value="停用" ${rule.status === '停用' ? 'selected' : ''}>停用</option>
            </select>
          </div>
          <div class="form-item">
            <label>最后更新人</label>
            <input type="text" value="${rule.updateBy}" disabled style="background: #f8fafc; color: #64748b;" />
          </div>
        </div>

        <div class="form-item" style="margin-top: 16px;">
          <label>规则说明</label>
          <textarea id="editRuleDescription" style="width: 100%; min-height: 80px; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px; font-family: inherit; resize: vertical;">${rule.description}</textarea>
        </div>

        <div style="background: #fff3df; padding: 12px; border-left: 4px solid #ff9f1a; border-radius: 8px; margin-top: 16px;">
          <p style="margin: 0; color: var(--muted); font-size: 13px;">⚠️ 修改计费规则将影响后续生成的账单，建议在业务低峰期进行修改。</p>
        </div>
      </div>
    </div>
  `;

  showModal('编辑计费规则', modalBody);

  // 设置确认按钮的回调
  document.getElementById('confirmModal').onclick = function() {
    const updatedRule = {
      id: ruleId,
      name: document.getElementById('editRuleName').value.trim(),
      mode: document.getElementById('editRuleMode').value,
      product: document.getElementById('editRuleProduct').value,
      unitPrice: document.getElementById('editRulePrice').value.trim(),
      vipDiscount: document.getElementById('editVipDiscount').value.trim(),
      longDiscount: document.getElementById('editLongDiscount').value.trim(),
      status: document.getElementById('editRuleStatus').value,
      createTime: rule.createTime,
      updateBy: '当前用户',
      description: document.getElementById('editRuleDescription').value.trim()
    };

    // 更新state中的规则
    const ruleIndex = state.rules.findIndex(r => r.id === ruleId);
    if (ruleIndex !== -1) {
      state.rules[ruleIndex] = updatedRule;

      // 添加审计日志
      state.auditLogs.unshift({
        id: "AUD-" + String(state.auditLogs.length + 1).padStart(3, "0"),
        time: new Date().toISOString().replace('T', ' ').substring(0, 16),
        operator: "当前用户",
        role: "财务管理员",
        action: "修改计费规则",
        detail: `修改 ${ruleId} ${updatedRule.name} 的价格、折扣等参数`,
        risk: "高",
        ip: "当前IP"
      });

      closeModal();
      renderRules();

      showModal('修改成功', `
        <div style="padding: 12px 16px;">
          <div style="background: #e8f8ef; padding: 12px; border-left: 4px solid #19b46b; border-radius: 8px; margin-bottom: 16px;">
            <strong>✓ 计费规则修改成功</strong>
          </div>
          <strong>修改后的规则信息：</strong><br>
          • 规则编号：${updatedRule.id}<br>
          • 规则名称：${updatedRule.name}<br>
          • 计费模式：${updatedRule.mode}<br>
          • 适用产品：${updatedRule.product}<br>
          • 计费单价：${updatedRule.unitPrice}<br>
          • VIP折扣：${updatedRule.vipDiscount}<br>
          • 长期折扣：${updatedRule.longDiscount}<br>
          • 规则状态：${updatedRule.status}<br><br>
          <strong>后续操作：</strong><br>
          • 新账单将使用修改后的规则<br>
          • 历史账单不受影响<br>
          • 可随时再次修改或停用此规则<br>
          • 操作已记录在审计日志中
        </div>
      `);
    }
  };

  // 重置确认按钮的默认行为
  document.getElementById('cancelModal').onclick = function() {
    closeModal();
    document.getElementById('confirmModal').onclick = closeModal;
  };
}

function showDetailedFlow() {
  const body = `
    <div style="line-height: 1.8;">
      <p>算力租赁计费流程实现从用量采集到发票开具的全流程自动化。</p>

      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin: 12px 0;">
        <strong>Step 01 - 用量采集</strong>
        <p style="margin: 6px 0 0; color: #64748b;">实时采集 GPU 卡时、集群使用时长、任务数量、资源占用率，数据精度到分钟级别，支持多集群并发采集。</p>
      </div>

      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin: 12px 0;">
        <strong>Step 02 - 自动计费</strong>
        <p style="margin: 6px 0 0; color: #64748b;">智能匹配最优计费规则，自动应用 VIP 折扣、长期租赁折扣，支持跨产品组合计费，确保客户享受最优价格。</p>
      </div>

      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin: 12px 0;">
        <strong>Step 03 - 账单生成</strong>
        <p style="margin: 6px 0 0; color: #64748b;">生成月度、季度、年度账单，支持账单修改、作废、重新生成，一键导出 Excel/PDF，方便客户查看和归档。</p>
      </div>

      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin: 12px 0;">
        <strong>Step 04 - 结算对账</strong>
        <p style="margin: 6px 0 0; color: #64748b;">登记支付金额、支付方式、支付时间，自动完成财务与客户对账，异常账单预警，支持多种支付方式对账。</p>
      </div>

      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin: 12px 0;">
        <strong>Step 05 - 发票退款</strong>
        <p style="margin: 6px 0 0; color: #64748b;">开具电子/纸质发票，实时同步税务系统，处理退款申请并生成退款财务报表，确保税务合规。</p>
      </div>

      <p style="margin-top: 16px; color: #64748b;">整个流程自动化处理，人工仅需审核异常情况和处理退款，大幅提升财务运营效率。</p>
    </div>
  `;
  showModal("算力租赁计费流程详解", body);
}

function showDetailedBillingGeneration() {
  const body = `
    <div style="line-height: 1.8;">
      <div style="background: #e8f8ef; padding: 12px; border-left: 3px solid #19b46b; border-radius: 4px; margin-bottom: 16px;">
        <strong>✓ 账单生成成功</strong>
      </div>

      <strong>生成统计：</strong>
      <ul style="margin: 8px 0; padding-left: 20px;">
        <li>生成账单数量：5 笔</li>
        <li>涉及客户：5 家</li>
        <li>账单总金额：¥254,011</li>
        <li>折扣总金额：¥31,241</li>
        <li>实际应收：¥222,770</li>
      </ul>

      <strong>账单明细：</strong>
      <table style="width: 100%; margin: 8px 0; border-collapse: collapse; font-size: 13px;">
        <tr style="background: #f8fafc;">
          <th style="padding: 8px; text-align: left;">客户</th>
          <th style="padding: 8px; text-align: left;">产品</th>
          <th style="padding: 8px; text-align: right;">金额</th>
        </tr>
        <tr>
          <td style="padding: 8px;">燕山智能制造研究院</td>
          <td style="padding: 8px;">B300集群</td>
          <td style="padding: 8px; text-align: right;">¥80,379</td>
        </tr>
        <tr>
          <td style="padding: 8px;">北方数据科技有限公司</td>
          <td style="padding: 8px;">训推套餐</td>
          <td style="padding: 8px; text-align: right;">¥50,216</td>
        </tr>
        <tr>
          <td style="padding: 8px;">张明</td>
          <td style="padding: 8px;">单卡租赁</td>
          <td style="padding: 8px; text-align: right;">¥3,456</td>
        </tr>
        <tr>
          <td style="padding: 8px;">海港视觉算法实验室</td>
          <td style="padding: 8px;">长期套餐</td>
          <td style="padding: 8px; text-align: right;">¥120,960</td>
        </tr>
        <tr>
          <td style="padding: 8px;">秦港算法工作室</td>
          <td style="padding: 8px;">批量任务</td>
          <td style="padding: 8px; text-align: right;">¥2,610</td>
        </tr>
      </table>

      <p style="margin-top: 16px; color: #64748b;">账单已推送到客户账户，可通过账单管理页面查看详情。</p>
    </div>
  `;
  showModal("自动生成账单完成", body);
}

function closeModal() {
  document.getElementById("modalMask").classList.remove("show");
}

document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("cancelModal").addEventListener("click", closeModal);
document.getElementById("confirmModal").addEventListener("click", closeModal);

document.getElementById("exportBtn").addEventListener("click", () => {
  showModal("导出报表", `
    <div style="background: #e8f8ef; padding: 12px; border-left: 3px solid #19b46b; border-radius: 4px; margin-bottom: 16px;">
      <strong>✓ 报表导出成功</strong>
    </div>
    <strong>财务运营综合报表</strong><br><br>
    <strong>报表内容：</strong><br>
    • 财务运营驾驶舱汇总<br>
    • 客户账单明细表<br>
    • 结算支付记录表<br>
    • 发票开具记录表<br>
    • 退款处理记录表<br>
    • 营收统计分析表<br><br>
    <strong>导出格式：</strong><br>
    • Excel格式：财务运营综合报表.xlsx<br>
    • PDF格式：财务运营综合报表.pdf<br><br>
    <strong>文件保存位置：</strong><br>
    /exports/2026-04-comprehensive-report/<br><br>
    <strong>报表时间范围：</strong><br>
    2026年4月1日 - 2026年4月30日<br><br>
    报表已生成完毕，可分享给管理层查看。
  `);
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const keyword = document.getElementById("globalSearch").value.trim();
  if (!keyword) {
    showModal("搜索提示", `
      <div style="background: #fff3df; padding: 12px; border-left: 3px solid #ff9f1a; border-radius: 4px; margin-bottom: 16px;">
        <strong>⚠ 搜索提示</strong>
      </div>
      <strong>请输入搜索关键词</strong><br><br>
      <strong>支持搜索内容：</strong><br>
      • 客户名称：燕山智能制造研究院、张明等<br>
      • 账单编号：BILL-202604-001等<br>
      • 发票号：INV-202604-8841等<br>
      • 退款单号：REF-001等<br>
      • 产品名称：B300集群、训推套餐等<br><br>
      <strong>搜索范围：</strong><br>
      账单管理、结算管理、发票管理、退款管理等模块
    `);
  } else {
    // 模拟搜索结果
    const results = [];
    if (keyword.includes("燕山") || keyword.includes("研究院")) {
      results.push({type: "账单", id: "BILL-202604-001", desc: "燕山智能制造研究院 - ¥80,379"});
      results.push({type: "结算", id: "PAY-001", desc: "燕山智能制造研究院 - ¥80,379"});
      results.push({type: "发票", id: "INV-202604-8841", desc: "燕山智能制造研究院 - ¥80,379"});
    }
    if (keyword.includes("BILL") || keyword.includes("账单")) {
      state.bills.forEach(bill => {
        results.push({type: "账单", id: bill.id, desc: `${bill.customer} - ${money(bill.payable)}`});
      });
    }

    let resultHTML = "";
    if (results.length > 0) {
      resultHTML = `
        <strong>搜索结果：</strong>找到 ${results.length} 条匹配记录<br><br>
        <table style="width: 100%; margin: 8px 0; border-collapse: collapse; font-size: 13px;">
          <tr style="background: #f8fafc;">
            <th style="padding: 8px; text-align: left;">类型</th>
            <th style="padding: 8px; text-align: left;">编号</th>
            <th style="padding: 8px; text-align: left;">描述</th>
            <th style="padding: 8px; text-align: center;">操作</th>
          </tr>
          ${results.map(r => `
            <tr>
              <td style="padding: 8px;">${r.type}</td>
              <td style="padding: 8px;">${r.id}</td>
              <td style="padding: 8px;">${r.desc}</td>
              <td style="padding: 8px; text-align: center;">
                <button class="ghost-btn" style="padding: 4px 8px; font-size: 11px;">查看</button>
              </td>
            </tr>
          `).join('')}
        </table>
      `;
    } else {
      resultHTML = `
        <div style="background: #f8fafc; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
          <strong>搜索结果</strong>
        </div>
        未找到与"<strong>${keyword}</strong>"匹配的记录。<br><br>
        <strong>建议：</strong><br>
        • 检查搜索关键词是否正确<br>
        • 尝试使用更简短的关键词<br>
        • 查看支持搜索的内容列表
      `;
    }

    showModal("搜索结果", resultHTML);
  }
});

function drawBarChart(canvasId, labels, values, unit) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width - 20;
  canvas.height = rect.height - 20;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = 36;
  const max = Math.max(...values) * 1.2;
  const barWidth = (width - padding * 2) / values.length * 0.55;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fbfdff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#d8e1ec";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding / 2, height - padding);
  ctx.stroke();

  values.forEach((v, i) => {
    const x = padding + i * ((width - padding * 2) / values.length) + 16;
    const barHeight = (v / max) * (height - padding * 2);
    const y = height - padding - barHeight;

    const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
    gradient.addColorStop(0, "#1677ff");
    gradient.addColorStop(1, "#18c7d7");

    ctx.fillStyle = gradient;
    roundRect(ctx, x, y, barWidth, barHeight, 8);
    ctx.fill();

    ctx.fillStyle = "#475569";
    ctx.font = "12px Microsoft YaHei";
    ctx.textAlign = "center";
    ctx.fillText(labels[i], x + barWidth / 2, height - 12);

    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 12px Microsoft YaHei";
    ctx.fillText(v + unit, x + barWidth / 2, y - 8);
  });
}

function drawPieLikeChart(canvasId, labels, values) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width - 20;
  canvas.height = rect.height - 20;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const total = values.reduce((a, b) => a + b, 0);
  const cx = width * 0.36;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.28;
  let start = -Math.PI / 2;

  const colors = ["#1677ff", "#18c7d7", "#19b46b", "#ff9f1a", "#7655ff"];

  values.forEach((v, i) => {
    const angle = (v / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    start += angle;
  });

  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.56, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  ctx.fillStyle = "#172033";
  ctx.font = "bold 18px Microsoft YaHei";
  ctx.textAlign = "center";
  ctx.fillText("占比", cx, cy - 4);
  ctx.font = "12px Microsoft YaHei";
  ctx.fillStyle = "#64748b";
  ctx.fillText("分析", cx, cy + 16);

  labels.forEach((label, i) => {
    const x = width * 0.68;
    const y = 46 + i * 36;

    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(x, y - 10, 12, 12);

    ctx.fillStyle = "#334155";
    ctx.font = "13px Microsoft YaHei";
    ctx.textAlign = "left";
    ctx.fillText(`${label}：${values[i]}%`, x + 20, y);
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

// 为弹窗添加更好的数据展示样式
function formatDataDisplay(data) {
  if (typeof data === 'number') {
    return data.toLocaleString('zh-CN');
  } else if (typeof data === 'string' && data.startsWith('¥')) {
    return data;
  }
  return data;
}

// 跨模块数据关联函数
function getBillRelatedData(billId) {
  const bill = state.bills.find(b => b.id === billId);
  if (!bill) return null;

  return {
    bill: bill,
    settlement: state.settlements.find(s => s.billId === billId),
    invoice: state.invoices.find(i => i.billId === billId),
    rule: state.rules.find(r => r.id === bill.ruleId)
  };
}

function showBillDetails(billId) {
  const relatedData = getBillRelatedData(billId);
  if (!relatedData) {
    showModal("账单详情", "未找到该账单的详细信息");
    return;
  }

  const { bill, settlement, invoice, rule } = relatedData;

  const body = `
    <strong>账单基本信息：</strong><br>
    • 账单编号：${bill.id}<br>
    • 客户：${bill.customer}<br>
    • 客户类型：${bill.type}<br>
    • 账期：${bill.period}<br>
    • 算力产品：${bill.product}<br>
    • 计费明细：${bill.detail}<br><br>

    <strong>费用信息：</strong><br>
    • 原价：${money(bill.original)}<br>
    • 折扣金额：${money(bill.discount)}<br>
    • 应付金额：${money(bill.payable)}<br>
    • 账单状态：${badge(bill.status)}<br><br>

    ${rule ? `<strong>匹配的计费规则：</strong><br>
    • 规则编号：${rule.id}<br>
    • 规则名称：${rule.name}<br>
    • 计费模式：${rule.mode}<br><br>` : ''}

    ${settlement ? `<strong>结算信息：</strong><br>
    • 支付流水：${settlement.id}<br>
    • 支付金额：${money(settlement.amount)}<br>
    • 支付方式：${settlement.method}<br>
    • 支付时间：${settlement.time}<br>
    • 财务对账：${badge(settlement.financeCheck)}<br>
    • 客户对账：${badge(settlement.customerCheck)}<br><br>` : ''}

    ${invoice ? `<strong>发票信息：</strong><br>
    • 发票号：${invoice.id}<br>
    • 发票类型：${invoice.type}<br>
    • 开票金额：${money(invoice.amount)}<br>
    • 开票日期：${invoice.date}<br>
    • 发票状态：${badge(invoice.status)}<br><br>` : ''}
  `;

  showModal("账单详情", body);
}

// 通知系统
function addNotification(type, title, message) {
  const notification = {
    id: "NOTIF-" + Date.now(),
    type: type, // info, warning, error, success
    title: title,
    message: message,
    time: new Date().toISOString(),
    read: false
  };

  // 在实际应用中，这里会保存通知并显示通知提示
  console.log("New notification:", notification);
}

// 统计数据计算
function calculateStatistics() {
  const totalBills = state.bills.length;
  const paidBills = state.bills.filter(b => b.status === "已支付").length;
  const unpaidBills = state.bills.filter(b => b.status === "未支付").length;
  const overdueBills = state.bills.filter(b => b.status === "逾期未支付").length;

  const totalRevenue = state.bills.reduce((sum, b) => sum + b.payable, 0);
  const paidRevenue = state.bills.filter(b => b.status === "已支付").reduce((sum, b) => sum + b.payable, 0);
  const pendingRevenue = totalRevenue - paidRevenue;

  return {
    totalBills,
    paidBills,
    unpaidBills,
    overdueBills,
    totalRevenue,
    paidRevenue,
    pendingRevenue,
    paymentRate: totalRevenue > 0 ? (paidRevenue / totalRevenue * 100).toFixed(1) : 0
  };
}

function showAddRoleModal() {
  const modalBody = `
    <div style="padding: 0;">
      <div style="padding: 16px 18px 12px 18px;">
        <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px 0; font-size: 15px; color: var(--text);">新增财务角色</h3>
          <p style="margin: 0 0 16px 0; color: var(--muted); font-size: 13px;">设置新的财务角色并配置操作权限。</p>
        </div>

        <div class="form-item" style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 8px; font-size: 12px; color: var(--muted);">角色名称</label>
          <input type="text" id="newRoleName" placeholder="请输入角色名称" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px;" />
        </div>

        <div class="form-item" style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 8px; font-size: 12px; color: var(--muted);">权限等级</label>
          <select id="newRoleLevel" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px;">
            <option value="最高权限">最高权限</option>
            <option value="业务权限">业务权限</option>
            <option value="结算权限">结算权限</option>
            <option value="只读权限">只读权限</option>
          </select>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 12px; font-size: 12px; color: var(--muted);">可操作范围</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 8px;">
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; background: #f8fafc; margin: 0;">
              <input type="checkbox" id="permViewBills" checked /> 查看账单
            </label>
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; background: #f8fafc; margin: 0;">
              <input type="checkbox" id="permGenerateBills" checked /> 生成账单
            </label>
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; background: #f8fafc; margin: 0;">
              <input type="checkbox" id="permModifyBills" /> 修改账单
            </label>
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; background: #f8fafc; margin: 0;">
              <input type="checkbox" id="permConfirmPayment" /> 确认支付
            </label>
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; background: #f8fafc; margin: 0;">
              <input type="checkbox" id="permInvoice" /> 开具发票
            </label>
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; background: #f8fafc; margin: 0;">
              <input type="checkbox" id="permAuditRefund" /> 审核退款
            </label>
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; background: #f8fafc; margin: 0;">
              <input type="checkbox" id="permSetRules" /> 设置规则
            </label>
          </div>
        </div>

        <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 4px solid var(--blue);">
          <p style="margin: 0; color: var(--muted); font-size: 13px;">💡 设置完成后需要管理员审批才能生效。</p>
        </div>
      </div>
    </div>
  `;

  showModal('新增角色', modalBody);

  // 设置确认按钮的回调
  document.getElementById('confirmModal').onclick = function() {
    const roleName = document.getElementById('newRoleName').value.trim();
    const roleLevel = document.getElementById('newRoleLevel').value;

    if (!roleName) {
      alert('请输入角色名称');
      return;
    }

    // 模拟保存角色
    const newRole = {
      role: roleName,
      people: '待分配',
      rules: getPermissionsSummary(),
      level: roleLevel,
      createTime: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0]
    };

    state.permissions.push(newRole);

    // 添加审计日志
    state.auditLogs.unshift({
      id: "AUD-" + String(state.auditLogs.length + 1).padStart(3, "0"),
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      operator: "当前用户",
      role: "财务管理员",
      action: "新增角色",
      detail: `新增财务角色：${roleName}`,
      risk: "中",
      ip: "当前IP"
    });

    closeModal();
    renderPermission();

    showModal('保存成功', `
      <div style="padding: 12px 16px;">
        <div style="background: var(--soft-green); padding: 12px; border-left: 4px solid var(--green); border-radius: 8px; margin-bottom: 16px;">
          <strong>✓ 角色创建成功</strong>
        </div>
        <strong>角色信息：</strong><br>
        • 角色名称：${roleName}<br>
        • 权限等级：${roleLevel}<br>
        • 创建时间：${newRole.createTime}<br><br>
        <strong>后续操作：</strong><br>
        • 可在角色列表中查看新角色<br>
        • 需要分配成员到该角色<br>
        • 管理员审批后即可使用
      </div>
    `);
  };
}

function getPermissionsSummary() {
  const permissions = [];
  if (document.getElementById('permViewBills').checked) permissions.push('查看账单');
  if (document.getElementById('permGenerateBills').checked) permissions.push('生成账单');
  if (document.getElementById('permModifyBills').checked) permissions.push('修改账单');
  if (document.getElementById('permConfirmPayment').checked) permissions.push('确认支付');
  if (document.getElementById('permInvoice').checked) permissions.push('开具发票');
  if (document.getElementById('permAuditRefund').checked) permissions.push('审核退款');
  if (document.getElementById('permSetRules').checked) permissions.push('设置规则');

  return permissions.length > 0 ? permissions.join('、') : '暂无权限';
}

window.addEventListener("resize", () => {
  const active = document.querySelector(".nav-item.active")?.dataset.page || "dashboard";
  setPage(active);
});

// 初始化系统
function initializeSystem() {
  // 添加系统启动审计日志
  state.auditLogs.unshift({
    id: "AUD-INIT",
    time: new Date().toISOString().replace('T', ' ').substring(0, 16),
    operator: "系统",
    role: "系统",
    action: "系统启动",
    detail: "算力计费结算管理系统启动成功",
    risk: "低",
    ip: "localhost"
  });

  // 计算初始统计数据
  const stats = calculateStatistics();
  console.log("System statistics:", stats);

  // 添加系统启动通知
  addNotification("info", "系统启动", "算力计费结算管理系统已启动，数据加载完成");

  setPage("dashboard");
}

// 系统启动
window.addEventListener("DOMContentLoaded", () => {
  initializeSystem();
});

// 保持原有调用作为兼容
setPage("dashboard");