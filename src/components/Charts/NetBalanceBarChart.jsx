import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, Cell } from 'recharts';

export default function NetBalanceBarChart({ data }) {
  return (
    <section className="chart-card">
      <div className="chart-header"><h3>Net Balance</h3></div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <ReferenceLine y={0} stroke="#64748b" />
          <Bar dataKey="net" isAnimationActive>
            {data.map((entry) => (
              <Cell key={entry.period} fill={entry.net >= 0 ? '#16a34a' : '#dc2626'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}