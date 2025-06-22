# YouChat

一个基于 Vue 3 + TypeScript 的实时聊天应用前端项目。

## 功能特性

- 🔐 用户认证
  - 邮箱注册/登录
  - 验证码支持
  - Token 认证机制
- 💬 实时聊天
  - WebSocket 实时消息推送
  - 支持多种消息类型
  - 消息历史记录与分页
  - 未读消息提醒
- 👥 联系人管理
  - 搜索添加联系人
  - 创建/加入群聊
  - 会话列表管理

## 技术栈

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Ant Design Vue
- WebSocket

## 快速开始

### 环境要求

- Node.js >= 16
- npm >= 7

### 安装

```bash
npm install
```

### 开发

```bash
npm run dev
```

### 构建

```bash
npm run build
```

## 项目结构

```
src/
├── api/          # API 接口
├── assets/       # 静态资源
├── components/   # 组件
├── router/      # 路由
├── stores/      # 状态管理
├── types/       # 类型定义
├── utils/       # 工具函数
├── views/       # 页面
└── App.vue      # 根组件
```

## 环境配置

在项目根目录创建以下环境文件:

- `.env.development` - 开发环境
- `.env.production` - 生产环境

配置项:

- `VITE_API_BASE_URL` - API地址
- `VITE_WS_URL` - WebSocket地址

## 开发指南

1. 代码规范

   - ESLint + Prettier
   - Vue 3 组合式 API
   - TypeScript 类型定义

2. 组件开发

   - 组件放在 components/
   - 页面放在 views/
   - 使用 .vue 单文件组件

3. 状态管理
   - 使用 Pinia
   - 按模块划分 store

## 许可证

MIT
