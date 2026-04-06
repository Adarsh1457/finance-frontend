import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const colors = ['#2563eb', '#16a34a', '#dc2626', '#f59e0b', '#0f766e', '#8b5cf6'];

export default function CategoryPieChart({ data, onSelectCategory }) {
  const chartData = data.slice(0, 6).map((item) => ({ name: item.category, value: item.total }));
  return (
    <section className="chart-card">
      <div className="chart-header"><h3>Category Breakdown</h3></div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} onClick={(entry) => onSelectCategory(entry.name)} isAnimationActive>
            {chartData.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}