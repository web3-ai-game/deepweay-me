"use client";

import { useAuth } from "@/lib/auth-context";
import { Sparkles, LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { signInWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
      alert("登录失败，请稍后再试");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-black to-pink-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-8"
      >
        <div className="rounded-3xl border border-purple-500/30 bg-black/50 p-8 backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* 标题 */}
          <h1 className="mb-2 text-center text-3xl font-bold text-white">
            DeepWeay
          </h1>
          <p className="mb-8 text-center text-purple-300">
            赛博算命 AI - 给女神和老妈的专属聊天平台
          </p>

          {/* 登录按钮 */}
          <button
            onClick={handleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 font-medium text-white transition-all hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/50"
          >
            <LogIn className="h-5 w-5" />
            使用 Google 登录
          </button>

          {/* 装饰性文字 */}
          <p className="mt-6 text-center text-sm text-gray-400">
            探索 AI 的无限可能
          </p>
        </div>

        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
        </div>
      </motion.div>
    </div>
  );
}
