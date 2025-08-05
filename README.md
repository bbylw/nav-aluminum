# WebNav Hub - 冷银灰键帽风格版（工业极简）

一款以“冷银灰键帽（键盘拟物）”为核心视觉语言的高效分类网址导航。整体保留工业审美与机械细节，但弱化重拉丝与强阴影，强调自然、克制、细腻的金属质感。深色优先，自动跟随系统浅/深色主题。

## 演示与部署

### 一键部署选项（免费）
- Cloudflare Pages（推荐）
  1. 新建项目 -> 选择 GitHub 仓库
  2. 框架预设：None（静态站点）
  3. Build 命令：无
  4. Output 目录：根目录（/）
  5. 绑定自定义域名（可选），并开启压缩/缓存
- GitHub Pages
  1. 将代码推送到 GitHub
  2. Settings -> Pages -> Branch 选择 main（root）保存
  3. 稍候访问 https://你的用户名.github.io/仓库名
- Netlify
  1. 选择 Git 仓库导入
  2. Build 命令留空，Publish directory 选根目录
  3. 部署完成后可绑定域名
- Vercel
  1. Import Git 项目
  2. Framework 选择 Other，Build/Output 留空（静态）
  3. 完成后绑定域名

说明：本项目为纯静态站点，无需构建工具与后端。index.html + [`style.css`](style.css) + [`main.js`](main.js) 即可直接托管。

### 自托管/对象存储
- 直接将三文件上传至任意静态空间（如 OSS、COS、S3、又拍、七牛或任意 Nginx 目录）即可访问
- 建议开启 gzip/br 压缩与合理 Cache-Control 头

## 设计特色

### 冷银灰键帽（工业极简）
- **键帽胶囊形态**：主交互元素采用“椭圆胶囊/键帽”造型，顶部轻微高光、右下柔和阴影，呈现真实立体感
- **克制的金属质感**：使用细腻的线性渐变与少量投影，弱化拉丝纹理，避免过强对比与噪点
- **键盘阵列网格**：等距间隙的网格布局，呼应键盘排布，统一的节奏与秩序感
- **深色优先 + 跟随系统**：默认深色（冷黑/枪灰）环境，自动适配 prefers-color-scheme 浅色

### 组件与交互
- **链接卡片（Keycaps）**：银灰渐变、圆润胶囊、顶部高光与内侧微暗线，悬停上浮，按下轻微“压入”
- **顶部导航（薄键帽）**：单行不可换行，小屏横向滚动，扁薄胶囊风格按钮
- **加载动画（工业元素）**：弱化拉丝的齿轮动画，纯净过渡

## 如何增减导航分类与链接

本项目页面结构在 [`index.html`](index.html) 中，按“分类标题 + 链接网格”成组出现。

### 新增一个分类
1. 复制一段“分类标题 + 网格”的结构到合适位置：
```html
<h2 class="category-title" id="my-category">我的分类</h2>
<section class="link-grid">
  <!-- 在此处添加若干 .link-card -->
</section>
```
2. 将顶部导航加入该分类锚点（放到 nav 的 ul 里）：
```html
<li><a href="#my-category">我的分类</a></li>
```

### 删除一个分类
- 删除对应的 `<h2 class="category-title" id="...">...</h2>` 与其下的 `<section class="link-grid">...</section>`
- 同时从顶部导航 `<ul>` 中移除该分类 `<li>...</li>`

### 新增一个链接卡片
在对应分类的 `<section class="link-grid">` 内添加：
```html
<div class="link-card">
  <a href="https://example.com" target="_blank"></a>
  <i class="fa-solid fa-link"></i>
  <h3>示例名称</h3>
</div>
```
- href：目标网址
- target="_blank"：新窗口打开
- 图标：替换 `<i>` 的 Font Awesome 类名
- 标题：替换 `<h3>` 文本

图标类名可在 Font Awesome 文档中查找，当前页面已通过 CDN 延迟加载对应 CSS。

### 删除或调整顺序
- 直接在 HTML 中删除对应 `.link-card` 块或移动其位置

### 修改顶部导航顺序或文案
- 在 `<nav> -> <ul>` 中增删 `<li>` 即可；注意 href 的锚点需与对应分类的 id 保持一致

## 技术实现

### 样式与主题
- CSS 变量集中管理色彩、阴影、动效与圆角
- 线性/径向渐变营造金属层次，极少量纹理仅用于装饰
- prefers-color-scheme 实现浅/深色主题自适应
- 通过类与伪类实现悬停/按下，不依赖内联样式，确保状态可控

对应实现位置：
- 视觉与布局在 [`style.css`](style.css) 中
- 交互与导航高亮在 [`main.js`](main.js) 中
- 页面结构与资源加载在 [`index.html`](index.html) 中

### 布局与导航
- 单行导航：`flex-wrap: nowrap` + `overflow-x: auto`，小屏横向滚动而不换行
- 键盘阵列：`grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))` + 等距 `gap: 12px`
- 分区标题置中，采用轻量金属下划线

### 交互与可用性
- 链接卡片悬停与按下使用 CSS 管理：默认、hover、active 三态清晰
- 明确的“悬停后恢复默认”逻辑：`.link-card:not(:hover):not(:active)` 规则，覆盖潜在内联残留
- 内部锚点平滑滚动，导航 active 高亮；外部链接自动补全 `noopener noreferrer`

## 配色方案（示例）
- 冷银高光（aluminum）：`#cfd6dc`
- 键帽中间（aluminum-mid）：`#aeb7bf`
- 阴影过渡（aluminum-low）：`#9aa4ad`
- 边缘亮线（aluminum-edge）：`#dfe5ea`
- 背景（深色优先）：`#1e2326`（dark charcoal）、`#2b3338`（gunmetal）
- 文本：浅色 `#e9edf0`，弱化文本 `#acb5bc`

## 组件设计

### 1. 链接卡片（键帽胶囊）
- 胶囊圆角、银灰纵向渐变
- 顶部轻高光、右下投影、内侧微暗线
- 悬停上浮；按下轻微回弹，避免夸张按压

### 2. 顶部导航（扁薄键帽）
- 单行胶囊按钮，最小宽度保障触达
- 小屏横向滚动，强调一致排布
- 悬停色温微变，空间感增强

### 3. 工业装饰（弱化）
- 低不透明度齿轮轮廓
- 纯净加载过渡，不干扰信息

## 响应式设计
- 桌面/平板/移动端全覆盖
- 小屏网格最小宽度逐级收窄（150 → 110 → 100 → 90 → 80）
- 导航密度与字号随断点递进收紧

## 浏览器兼容性
- 现代浏览器支持
- 渐进增强与优雅降级

## 性能优化
- 关键 CSS 优先加载，Font Awesome 延迟加载
- JS 使用 `defer`，非关键逻辑延后到 `requestIdleCallback`
- 轻量动效与阴影，减少重绘/重排

## 开发提示
- 如需进一步精细化内联悬停逻辑，建议移除 JS 内联 hover 样式，使用类名切换：
  - JS：`card.addEventListener('mouseenter', () => card.classList.add('is-hover'));` / `mouseleave` 移除
  - CSS：`.link-card.is-hover { /* 对应 hover 态样式 */ }`
- 导航可为当前锚点链接补充 `aria-current="page"` 以提升可访问性