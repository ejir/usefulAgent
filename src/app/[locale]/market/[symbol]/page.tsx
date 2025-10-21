import { formatCNYFromFen } from '@/lib/format';

export default function MarketSymbolPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const priceFen = 987654; // 示例价格（分）
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">市场：{symbol.toUpperCase()}</h1>
      <p>
        当前示例价格：<span className="font-mono">{formatCNYFromFen(priceFen)}</span>
      </p>
      <p className="opacity-70">此页面为占位符，后续将接入真实市场数据。</p>
    </div>
  );
}
