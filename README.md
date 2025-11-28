# 🔮 DeepWeay.me - 賽博算命 | AI 聊天

> 給女神和老媽的專屬 AI 聊天平台

## 🎯 項目簡介

**DeepWeay** 是一個基於 Next.js 16 + Firebase + Gemini AI 的智能聊天平台，提供：

- 🤖 **AI 聊天**: 集成 Gemini Pro API，支持流式輸出
- 💾 **聊天記錄**: Firebase Realtime Database 實時存儲
- 🔐 **用戶登錄**: Firebase Authentication
- 📱 **Telegram Bot**: Love Bot 集成
- 🎨 **現代 UI**: TailwindCSS + shadcn/ui

## 🚀 快速開始

### 本地開發

```bash
# 使用 Doppler 注入環境變量
./dev.sh

# 或手動啟動
doppler run --project deepweay-prod --config dev -- npm run dev
```

訪問: http://localhost:3000

### 部署到 Firebase

```bash
# 初始化 Firebase Hosting
firebase init hosting

# 部署
doppler run --project deepweay-prod --config dev -- firebase deploy
```

## 🔧 技術棧

- **框架**: Next.js 16 (App Router)
- **語言**: TypeScript
- **樣式**: TailwindCSS
- **後端**: Firebase (Auth + Realtime Database + Hosting)
- **AI**: Google Gemini Pro API
- **數據庫**: Supabase (備用)
- **部署**: Firebase Hosting + Cloud Functions Gen 2

## 📦 環境變量

所有環境變量通過 **Doppler** 管理，不在代碼中寫死。

### Firebase
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### AI Keys
- `GEMINI_API_KEY_PAID` - 付費 API ($100 餘額)
- `GEMINI_API_KEY_FREE` - 免費 API 集群

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Telegram
- `TELEGRAM_BOT_TOKEN` - Love Bot

## 🔄 CI/CD

GitHub Actions 自動部署到 Firebase Hosting。

**觸發條件**:
- Push 到 `main` 分支
- Pull Request 到 `main` 分支

**部署流程**:
1. Checkout 代碼
2. 安裝依賴 (Node.js 20)
3. 構建項目 (注入環境變量)
4. 部署到 Firebase Hosting

## 📚 相關文檔

- [Firebase Console](https://console.firebase.google.com/project/deepweay-9f443)
- [Doppler Dashboard](https://dashboard.doppler.com)
- [GitHub Repository](https://github.com/web3-ai-game/deepweay-me)

## 🛠️ 開發指南

### 安裝依賴

```bash
npm install
```

### 本地開發

```bash
# 方式 1: 使用腳本
./dev.sh

# 方式 2: 使用 Doppler
doppler run --project deepweay-prod --config dev -- npm run dev

# 方式 3: 手動設置環境變量 (不推薦)
npm run dev
```

### 構建生產版本

```bash
npm run build
```

### 部署

```bash
# 部署到 Firebase
firebase deploy

# 或使用 Doppler
doppler run --project deepweay-prod --config dev -- firebase deploy
```

## 🔐 安全

- ✅ 所有敏感 Keys 存儲在 Doppler
- ✅ GitHub Secrets 用於 CI/CD
- ✅ `.env` 文件已被 `.gitignore` 排除
- ✅ Firebase Security Rules 已配置

## 📝 License

MIT

---

**Created**: 2025-11-28  
**Status**: ✅ 開發中  
**Domain**: deepweay.me
