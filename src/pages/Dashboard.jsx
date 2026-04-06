import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getByCategory, getFrequency, getRecent, getSummary, getTopCategories, getTrends } from '../api/dashboard';
import IncomeExpenseChart from '../components/Charts/IncomeExpenseChart';
import CategoryPieChart from '../components/Charts/CategoryPieChart';
import NetBalanceBarChart from '../components/Charts/NetBalanceBarChart';
import FrequencyChart from '../components/Charts/FrequencyChart';
import TopCategoriesBarChart from '../components/Charts/TopCategoriesBarChart';
import Table from '../components/Table/Table';

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [summary, setSummary] = useState(null);
  const [byCategory, setByCategory] = useState([]);
  const [trends, setTrends] = useState([]);
  const [recent, setRecent] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [period, setPeriod] = useState(searchParams.get('period') || 'monthly');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    Promise.all([getSummary(), getByCategory(), getTrends(period), getRecent(10), getFrequency(), getTopCategories(5)])
      .then(([summaryData, categoryData, trendData, recentData, frequencyData, topData]) => {
        setSummary(summaryData);
        setByCategory(categoryData);
        setTrends(trendData);
        setRecent(recentData);
        setFrequency(frequencyData);
        setTopCategories(topData);
      });
  }, [period]);

  useEffect(() => {
    setSearchParams({ period });
  }, [period, setSearchParams]);

  const filteredRecent = useMemo(() => (
    selectedCategory ? recent.filter((item) => item.category === selectedCategory) : recent
  ), [recent, selectedCategory]);

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'type', label: 'Type' },
    { key: 'category', label: 'Category' },
    { key: 'amount', label: 'Amount' },
    { key: 'source', label: 'Source' }
  ];

  return (
    <div className="page-stack">
      <section className="kpi-grid">
        <article className="kpi-card income"><span>Total Income</span><strong>{summary?.totalIncome ?? 0}</strong></article>
        <article className="kpi-card expense"><span>Total Expenses</span><strong>{summary?.totalExpenses ?? 0}</strong></article>
        <article className="kpi-card net"><span>Net Balance</span><strong>{summary?.netBalance ?? 0}</strong></article>
        <article className="kpi-card neutral"><span>Total Records</span><strong>{summary?.recordCount ?? 0}</strong></article>
      </section>

      <section className="chart-grid">
        <IncomeExpenseChart data={trends} period={period} setPeriod={setPeriod} />
        <CategoryPieChart data={byCategory} onSelectCategory={setSelectedCategory} />
        <NetBalanceBarChart data={trends} />
        <FrequencyChart data={frequency} />
        <TopCategoriesBarChart data={topCategories} />
      </section>

      <section className="panel">
        <div className="panel-head">
          <h3>Recent Records</h3>
          {selectedCategory ? <button type="button" className="link-button" onClick={() => setSelectedCategory('')}>Clear category filter</button> : null}
        </div>
        <Table
          columns={columns}
          rows={filteredRecent.map((row) => (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.time}</td>
              <td><span className={`badge badge-${row.type === 'INCOME' ? 'income' : 'expense'}`}>{row.type}</span></td>
              <td>{row.category}</td>
              <td>{row.amount}</td>
              <td><span className="badge badge-neutral">{row.source}</span></td>
            </tr>
          ))}
          page={1}
          totalPages={1}
          onPageChange={() => {}}
          sortBy="date"
          sortOrder="desc"
          onSort={() => {}}
        />
      </section>
    </div>
  );
}