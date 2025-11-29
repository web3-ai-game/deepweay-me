'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="mx-auto max-w-4xl px-6 text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-4">
            <span className="text-6xl">🔮</span>
          </div>
        </div>

        <h1 className="mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-6xl font-bold text-transparent">
          DeepWeay
        </h1>

        <p className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          赛博算命 · AI 聊天
        </p>

        <p className="mb-12 text-lg text-gray-600 dark:text-gray-400">
          给女神和老妈的专属 AI 聊天平台
        </p>

        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-xl"
          >
            立即开始
          </Link>
          <Link
            href="/login"
            className="rounded-lg border-2 border-purple-600 bg-transparent px-8 py-4 text-lg font-semibold text-purple-600 transition-all hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950/20"
          >
            已有账户？登录
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/60">
            <div className="mb-4 text-4xl">🤖</div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              AI 聊天
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              集成 Gemini Pro API，支持流式输出
            </p>
          </div>

          <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/60">
            <div className="mb-4 text-4xl">💾</div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              聊天记录
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Firebase 实时存储，永久保存
            </p>
          </div>

          <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/60">
            <div className="mb-4 text-4xl">🔐</div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              安全登录
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Firebase Authentication 保护
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
