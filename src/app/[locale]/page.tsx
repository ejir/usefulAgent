import { prisma } from '@/lib/prisma';
import { formatCNYFromFen } from '@/lib/format';
import { formatDateTime } from '@/lib/time';

export default async function DashboardPage() {
  let users: Array<{ id: number; email: string; name: string | null; createdAt: Date }> = [];
  try {
    users = await prisma.user.findMany({ take: 5, orderBy: { id: 'asc' } });
  } catch {
    users = [];
  }
  const sampleFen = 123456; // 1234.56 元

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">仪表盘</h1>
      <div>当前时间（上海）：{formatDateTime(new Date())}</div>
      <div>金额示例（数据库存分，界面显示元）：{formatCNYFromFen(sampleFen)}</div>
      <section>
        <h2 className="text-xl font-semibold mb-2">示例用户</h2>
        <ul className="list-disc ml-5">
          {users.map((u) => (
            <li key={u.id}>
              {u.name || '—'}（{u.email}）· 创建于 {formatDateTime(u.createdAt)}
            </li>
          ))}
        </ul>
        {users.length === 0 && (
          <div className="text-sm opacity-70">暂无用户。运行“yarn prisma:migrate && yarn seed”以创建示例数据。</div>
        )}
      </section>
    </div>
  );
}
