# AI 你画我猜游戏

>原地址: https://github.com/tech-shrimp/ai-guess-game-claude?tab=readme-ov-file

一个有趣的在线你画我猜游戏，使用 Next.js 构建，集成 Google Gemini AI 进行图像识别。

## 功能特点

- 🎨 **交互式画布** - 支持鼠标绘图，流畅的绘画体验
- 🤖 **AI 智能识别** - 使用 Google Gemini AI 识别你的画作
- 📱 **响应式设计** - 适配桌面端和移动端设备
- 🎯 **实时反馈** - 边画边识别，即时获得 AI 猜测结果
- 📊 **游戏记录** - 保存最近的绘画和识别记录
- 🎮 **简单易用** - 直观的用户界面，一键清空画布

## 技术栈

- **前端**: Next.js 15 + React 19 + TypeScript
- **样式**: Tailwind CSS 4
- **AI服务**: Google Gemini API (直接调用，无需SDK)
- **部署**: 支持 Vercel 一键部署

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制环境变量示例文件：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 文件，添加你的 Gemini API 密钥：

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. 获取 Gemini API 密钥

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 登录你的 Google 账户
3. 创建新的 API 密钥
4. 将密钥复制到 `.env.local` 文件中

### 4. 启动开发服务器

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 项目结构

```
ai-guess-game/
├── app/
│   ├── api/
│   │   └── guess/
│   │       └── route.ts          # Gemini API 调用接口
│   ├── components/
│   │   └── DrawingCanvas.tsx     # 画布组件
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 页面布局
│   └── page.tsx                  # 主页面
├── public/                       # 静态文件
├── .env.local.example            # 环境变量示例
├── package.json                  # 项目依赖
└── README.md                     # 项目说明
```

## 使用说明

1. **开始绘画** - 在左侧画布区域用鼠标画出你想要的图形
2. **AI 识别** - AI 会自动分析你的画作并给出猜测结果
3. **查看结果** - 在右侧面板查看 AI 的识别结果
4. **游戏记录** - 查看最近的绘画记录和识别历史
5. **重新开始** - 点击"开始新游戏"按钮清空所有记录
6. **清空画布** - 使用"清除画布"按钮清空当前绘画

## API 说明

### POST /api/guess

**请求体**:
```json
{
  "imageData": "data:image/png;base64,..."
}
```

**响应**:
```json
{
  "guess": "苹果"
}
```

**错误响应**:
```json
{
  "error": "错误信息"
}
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Vercel 部署

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 在环境变量中设置 `GEMINI_API_KEY`
4. 部署完成

### 其他部署方式

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 开发

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 检查

## 注意事项

- 需要有效的 Gemini API 密钥才能使用 AI 识别功能
- 绘画会自动转换为 PNG 格式发送给 AI
- API 调用有频率限制，请合理使用
- 建议在较好的网络环境下使用以获得最佳体验

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request!
