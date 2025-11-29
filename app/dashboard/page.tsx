'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              🔮 DeepWeay
            </h1>
            <button
              onClick={handleSignOut}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              退出登录
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
              <span className="text-2xl text-white">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                欢迎回来！
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            账户信息
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                邮箱
              </span>
              <span className="text-gray-900 dark:text-white">{user.email}</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                用户 ID
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user.uid}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                邮箱验证
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  user.emailVerified
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}
              >
                {user.emailVerified ? '已验证' : '未验证'}
              </span>
            </div>
            <div className="flex items-center justify-between pb-4">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                注册时间
              </span>
              <span className="text-gray-900 dark:text-white">
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString('zh-CN')
                  : '未知'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg transition-transform hover:scale-105">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">AI 聊天</h3>
            <p className="text-sm text-purple-100">
              与 AI 助手开始对话
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg transition-transform hover:scale-105">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">聊天记录</h3>
            <p className="text-sm text-blue-100">
              查看历史对话记录
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 p-6 text-white shadow-lg transition-transform hover:scale-105">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">设置</h3>
            <p className="text-sm text-pink-100">
              个性化你的体验
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
