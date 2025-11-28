#!/bin/bash
# DeepWeay 本地開發啟動腳本

echo "🚀 啟動 DeepWeay 開發服務器..."
echo ""
echo "📋 使用 Doppler 注入環境變量"
echo "   Project: deepweay-prod"
echo "   Config: dev"
echo ""

# 檢查 Doppler CLI
if ! command -v doppler &> /dev/null; then
    echo "❌ Doppler CLI 未安裝"
    echo ""
    echo "安裝方法:"
    echo "  brew install dopplerhq/cli/doppler"
    echo ""
    exit 1
fi

# 檢查登錄狀態
if ! doppler me &> /dev/null; then
    echo "❌ 未登錄 Doppler"
    echo ""
    echo "登錄方法:"
    echo "  doppler login"
    echo ""
    exit 1
fi

echo "✅ Doppler 已就緒"
echo ""
echo "🔥 啟動 Next.js 開發服務器..."
echo "   URL: http://localhost:3000"
echo ""

# 使用 Doppler 注入環境變量並啟動開發服務器
doppler run --project deepweay-prod --config dev -- npm run dev
