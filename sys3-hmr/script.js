const pageInfo = {
  dashboard: ["客户服务驾驶舱", "面向租赁客户的一站式算力租赁、任务提交、状态查询与费用结算平台。"],
  account: ["客户账号管理", "支持注册、登录、密码重置、客户类型区分、客户分级、联系方式与开票信息绑定。"],
  products: ["算力产品选型与下单", "展示算力规格、价格、租赁周期，支持在线下单、支付并生成租赁合同。"],
  usage: ["算力使用状态查询", "实时查看 GPU 负载、任务进度、资源占用率和任务运行日志。"],
  tasks: ["任务提交与管理", "在线提交训练/推理任务，上传脚本和数据集，设置参数并管理任务生命周期。"],
  billing: ["费用查询与结算", "实时展示使用费用，生成明细账单，支持支付、电子发票和历史账单查询。"],
  demand: ["算力需求申请", "提交定制化算力需求，后台运营人员受理并反馈方案与报价。"],
  message: ["消息通知中心", "推送算力分配、任务状态、费用提醒和故障通知，支持短信与站内信。"],
  support: ["客户反馈与售后", "提交售后需求和意见反馈，查看处理进度并对接专属客服。"],
  security: ["数据安全管理", "对数据集、任务脚本和运行结果进行加密存储、权限隔离与操作审计。"]
};

const products = [
  { id: "P-B300-8", type: "cluster", name: "B300 8卡集群租赁", price: "¥128", unit: "/小时", desc: "适合大模型训练、批量微调、高并发实验，提供独享 8 卡 GPU 与高速互联。", specs: ["8×B300 GPU", "显存 1536GB", "高速 NVLink", "小时/天/月"] },
  { id: "P-SINGLE", type: "single", name: "单卡算力租赁", price: "¥18", unit: "/小时", desc: "适合推理服务、小规模实验、课程实训，可快速开通和释放。", specs: ["1×高性能GPU", "显存 192GB", "弹性释放", "小时/天"] },
  { id: "P-TRAIN-INFER", type: "package", name: "训推一体套餐", price: "¥39,800", unit: "/月", desc: "覆盖模型训练、评测、部署、推理全流程，适合企业长期使用。", specs: ["训练资源", "推理服务", "模型部署", "月/季度"] },
  { id: "P-STORAGE", type: "package", name: "安全数据存储套餐", price: "¥1,280", unit: "/TB/月", desc: "面向客户数据集、脚本和运行结果，提供加密存储与访问审计。", specs: ["AES-256", "对象存储", "权限隔离", "月计费"] },
  { id: "P-LONG", type: "cluster", name: "长期算力预留", price: "询价", unit: "", desc: "面向企业长期项目，支持 16 卡、32 卡、64 卡等规模的专属算力池。", specs: ["专属资源", "运维支持", "合同锁价", "3-12个月"] },
  { id: "P-INFER", type: "single", name: "高并发推理节点", price: "¥28", unit: "/小时", desc: "适合 API 推理、在线服务测试，支持弹性扩缩容和访问监控。", specs: ["低延迟", "弹性扩容", "API部署", "小时计费"] }
];

const resources = [
  { name: "B300 集群 A", customer: "燕山智能科技有限公司", gpu: 82, cpu: 66, memory: 74, progress: 68, state: "运行中", chips: ["8卡", "训练任务", "VIP客户"] },
  { name: "单卡推理池 P1", customer: "王老师课题组", gpu: 57, cpu: 41, memory: 53, progress: 91, state: "推理中", chips: ["单卡", "推理任务", "按小时"] },
  { name: "训推一体 T1", customer: "华北 AI 训练实验室", gpu: 69, cpu: 58, memory: 77, progress: 44, state: "部署中", chips: ["套餐", "训练+推理", "按月"] },
  { name: "长期预留 L2", customer: "燕山智能科技有限公司", gpu: 48, cpu: 37, memory: 39, progress: 22, state: "准备中", chips: ["64卡预留", "专属网络", "报价中"] }
];

let logs = [
  "[10:25:02] B300 集群 A GPU 负载 82%，显存占用 74%",
  "[10:24:31] T-1027 完成第 820/1000 次迭代，loss=0.083",
  "[10:23:44] 任务脚本 finetune_bert.py 校验通过",
  "[10:22:18] 数据集 literature_train_v3.zip 加密挂载完成",
  "[10:20:11] 单卡推理池 P1 返回 268 img/s 吞吐量",
  "[10:18:30] 系统巡检完成：无资源异常"
];

let tasks = [
  { id: "T-1027", name: "LLM 微调任务", type: "训练", progress: 82, status: "运行中" },
  { id: "T-1028", name: "图像分类推理", type: "推理", progress: 100, status: "已完成" },
  { id: "T-1029", name: "文献自动分类训练", type: "训练", progress: 46, status: "运行中" },
  { id: "T-1030", name: "向量检索评测", type: "推理", progress: 15, status: "排队中" }
];

let bills = [
  { id: "BILL-202604-01", item: "B300 8卡集群租赁", method: "按小时计费", amount: "¥28,160", status: "待支付" },
  { id: "BILL-202604-02", item: "训推一体套餐", method: "按月计费", amount: "¥39,800", status: "已支付" },
  { id: "BILL-202604-03", item: "安全数据存储套餐", method: "按月计费", amount: "¥2,180", status: "已支付" },
  { id: "BILL-202604-04", item: "单卡算力租赁", method: "按小时计费", amount: "¥6,260", status: "待支付" }
];

let messages = [
  { type: "算力分配", title: "B300 8卡集群 A 已分配完成", text: "资源已开通，可在算力使用状态查询页面查看 GPU 负载和任务进度。", time: "10:25", unread: true },
  { type: "任务状态", title: "LLM 微调任务进入第 820 次迭代", text: "当前 loss=0.083，预计 38 分钟后完成。", time: "10:24", unread: true },
  { type: "费用提醒", title: "本月有 2 笔账单待支付", text: "请在费用查询与结算页面完成在线支付或上传对公转账回执。", time: "09:42", unread: true },
  { type: "故障通知", title: "单卡推理池短时抖动已恢复", text: "系统自动迁移推理任务，未造成数据丢失。", time: "08:20", unread: true }
];

let supportTickets = [
  { id: "S-24042701", type: "任务报错", staff: "专属客服-李工", progress: "排查日志", status: "处理中" },
  { id: "S-24042605", type: "算力不稳定", staff: "专属客服-张工", progress: "已迁移节点", status: "已解决" },
  { id: "S-24042509", type: "发票问题", staff: "财务客服-赵工", progress: "待客户确认", status: "待确认" }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function showToast(text) {
  const toast = $("#toast");
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function switchPage(pageId) {
  $$(".page").forEach(p => p.classList.remove("active"));
  $$(".nav-item").forEach(n => n.classList.remove("active"));
  const page = document.getElementById(pageId);
  const nav = document.querySelector(`[data-page="${pageId}"]`);
  if (!page || !nav) return;
  page.classList.add("active");
  nav.classList.add("active");
  $("#pageTitle").textContent = pageInfo[pageId][0];
  $("#pageDesc").textContent = pageInfo[pageId][1];
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderProducts(filter = "all") {
  const list = filter === "all" ? products : products.filter(p => p.type === filter);
  $("#productGrid").innerHTML = list.map(product => `
    <article class="product-card">
      <h4>${product.name}</h4>
      <div class="price">${product.price}<small>${product.unit}</small></div>
      <p>${product.desc}</p>
      <div class="spec-list">${product.specs.map(s => `<span>${s}</span>`).join("")}</div>
      <button class="primary-btn" onclick="openOrder('${product.id}')">在线下单并生成合同</button>
    </article>
  `).join("");
}

function renderUsage() {
  $("#resourceBoard").innerHTML = resources.map(r => `
    <article class="resource-card">
      <h4>${r.name}</h4>
      <div class="chips">${r.chips.map(c => `<span class="chip">${c}</span>`).join("")}</div>
      <div>GPU 负载 <b>${r.gpu}%</b><div class="progress-line"><i style="width:${r.gpu}%"></i></div></div>
      <div>任务进度 <b>${r.progress}%</b><div class="progress-line"><i style="width:${r.progress}%"></i></div></div>
    </article>
  `).join("");

  $("#usageTable").innerHTML = resources.map(r => `
    <tr>
      <td>${r.name}</td><td>${r.customer}</td><td>${r.gpu}%</td><td>${r.cpu}%</td><td>${r.memory}%</td><td>${r.progress}%</td><td><span class="status ok">${r.state}</span></td>
    </tr>
  `).join("");
}

function renderLogs() {
  $("#logBox").innerHTML = logs.map(log => `<div>${log}</div>`).join("");
}

function renderTasks() {
  $("#taskTable").innerHTML = tasks.map(t => {
    const statusClass = t.status === "已完成" ? "ok" : (t.status === "已终止" ? "danger" : "warn");
    return `
      <tr>
        <td>${t.id}</td>
        <td>${t.name}</td>
        <td>${t.type}</td>
        <td>${t.progress}%<div class="progress-line"><i style="width:${t.progress}%"></i></div></td>
        <td><span class="status ${statusClass}">${t.status}</span></td>
        <td>
          <button onclick="taskAction('${t.id}','暂停')">暂停</button>
          <button class="ok" onclick="taskAction('${t.id}','重启')">重启</button>
          <button class="danger" onclick="taskAction('${t.id}','终止')">终止</button>
          <button onclick="taskAction('${t.id}','查看结果')">结果</button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderBills() {
  $("#billTable").innerHTML = bills.map(b => {
    const cls = b.status === "已支付" ? "ok" : "warn";
    const action = b.status === "已支付"
      ? `<button onclick="showToast('电子发票下载中...')">下载发票</button>`
      : `<button class="ok" onclick="payBill('${b.id}')">在线支付</button><button onclick="showToast('请上传对公转账回执')">对公转账</button>`;
    return `
      <tr><td>${b.id}</td><td>${b.item}</td><td>${b.method}</td><td>${b.amount}</td><td><span class="status ${cls}">${b.status}</span></td><td>${action}</td></tr>
    `;
  }).join("");
}

function renderMessages() {
  const unreadCount = messages.filter(m => m.unread).length;
  $("#notifyCount").textContent = unreadCount;
  $("#messageList").innerHTML = messages.map((m, index) => `
    <article class="message-card ${m.unread ? "unread" : ""}">
      <div class="message-type">${m.type}</div>
      <div><h4>${m.title}</h4><p>${m.text}</p></div>
      <div><time>${m.time}</time><br><button class="link-btn" onclick="readMessage(${index})">${m.unread ? "标为已读" : "已读"}</button></div>
    </article>
  `).join("");
}

function renderSupport() {
  $("#supportTable").innerHTML = supportTickets.map(t => {
    const cls = t.status === "已解决" ? "ok" : (t.status === "待确认" ? "warn" : "warn");
    return `
      <tr>
        <td>${t.id}</td><td>${t.type}</td><td>${t.staff}</td><td>${t.progress}</td><td><span class="status ${cls}">${t.status}</span></td>
        <td><button onclick="showToast('正在打开工单详情')">查看进度</button><button onclick="showToast('已联系专属客服')">联系客户</button></td>
      </tr>
    `;
  }).join("");
}

function openOrder(productId) {
  const p = products.find(item => item.id === productId);
  $("#modalTitle").textContent = "确认算力产品下单";
  $("#modalBody").innerHTML = `
    <div class="modal-summary">
      <div><span>产品名称</span><b>${p.name}</b></div>
      <div><span>算力规格</span><b>${p.specs.join(" / ")}</b></div>
      <div><span>价格</span><b>${p.price}${p.unit}</b></div>
      <div><span>租赁周期</span><b>按小时 / 天 / 月可选</b></div>
      <div><span>合同生成</span><b>付款后自动生成租赁合同</b></div>
    </div>
    <form class="form-grid" style="margin-top:14px">
      <label>租赁周期<select><option>按小时</option><option>按天</option><option>按月</option><option>长期预留</option></select></label>
      <label>购买数量<input type="number" value="1" min="1"></label>
      <label>支付方式<select><option>线上支付</option><option>对公转账</option><option>账户余额</option></select></label>
      <label>合同主体<input value="燕山智能科技有限公司"></label>
    </form>
    <button class="primary-btn full-btn" onclick="confirmOrder('${p.name}')">确认下单并支付</button>
  `;
  $("#modalMask").classList.add("show");
}

function confirmOrder(name) {
  $("#modalMask").classList.remove("show");
  messages.unshift({ type: "算力分配", title: `${name} 下单成功`, text: "系统已生成租赁合同，资源正在分配中。", time: "刚刚", unread: true });
  renderMessages();
  showToast("下单成功，合同已生成");
}

function taskAction(id, action) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  if (action === "暂停") task.status = "已暂停";
  if (action === "重启") task.status = "运行中";
  if (action === "终止") task.status = "已终止";
  if (action === "查看结果") return showToast(`${id} 运行结果已打开`);
  renderTasks();
  showToast(`${id} 已${action}`);
}

function payBill(id) {
  const bill = bills.find(b => b.id === id);
  if (bill) bill.status = "已支付";
  renderBills();
  showToast(`${id} 支付成功，可申请电子发票`);
}

function readMessage(index) {
  messages[index].unread = false;
  renderMessages();
  showToast("消息已标为已读");
}

function addFormHandlers() {
  $("#sideNav").addEventListener("click", (event) => {
    const item = event.target.closest(".nav-item");
    if (item) switchPage(item.dataset.page);
  });

  $$('[data-jump]').forEach(btn => btn.addEventListener("click", () => switchPage(btn.dataset.jump)));

  $$(".segmented button").forEach(btn => btn.addEventListener("click", () => {
    $$(".segmented button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  }));

  $("#closeModal").addEventListener("click", () => $("#modalMask").classList.remove("show"));
  $("#modalMask").addEventListener("click", (event) => {
    if (event.target.id === "modalMask") $("#modalMask").classList.remove("show");
  });

  function openLoginModal() {
    $("#modalTitle").textContent = "客户登录 / 注册入口";
    $("#modalBody").innerHTML = `
      <form class="stack-form">
        <label>
          登录账号
          <input value="company_admin@demo.com">
        </label>

        <label>
          登录密码
          <input type="password" value="123456">
        </label>

        <label>
          客户类型
          <select>
            <option>企业客户</option>
            <option>个人客户</option>
          </select>
        </label>

        <button 
          type="button" 
          class="primary-btn" 
          onclick="document.querySelector('#modalMask').classList.remove('show');showToast('登录成功，欢迎进入客户服务平台')">
          登录平台
        </button>

        <button 
          type="button" 
          class="secondary-btn" 
          onclick="openRegisterModal()">
          用户注册
        </button>

        <button 
          type="button" 
          class="secondary-btn" 
          onclick="showToast('已发送密码重置链接')">
          忘记密码 / 重置密码
        </button>
      </form>
    `;

    $("#modalMask").classList.add("show");
  }

  function openRegisterModal() {
    $("#modalTitle").textContent = "客户注册";
    $("#modalBody").innerHTML = `
      <form class="stack-form">
        <label>
          客户类型
          <select>
            <option>企业客户</option>
            <option>个人客户</option>
          </select>
        </label>

        <label>
          客户等级
          <select>
            <option>普通客户</option>
            <option>VIP客户</option>
          </select>
        </label>

        <label>
          注册账号
          <input placeholder="请输入手机号或邮箱">
        </label>

        <label>
          设置密码
          <input type="password" placeholder="请输入登录密码">
        </label>

        <label>
          联系方式
          <input placeholder="请输入联系人手机号">
        </label>

        <label>
          企业名称 / 个人姓名
          <input placeholder="请输入企业名称或个人姓名">
        </label>

        <label>
          开票信息
          <input placeholder="请输入开票抬头或纳税人识别号">
        </label>

        <button 
          type="button" 
          class="primary-btn" 
          onclick="document.querySelector('#modalMask').classList.remove('show');showToast('注册成功，账号资料已创建')">
          提交注册
        </button>

        <button 
          type="button" 
          class="secondary-btn" 
          onclick="openLoginModal()">
          已有账号，返回登录
        </button>
      </form>
    `;
  }

  window.openLoginModal = openLoginModal;
  window.openRegisterModal = openRegisterModal;
  $("#openLoginBtn").addEventListener("click", openLoginModal);

  $("#resetPwdBtn").addEventListener("click", () => showToast("密码重置链接已发送到绑定手机/邮箱"));
  $("#accountForm").addEventListener("submit", e => { e.preventDefault(); showToast("账号资料已保存"); });

  $("#addLogBtn").addEventListener("click", () => {
    const now = new Date().toLocaleTimeString("zh-CN", { hour12: false });
    logs.unshift(`[${now}] 手动刷新日志：资源状态正常，任务运行稳定`);
    renderLogs();
    showToast("日志已刷新");
  });

  $("#taskForm").addEventListener("submit", e => {
    e.preventDefault();
    const nextId = `T-${1031 + tasks.length}`;
    tasks.unshift({ id: nextId, name: "新提交训练/推理任务", type: "训练", progress: 0, status: "排队中" });
    logs.unshift(`[${new Date().toLocaleTimeString("zh-CN", { hour12: false })}] ${nextId} 已提交，等待资源调度`);
    renderTasks();
    renderLogs();
    showToast("任务已提交，正在等待资源调度");
  });

  $("#invoiceBtn").addEventListener("click", () => showToast("电子发票申请已提交"));

  $("#demandForm").addEventListener("submit", e => {
    e.preventDefault();
    const timeline = $("#demandTimeline");
    timeline.insertAdjacentHTML("afterbegin", `<div class="timeline-item active"><b>新需求提交</b><p>客户已提交新的定制化算力需求，后台运营人员将跟进报价。</p><span>刚刚</span></div>`);
    showToast("定制化算力需求已提交");
  });

  $("#saveMsgCfg").addEventListener("click", () => showToast("通知配置已保存"));
  $("#markAllRead").addEventListener("click", () => {
    messages = messages.map(m => ({ ...m, unread: false }));
    renderMessages();
    showToast("全部消息已标为已读");
  });
  $("#notifyBtn").addEventListener("click", () => switchPage("message"));

  $("#supportForm").addEventListener("submit", e => {
    e.preventDefault();
    supportTickets.unshift({ id: "S-NEW", type: "任务报错", staff: "专属客服-自动分配中", progress: "已提交", status: "处理中" });
    renderSupport();
    showToast("售后工单已提交，客服将尽快处理");
  });

  $("#globalSearch").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const keyword = e.target.value.trim();
      if (!keyword) return;
      showToast(`已搜索：${keyword}`);
    }
  });
}

function init() {
  renderProducts();
  renderUsage();
  renderLogs();
  renderTasks();
  renderBills();
  renderMessages();
  renderSupport();
  addFormHandlers();
}

window.openOrder = openOrder;
window.confirmOrder = confirmOrder;
window.taskAction = taskAction;
window.payBill = payBill;
window.readMessage = readMessage;
window.showToast = showToast;

document.addEventListener("DOMContentLoaded", init);
