// 个人资料集中维护：后续替换信息时，优先修改这里和 contact.vcf。
const profile = {
  name: "陈锐锋",
  company: "高勤科技",
  title: "部门总监/ 数字化解决方案顾问",
  phone: "15920159212",
  wechat: "agoo20",
  email: "agoo.chen@gzgi.com",
  city: "广州",
  bio:
    "长期从事软件项目管理、系统实施、业务需求分析与解决方案设计工作，熟悉企业数字化系统建设、项目交付管理和客户需求沟通。近年来重点关注 AI 工具在软件研发、投标方案、需求分析、项目管理和效率提升中的应用，希望通过 AI 与行业经验结合，提升个人和团队的数字化服务能力。",
  hobbies: ["户外露营", "年轻时热爱篮球运动", "AI应用"],
  tags: ["AI应用", "项目管理", "软件实施", "需求分析", "解决方案"],
};

const $ = (selector) => document.querySelector(selector);

const toast = $("#toast");
let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function renderList(containerSelector, items, className) {
  const container = $(containerSelector);
  container.innerHTML = "";
  items.forEach((item) => {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = item;
    container.appendChild(span);
  });
}

function renderProfile() {
  document.title = `${profile.name} - 个人电子名片`;
  $("#personName").textContent = profile.name;
  $("#personTitle").textContent = profile.title;
  $("#personCompany").textContent = profile.company;
  $("#phoneText").textContent = profile.phone;
  $("#wechatText").textContent = profile.wechat;
  $("#emailText").textContent = profile.email;
  $("#cityText").textContent = profile.city;
  $("#bioText").textContent = profile.bio;
  $("#callLink").href = `tel:${profile.phone}`;
  $("#phoneText").href = `tel:${profile.phone}`;
  $("#mailLink").href = `mailto:${profile.email}`;
  $("#emailText").href = `mailto:${profile.email}`;
  $("#avatar").alt = `${profile.name}头像`;
  renderList("#hobbiesList", profile.hobbies, "pill");
  renderList("#tagsList", profile.tags, "tag");
}

async function copyWechat() {
  const text = profile.wechat;

  // 微信内置浏览器通常支持 Clipboard API；失败时给出可手动复制的提示。
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("微信号已复制");
      return;
    } catch (error) {
      console.warn("Clipboard API 复制失败：", error);
    }
  }

  const input = document.createElement("input");
  input.value = text;
  input.setAttribute("readonly", "readonly");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();

  try {
    const ok = document.execCommand("copy");
    showToast(ok ? "微信号已复制" : `复制失败，请手动复制：${text}`);
  } catch (error) {
    console.warn("备用复制方式失败：", error);
    showToast(`复制失败，请手动复制：${text}`);
  } finally {
    document.body.removeChild(input);
  }
}

function openQrModal() {
  const modal = $("#qrModal");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeQrModal() {
  const modal = $("#qrModal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

function bindEvents() {
  $("#copyWechatBtn").addEventListener("click", copyWechat);
  $("#qrBtn").addEventListener("click", openQrModal);
  document.querySelectorAll("[data-close-modal]").forEach((node) => {
    node.addEventListener("click", closeQrModal);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeQrModal();
    }
  });
}

renderProfile();
bindEvents();
