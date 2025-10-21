"use client";

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });
    setLoading(false);
    if (res?.ok) {
      setMessage('登录成功');
    } else {
      setMessage(res?.error || '登录失败');
    }
  }

  async function sendMagicLink() {
    setLoading(true);
    setMessage(null);
    const res = await signIn('email', { email, redirect: false });
    setLoading(false);
    if (res?.ok) setMessage('如果已配置邮件服务，登录链接已发送到邮箱');
    else setMessage(res?.error || '无法发送登录链接');
  }

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">登录</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">邮箱</label>
          <input
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">密码</label>
          <input
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
          />
        </div>
        <button
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
          type="submit"
        >
          {loading ? '登录中…' : '登录'}
        </button>
      </form>
      <div className="text-center text-sm opacity-70">或</div>
      <button
        onClick={sendMagicLink}
        disabled={loading || !email}
        className="w-full py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
      >
        发送登录链接到邮箱
      </button>
      {message && <div className="text-sm opacity-80">{message}</div>}
    </div>
  );
}
