import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function TopCategoriesBarChart({ data }) {
  return (
    <section className="chart-card chart-card-wide">
      <div className="chart-header"><h3>Top Categories</h3></div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart layout="vertical" data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="category" width={120} />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#16a34a" isAnimationActive />
          <Bar dataKey="expense" fill="#dc2626" isAnimationActive />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}