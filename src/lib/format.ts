import Big from 'big.js';

export const CNYFormatter = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
  currencyDisplay: 'symbol',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

// Convert fen (integer, 1/100 yuan) to yuan string with currency
export function formatCNYFromFen(fen: number | string | bigint): string {
  const fenBig = new Big(fen as any);
  const yuan = fenBig.div(100);
  return CNYFormatter.format(Number(yuan.toString()));
}

export function fenToYuanNumber(fen: number | string | bigint): number {
  const fenBig = new Big(fen as any);
  return Number(fenBig.div(100).toString());
}

export function yuanToFenNumber(yuan: number | string): number {
  const fen = new Big(yuan).times(100);
  return Number(fen.round(0, 0 /* RoundDown */).toString());
}

export function formatNumberZH(n: number, fractionDigits = 2): string {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(n);
}
