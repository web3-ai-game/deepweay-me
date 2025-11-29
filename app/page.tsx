"use client";

import { useAuth } from "@/lib/auth-context";
import ChatBox from "@/components/ChatBox";
import LoginPage from "@/components/LoginPage";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-black to-pink-900">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return user ? <ChatBox /> : <LoginPage />;
}
