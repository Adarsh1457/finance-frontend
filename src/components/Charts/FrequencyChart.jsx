import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function FrequencyChart({ data }) {
  return (
    <section className="chart-card">
      <div className="chart-header"><h3>Transaction Frequency</h3></div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#0f766e" isAnimationActive />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}