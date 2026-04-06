import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export default function IncomeExpenseChart({ data, period, setPeriod }) {
  return (
    <section className="chart-card">
      <div className="chart-header">
        <h3>Income vs Expense</h3>
        <div className="toggle-group"><button className={period === 'monthly' ? 'active' : ''} type="button" onClick={() => setPeriod('monthly')}>Monthly</button><button className={period === 'weekly' ? 'active' : ''} type="button" onClick={() => setPeriod('weekly')}>Weekly</button></div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#16a34a" strokeWidth={2} isAnimationActive />
          <Line type="monotone" dataKey="expenses" stroke="#dc2626" strokeWidth={2} isAnimationActive />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}