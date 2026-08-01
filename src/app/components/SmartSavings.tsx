import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export function SmartSavings() {
  const data = [
    { value: 20 },
    { value: 45 },
    { value: 38 },
    { value: 62 },
    { value: 55 },
    { value: 78 },
    { value: 85 }
  ];

  return (
    <div className="px-6 pb-4">
      <div className="rounded-2xl bg-white/95 backdrop-blur-xl p-5 shadow-lg border border-purple-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-900">Smart Round-Up Savings</h3>
            </div>
            <p className="text-sm text-purple-600/70">We round up every purchase to save for your goals</p>
          </div>
        </div>

        <div className="h-20 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#9333ea"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium hover:from-purple-700 hover:to-purple-600 transition-all shadow-md">
          + Set New Savings Goal
        </button>
      </div>
    </div>
  );
}
