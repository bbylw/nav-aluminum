document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav a");
  const loadingOverlay = document.querySelector('.loading-overlay');

  // 隐藏加载动画
  function hideLoadingOverlay() {
    if (loadingOverlay) {
      loadingOverlay.classList.add('hidden');
      // 移除元素以确保不会影响页面交互
      setTimeout(() => {
        if (loadingOverlay.parentNode) {
          loadingOverlay.parentNode.removeChild(loadingOverlay);
        }
      }, 600);
    }
  }

  // 页面加载完成后隐藏加载动画
  window.addEventListener('load', hideLoadingOverlay);
  
  // 添加备用机制，确保加载动画在3.5秒后隐藏
  setTimeout(hideLoadingOverlay, 3500);

  // 为所有 target=_blank 外链补充安全属性
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    const rel = (a.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
    if (!rel.includes("noopener")) rel.push("noopener");
    if (!rel.includes("noreferrer")) rel.push("noreferrer");
    a.setAttribute("rel", rel.join(" "));
  });

  // 仅处理站内锚点的点击，外链不拦截
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href") || "";
      if (!href.startsWith("#")) {
        // 外链：不处理 active 状态也不阻止默认行为
        return;
      }

      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // 添加精密机械风格的滚动效果
        targetElement.scrollIntoView({ 
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });

        const newUrl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "#" +
          targetId;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
    });
  });

  // 处理卡片悬停效果
  const linkCards = document.querySelectorAll(".link-card");
  
  linkCards.forEach(card => {
    card.addEventListener("mouseenter", function() {
      // 添加增强的金属光泽效果
      this.style.transform = "translateY(-6px)";
      this.style.background = `
        linear-gradient(145deg, var(--charcoal), var(--dark-charcoal)),
        repeating-linear-gradient(
          135deg,
          rgba(168, 168, 168, 0.1) 0px,
          rgba(168, 168, 168, 0.1) 2px,
          transparent 2px,
          transparent 4px
        )
      `;
      this.style.backgroundBlendMode = "overlay";
      this.style.boxShadow = `
        0 0 0 1px rgba(255, 255, 255, 0.12),
        inset 0 2px 4px rgba(0, 0, 0, 0.4),
        inset 0 -2px 4px rgba(255, 255, 255, 0.08),
        9px 9px 18px rgba(0, 0, 0, 0.6),
        0 0 25px rgba(168, 168, 168, 0.15)
      `;
    });
    
    card.addEventListener("mouseleave", function() {
      // 恢复默认状态
      this.style.transform = "";
      this.style.background = `
        linear-gradient(145deg, var(--charcoal), var(--gunmetal)),
        repeating-linear-gradient(
          135deg,
          rgba(168, 168, 168, 0.06) 0px,
          rgba(168, 168, 168, 0.06) 2px,
          transparent 2px,
          transparent 4px
        )
      `;
      this.style.backgroundBlendMode = "overlay";
      this.style.boxShadow = `
        0 0 0 1px rgba(255, 255, 255, 0.08),
        inset 0 2px 4px rgba(0, 0, 0, 0.5),
        inset 0 -2px 4px rgba(255, 255, 255, 0.05),
        6px 6px 12px rgba(0, 0, 0, 0.5)
      `;
    });
  });

  function handleHashChange() {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        const activeLink = document.querySelector('nav a[href="' + hash + '"]');
        if (activeLink) {
          navLinks.forEach((l) => l.classList.remove("active"));
          activeLink.classList.add("active");
        }
      }
    }
  }

  window.addEventListener("hashchange", handleHashChange);
  // 首次载入时按现有 hash 定位并高亮
  handleHashChange();
  
  // 添加精密机械风格的页面加载动画
  setTimeout(() => {
    document.body.style.opacity = "1";
    document.body.style.transform = "translateY(0)";
  }, 150);
});