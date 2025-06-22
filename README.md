# YouChat

![Vue Version](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

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

## 开发计划

### 进行中 🚧

- [ ] 用户系统
  - [ ] 手机号登录
  - [ ] 第三方账号集成 (GitHub, Google)
  - [ ] 用户资料编辑
- [ ] 消息功能
  - [ ] 表情包支持
  - [ ] 语音消息
  - [ ] 视频消息
  - [ ] 文件传输
  - [ ] 消息撤回

### 计划中 📅

- [ ] 群聊增强
  - [ ] 群公告
  - [ ] 群管理
  - [ ] 群成员权限
- [ ] UI/UX
  - [ ] 深色模式
  - [ ] 自定义主题
  - [ ] 响应式布局优化
- [ ] 其他功能
  - [ ] 端到端加密
  - [ ] 消息搜索
  - [ ] 在线状态
  - [ ] 消息提醒设置

### 已完成 ✅

- [x] 基础用户认证
- [x] 文本消息收发
- [x] 基础会话管理

## 许可证

MIT
