# usefulAgent 电力市场交易系统

一个基于 Next.js 的电力现货交易平台（MVP）。默认 UI 语言为简体中文（zh-CN），货币单位为人民币（CNY）。数据库使用 SQLite（后续可平滑迁移到 Postgres）。

## 功能（MVP）
- 市场与合约：小时级现货产品（后续可扩展 15 分钟区间）
- 订单与撮合：限价单，价格-时间优先的连续撮合；支持撤单
- 成交与结算：成交即时毛额记账（T+0 简化）
- 市场数据：订单簿与最近成交（初版采用 1s 轮询，后续升级 WebSocket）
- 角色与权限：Trader、Admin（基础审计与配置）

## 技术栈
- Next.js 14（App Router, TypeScript）
- Prisma ORM + SQLite
- 身份认证：NextAuth（占位，后续完善）
- 国际化：next-intl（默认 zh-CN）
- 日期/时区：dayjs / date-fns（zh-CN，本地时区 Asia/Shanghai）
- UI：Tailwind CSS
- 工具：ESLint/Prettier、Husky pre-commit、GitHub Actions（CI）

## 本地开发
> 注：若首次克隆仓库，先完成脚手架初始化与数据库迁移；完成后以下命令可用。

- 环境要求：Node.js >= 18.18
- 安装依赖：
  - 使用你偏好的包管理器其一：`pnpm i` 或 `yarn` 或 `npm i`
- 准备环境变量：
  - 复制模板：`cp .env.example .env`
  - 按需填写 `.env` 中的变量（见下文“环境变量”示例）
- 数据库与迁移：
  - 生成/更新 Prisma Client：`npx prisma generate`
  - 运行开发迁移：`npx prisma migrate dev`
  - 可选：初始化种子数据：`npx prisma db seed`
- 启动开发服务：
  - `pnpm dev`（或 `yarn dev` / `npm run dev`）

当你看到本地 http://localhost:3000 打开成功，并展示中文界面，即表示初始化完成。

## 环境变量（.env 示例）
- DATABASE_URL="file:./prisma/dev.db"
- NEXTAUTH_SECRET="请生成安全随机值"
- TZ=Asia/Shanghai

备注：
- 生成 NEXTAUTH_SECRET 可使用：`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- 生产环境请设置 NEXTAUTH_URL 并妥善管理密钥。

## 领域约定
- 金额单位：数据库与后端以“分”（int）存储与计算；前端以“元”展示。涉及金额运算统一使用 Decimal/Big.js，避免浮点误差。
- 实时性：MVP 阶段采用 1s 轮询获取订单簿/成交数据；后续将升级为 WebSocket 推送。
- 撮合策略：价格-时间优先的连续双边限价撮合（Limit Order Book, LOB）。
- 视觉语义：遵循本地金融惯例——上涨/买单用红，下降/卖单用绿。
- 时区：统一使用 Asia/Shanghai，日期/时间格式遵循 zh-CN 习惯。

## 目录结构（当前/规划）
- src/app/：Next.js App Router 页面与路由
- src/lib/：通用库（时间格式化、金额换算、Prisma 客户端等）
- prisma/：Prisma schema、migrations 与 seed
- messages/：多语言文案（默认 zh-CN）
- src/app/api/：服务端路由与接口（Route Handlers）

## 路线图（Roadmap）
- v0.1 初始化脚手架（Next.js + Prisma + SQLite + i18n + CI）
- v0.2 数据库模型与种子（订单、成交、资金流水、审计）
- v0.3 撮合引擎 V1（内存订单簿 + 持久化）
- v0.4 市场数据与订单簿 UI、下单/撤单流程
- v0.5 权限/风控与运维工具

## 贡献指南
- 代码风格：ESLint + Prettier；提交前由 Husky 运行 `lint` 和 `typecheck`
- Commit 规范：Conventional Commits（feat/fix/chore 等）
- PR 说明：请包含变更动机、截图/录屏（如涉及 UI）、测试说明

## 许可证
本项目使用 MIT License（见 LICENSE）。
