# 🔐 GitHub Secrets 配置教程（手動複製粘貼）

**項目**: deepweay-me  
**用途**: 配置 CI/CD 自動部署所需的密鑰

---

## 📋 步驟 1: 前往 GitHub Secrets 設置頁面

1. 打開瀏覽器，訪問: https://github.com/web3-ai-game/deepweay-me/settings/secrets/actions
2. 點擊右上角的 **"New repository secret"** 按鈕

---

## 🔑 步驟 2: 逐個添加以下 Secrets

### Secret 1: NEXT_PUBLIC_FIREBASE_API_KEY
```
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: AIzaSyDCmTKYdm-pDMXmvKmTkTY1o5jx7pU
```
點擊 **"Add secret"**

---

### Secret 2: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
```
Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: deepweay-9f443.firebaseapp.com
```
點擊 **"Add secret"**

---

### Secret 3: NEXT_PUBLIC_FIREBASE_DATABASE_URL
```
Name: NEXT_PUBLIC_FIREBASE_DATABASE_URL
Value: https://deepweay-9f443-default-rtdb.asia-southeast1.firebasedatabase.app
```
點擊 **"Add secret"**

---

### Secret 4: NEXT_PUBLIC_FIREBASE_PROJECT_ID
```
Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: deepweay-9f443
```
點擊 **"Add secret"**

---

### Secret 5: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
```
Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: deepweay-9f443.firebasestorage.app
```
點擊 **"Add secret"**

---

### Secret 6: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
```
Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: 265176362949
```
點擊 **"Add secret"**

---

### Secret 7: NEXT_PUBLIC_FIREBASE_APP_ID
```
Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: 1:265176362949:web:a8ba012e4dc8d2149cd979
```
點擊 **"Add secret"**

---

### Secret 8: GEMINI_API_KEY_PAID
```
Name: GEMINI_API_KEY_PAID
Value: AIzaSyC4x4T8ModyRHS7n8hIBQ5zp4n0I0OW5-U
```
點擊 **"Add secret"**

---

### Secret 9: GEMINI_API_KEY_FREE
```
Name: GEMINI_API_KEY_FREE
Value: AIzaSyCZLvRjt-hqumRkBeljl7OlPZsO_tduYr8
```
點擊 **"Add secret"**

---

### Secret 10: NEXT_PUBLIC_SUPABASE_URL
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://qhgdymgxcbyhtxezvoqt.supabase.co
```
點擊 **"Add secret"**

---

### Secret 11: NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZ2R5bWd4Y2J5aHR4ZXp2b3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3MDQ1MjAsImV4cCI6MjAzNjI4MDUyMH0.WQrD5SINohTvNhgKOCdT0PVSjw5KzLp_PbV6p1vAzf0
```
點擊 **"Add secret"**

---

### Secret 12: SUPABASE_SERVICE_ROLE_KEY
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZ2R5bWd4Y2J5aHR4ZXp2b3F0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDcwNDUyMCwiZXhwIjoyMDM2MjgwNTIwfQ.FCojNqvWlFz6xLzQXxBfOm8Oy7-sDEHaZXLJYxLLGAg
```
點擊 **"Add secret"**

---

### Secret 13: TELEGRAM_BOT_TOKEN
```
Name: TELEGRAM_BOT_TOKEN
Value: 7602987646:AAF-bR1EQuHEi7lmXhWVYOVQurciTKnv15M
```
點擊 **"Add secret"**

---

## 🔥 步驟 3: 配置 Firebase Service Account（最重要！）

### 3.1 獲取 Firebase Service Account JSON

1. 訪問: https://console.firebase.google.com/project/deepweay-9f443/settings/serviceaccounts/adminsdk
2. 點擊 **"Generate new private key"**
3. 點擊 **"Generate key"** 確認
4. 會下載一個 JSON 文件（例如: `deepweay-9f443-firebase-adminsdk-xxxxx.json`）

### 3.2 打開 JSON 文件並複製全部內容

用文本編輯器打開下載的 JSON 文件，複製**全部內容**（包括大括號）。

內容格式類似：
```json
{
  "type": "service_account",
  "project_id": "deepweay-9f443",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@deepweay-9f443.iam.gserviceaccount.com",
  ...
}
```

### 3.3 添加到 GitHub Secrets

1. 回到 GitHub Secrets 頁面: https://github.com/web3-ai-game/deepweay-me/settings/secrets/actions
2. 點擊 **"New repository secret"**
3. 填寫：
   ```
   Name: FIREBASE_SERVICE_ACCOUNT_DEEPWEAY
   Value: [粘貼整個 JSON 內容]
   ```
4. 點擊 **"Add secret"**

---

## ✅ 步驟 4: 驗證配置

配置完成後，你應該看到以下 14 個 Secrets：

- [x] NEXT_PUBLIC_FIREBASE_API_KEY
- [x] NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- [x] NEXT_PUBLIC_FIREBASE_DATABASE_URL
- [x] NEXT_PUBLIC_FIREBASE_PROJECT_ID
- [x] NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- [x] NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- [x] NEXT_PUBLIC_FIREBASE_APP_ID
- [x] GEMINI_API_KEY_PAID
- [x] GEMINI_API_KEY_FREE
- [x] NEXT_PUBLIC_SUPABASE_URL
- [x] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [x] SUPABASE_SERVICE_ROLE_KEY
- [x] TELEGRAM_BOT_TOKEN
- [x] FIREBASE_SERVICE_ACCOUNT_DEEPWEAY

---

## 🚀 步驟 5: 觸發重新部署

配置完成後，推送一個空 Commit 觸發部署：

```bash
cd /Users/deepweay/Documents/github/deepweay-me
git commit --allow-empty -m "🔧 Trigger deployment after secrets config"
git push origin main
```

---

## 🔍 步驟 6: 查看部署進度

1. 訪問: https://github.com/web3-ai-game/deepweay-me/actions
2. 點擊最新的 Workflow run
3. 查看每個步驟的執行狀態
4. 成功後訪問: https://deepweay-9f443.web.app

---

## 📝 完成後請刪除此文件

配置完成後，請刪除此文件：
```bash
rm /Users/deepweay/Documents/github/deepweay-me/SETUP-GITHUB-SECRETS.md
```

---

**創建時間**: 2025-11-28  
**用途**: 手動配置 GitHub Secrets  
**狀態**: ⚠️ 配置完成後請刪除
